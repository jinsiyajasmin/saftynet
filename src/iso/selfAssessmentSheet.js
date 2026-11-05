// Appends a completed self-assessment as a row in an Excel workbook stored in
// SharePoint / OneDrive, using Microsoft Graph with an Entra ID (Azure AD) app
// registration (client-credentials flow, application permission Files.ReadWrite.All).
//
// Required environment variables:
//   MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET
//   SELF_ASSESSMENT_SHEET_URL – the workbook's sharing link
// Optional:
//   SELF_ASSESSMENT_TABLE – name of the Excel table to append to (default "SelfAssessments")

const GRAPH = "https://graph.microsoft.com/v1.0";

export function sheetConfig(env = process.env) {
  const cfg = {
    tenantId: env.MS_TENANT_ID,
    clientId: env.MS_CLIENT_ID,
    clientSecret: env.MS_CLIENT_SECRET,
    sheetUrl: env.SELF_ASSESSMENT_SHEET_URL,
    tableName: env.SELF_ASSESSMENT_TABLE || "SelfAssessments",
  };
  return cfg.tenantId && cfg.clientId && cfg.clientSecret && cfg.sheetUrl ? cfg : null;
}

// Column headers and the matching row values. Keep the two in the same order.
export function sheetHeaders(results) {
  return [
    "Completed",
    "First name",
    "Last name",
    "Email",
    "Phone",
    "Country",
    "Company",
    "Existing SafetyNett client",
    "Overall score (%)",
    "Readiness level",
    ...results.perClause.map((c) => `Clause ${c.number} ${c.title} (%)`),
  ];
}

export function sheetRow(details, results, completedAt) {
  // UK time as "YYYY-MM-DD HH:mm" – unambiguous, so Excel reads it as a date in any locale.
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(completedAt)
      .map((p) => [p.type, p.value])
  );
  const when = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}`;
  return [
    when,
    details.firstName,
    details.lastName,
    details.email,
    // Leading apostrophe keeps Excel from treating "+44 …" as a formula or number.
    `'${details.phone}`,
    details.country,
    details.company,
    details.existingClient,
    results.overall,
    results.band.name,
    ...results.perClause.map((c) => c.pct),
  ];
}

// Excel column letter for a 1-based index (1 → A, 27 → AA).
function columnLetter(n) {
  let s = "";
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

// Graph "shares" id for a sharing URL: "u!" + base64url(url) without padding.
function shareId(url) {
  return "u!" + Buffer.from(url, "utf8").toString("base64").replace(/=+$/, "").replace(/\//g, "_").replace(/\+/g, "-");
}

async function getToken({ tenantId, clientId, clientSecret }) {
  const res = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    throw new Error(`Microsoft sign-in failed (${res.status}): ${data.error_description || data.error || "no token"}`);
  }
  return data.access_token;
}

async function graph(token, method, path, body) {
  const res = await fetch(`${GRAPH}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    throw new Error(`Graph ${method} ${path.split("?")[0]} failed (${res.status}): ${data.error?.message || text}`);
  }
  return data;
}

// Finds the workbook's drive and item id. Accepts either a sharing link
// (…/:x:/g/…) or the link from the Excel-in-browser address bar
// (…/_layouts/15/Doc.aspx or doc2.aspx?sourcedoc={GUID}&file=Name.xlsx).
async function resolveWorkbook(token, url) {
  let sharesError;
  try {
    const item = await graph(token, "GET", `/shares/${shareId(url)}/driveItem?$select=id,parentReference`);
    return { id: item.id, driveId: item.parentReference.driveId };
  } catch (err) {
    sharesError = err;
  }

  const u = new URL(url);
  const docId = (u.searchParams.get("sourcedoc") || "").replace(/[{}]/g, "").toLowerCase();
  const fileName = u.searchParams.get("file");
  const layouts = u.pathname.indexOf("/_layouts/");
  if (!docId || !fileName || layouts === -1) throw sharesError;

  // "/:x:/r/personal/name/_layouts/…" → "/personal/name"
  const sitePath = u.pathname.slice(0, layouts).replace(/^\/:[a-z]:\/[a-z]/i, "");
  const site = await graph(token, "GET", `/sites/${u.hostname}:${sitePath}?$select=id`);
  const drive = await graph(token, "GET", `/sites/${site.id}/drive?$select=id`);
  const q = fileName.replace(/'/g, "''");
  const found = await graph(
    token,
    "GET",
    `/drives/${drive.id}/root/search(q='${encodeURIComponent(q)}')?$select=id,name,sharepointIds`
  );
  const match = found.value.find((f) => (f.sharepointIds?.listItemUniqueId || "").toLowerCase() === docId);
  if (!match) throw new Error(`Workbook "${fileName}" (${docId}) not found in ${sitePath}`);
  return { id: match.id, driveId: drive.id };
}

export async function appendSelfAssessmentRow(cfg, { details, results, completedAt }) {
  const token = await getToken(cfg);

  const item = await resolveWorkbook(token, cfg.sheetUrl);
  const book = `/drives/${item.driveId}/items/${item.id}/workbook`;

  const headers = sheetHeaders(results);
  const row = sheetRow(details, results, completedAt);

  // Find the table, or create it (with a header row) on the first worksheet.
  const tables = await graph(token, "GET", `${book}/tables?$select=id,name`);
  let table = tables.value.find((t) => t.name === cfg.tableName);

  if (!table) {
    const sheets = await graph(token, "GET", `${book}/worksheets?$select=id,name,position`);
    const sheet = [...sheets.value].sort((a, b) => a.position - b.position)[0];
    const sheetPath = `${book}/worksheets/${encodeURIComponent(sheet.id)}`;
    const address = `A1:${columnLetter(headers.length)}1`;

    await graph(token, "PATCH", `${sheetPath}/range(address='${address}')`, { values: [headers] });
    table = await graph(token, "POST", `${sheetPath}/tables/add`, { address, hasHeaders: true });
    await graph(token, "PATCH", `${book}/tables/${encodeURIComponent(table.id)}`, { name: cfg.tableName });
    await graph(token, "PATCH", `${sheetPath}/range(address='${address}')/format/font`, { bold: true }).catch(() => {});
  }

  await graph(token, "POST", `${book}/tables/${encodeURIComponent(table.id)}/rows/add`, { values: [row] });
}
