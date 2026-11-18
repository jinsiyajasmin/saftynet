import path from "node:path";
import nodemailer from "nodemailer";
import { CLAUSES, computeResults } from "../../../src/iso/iso14001AssessmentData";
import { buildSelfAssessmentWorkbook } from "../../../src/iso/selfAssessmentExcel";
import { appendSelfAssessmentRow, sheetConfig } from "../../../src/iso/selfAssessmentSheet";
import { parseRecipients } from "../../../src/emailRecipients";

export const runtime = "nodejs";

const LOGO_PATH = path.join(process.cwd(), "public", "email-logo.png");

const FIELDS = ["firstName", "lastName", "email", "country", "phone", "company", "existingClient"];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cleanDetails(raw) {
  const d = {};
  for (const key of FIELDS) {
    const value = String(raw?.[key] ?? "").trim();
    if (!value || value.length > 200) return null;
    d[key] = value;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) return null;
  const digits = d.phone.replace(/\D/g, "");
  if (!/^[+\d\s()-]+$/.test(d.phone) || digits.length < 7 || digits.length > 15) return null;
  if (d.existingClient !== "Yes" && d.existingClient !== "No") return null;
  return d;
}

function cleanAnswers(raw) {
  const answers = {};
  for (const c of CLAUSES) {
    for (let i = 0; i < c.questions.length; i++) {
      const key = `${c.id}-${i}`;
      const value = raw?.[key];
      if (![0, 1, 2, 3].includes(value)) return null;
      answers[key] = value;
    }
  }
  return answers;
}

function summaryHtml(d, results) {
  const rows = [
    ["Name", `${d.firstName} ${d.lastName}`],
    ["Company", d.company],
    ["Email", `<a href="mailto:${escapeHtml(d.email)}" style="color:#6C63FF;text-decoration:none;">${escapeHtml(d.email)}</a>`],
    ["Phone", d.phone],
    ["Country", d.country],
    ["Existing client", d.existingClient],
    ["Overall score", `<strong>${results.overall}%</strong> – ${escapeHtml(results.band.name)}`],
  ];
  const cell = "padding:10px 0;border-top:1px solid #e5e7eb;";
  const detailRows = rows
    .map(
      ([k, v], i) => `<tr>
        <td style="${cell}font-size:13px;color:#6b7280;width:130px;">${k}</td>
        <td style="${cell}font-size:15px;color:#0d1117;">${i === 2 || i === 6 ? v : escapeHtml(v)}</td>
      </tr>`
    )
    .join("");
  const clauseRows = results.perClause
    .map(
      (c) => `<tr>
        <td style="${cell}font-size:14px;color:#0d1117;">Clause ${c.number}: ${escapeHtml(c.title)}</td>
        <td style="${cell}font-size:14px;color:${c.pct >= 75 ? "#16a34a" : c.pct >= 40 ? "#d97706" : "#dc2626"};font-weight:700;text-align:right;">${c.pct}%</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#1a1d23;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f5f7;padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
          <tr><td style="background:#0d1117;padding:22px 28px;">
            <img src="cid:safetynett-logo" alt="SafetyNett" width="168" height="36" style="display:block;border:0;height:36px;width:auto;" />
          </td></tr>
          <tr><td style="background:#6C63FF;height:4px;font-size:0;line-height:0;">&nbsp;</td></tr>
          <tr><td style="padding:28px 28px 8px;">
            <p style="margin:0;color:#6C63FF;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">Self Assessment</p>
            <h1 style="margin:8px 0 0;color:#0d1117;font-size:24px;font-weight:700;">New ISO 14001:2026 self-assessment</h1>
            <p style="margin:10px 0 0;color:#4b5563;font-size:15px;line-height:1.6;">Someone completed the self-assessment on the SafetyNett website. Their details, scores and answers are in the attached Excel file.</p>
          </td></tr>
          <tr><td style="padding:12px 28px 8px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${detailRows}</table>
          </td></tr>
          <tr><td style="padding:16px 28px 28px;">
            <p style="margin:0 0 6px;color:#0d1117;font-size:15px;font-weight:700;">Clause scores</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${clauseRows}</table>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const details = cleanDetails(payload?.details);
  const answers = cleanAnswers(payload?.answers);
  if (!details || !answers) {
    return Response.json({ error: "Some details or answers are missing or invalid." }, { status: 400 });
  }

  const completedAt = new Date();
  const results = computeResults(answers);

  const tasks = [];
  const emailCfg = emailConfig();
  const sheetCfg = sheetConfig();
  if (emailCfg) tasks.push(["email", sendEmail(emailCfg, { details, answers, results, completedAt })]);
  if (sheetCfg) tasks.push(["sheet", appendSelfAssessmentRow(sheetCfg, { details, results, completedAt })]);

  if (tasks.length === 0) {
    return Response.json({ error: "Self-assessment delivery is not set up yet." }, { status: 500 });
  }

  const outcomes = await Promise.allSettled(tasks.map(([, p]) => p));
  const status = {};
  outcomes.forEach((o, i) => {
    const [name] = tasks[i];
    status[name] = o.status === "fulfilled" ? "ok" : "failed";
    if (o.status === "rejected") console.error(`[self-assessment] ${name} failed:`, o.reason?.message || o.reason);
  });

  const anyOk = Object.values(status).includes("ok");
  return Response.json({ ok: anyOk, ...status }, { status: anyOk ? 200 : 502 });
}

function emailConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const recipients = parseRecipients(process.env.SELF_ASSESSMENT_TO || process.env.CONTACT_TO);
  if (!host || !user || !pass || !from || recipients.length === 0) return null;
  return { host, port: Number(process.env.SMTP_PORT || 587), user, pass, from, recipients };
}

async function sendEmail({ host, port, user, pass, from, recipients }, { details, answers, results, completedAt }) {
  const { buffer } = await buildSelfAssessmentWorkbook({ details, answers, completedAt });
  const company = details.company.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-") || "Company";
  const stamp = completedAt.toISOString().slice(0, 10);

  const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
  await transporter.sendMail({
    from: `SafetyNett <${from}>`,
    to: recipients,
    replyTo: details.email,
    subject: `ISO 14001 self-assessment: ${details.company} – ${results.overall}% (${results.band.name})`,
    text:
      `New ISO 14001:2026 self-assessment\n\n` +
      `Name: ${details.firstName} ${details.lastName}\nCompany: ${details.company}\nEmail: ${details.email}\n` +
      `Phone: ${details.phone}\nCountry: ${details.country}\nExisting client: ${details.existingClient}\n\n` +
      `Overall: ${results.overall}% (${results.band.name})\n` +
      results.perClause.map((c) => `Clause ${c.number} ${c.title}: ${c.pct}%`).join("\n") +
      `\n\nFull details are in the attached Excel file.`,
    html: summaryHtml(details, results),
    attachments: [
      {
        filename: `SafetyNett-ISO14001-Self-Assessment-${company}-${stamp}.xlsx`,
        content: buffer,
        contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      { filename: "email-logo.png", path: LOGO_PATH, cid: "safetynett-logo" },
    ],
  });
}
