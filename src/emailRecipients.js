const DEFAULT_ALLOWED_DOMAINS = "safetynett.co.uk,iaudit.global";

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

// Form submissions contain personal data, so only deliver to company inboxes.
export function parseRecipients(value) {
  const allowed = splitList(process.env.EMAIL_ALLOWED_DOMAINS || DEFAULT_ALLOWED_DOMAINS).map((d) => d.toLowerCase());
  return splitList(value).filter((address) => {
    const at = address.lastIndexOf("@");
    if (at < 1) return false;
    const domain = address.slice(at + 1).toLowerCase();
    return allowed.some((d) => domain === d || domain.endsWith(`.${d}`));
  });
}
