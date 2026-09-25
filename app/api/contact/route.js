import path from "node:path";
import nodemailer from "nodemailer";

const LOGO_PATH = path.join(process.cwd(), "public", "email-logo.png");

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function enquiryHtml({ name, email, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#1a1d23;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f5f7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="background:#0d1117;padding:22px 28px;">
                <img src="cid:safetynett-logo" alt="SafetyNett" width="168" height="36" style="display:block;border:0;height:36px;width:auto;" />
              </td>
            </tr>
            <tr>
              <td style="background:#6C63FF;height:4px;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:28px 28px 8px;">
                <p style="margin:0;color:#6C63FF;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">Contact</p>
                <h1 style="margin:8px 0 0;color:#0d1117;font-size:24px;font-weight:700;">New website enquiry</h1>
                <p style="margin:10px 0 0;color:#4b5563;font-size:15px;line-height:1.6;">Someone sent a message from the SafetyNett contact form.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 28px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding:14px 0;border-top:1px solid #e5e7eb;font-size:13px;color:#6b7280;width:110px;">Name</td>
                    <td style="padding:14px 0;border-top:1px solid #e5e7eb;font-size:15px;color:#0d1117;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 0;border-top:1px solid #e5e7eb;font-size:13px;color:#6b7280;">Email</td>
                    <td style="padding:14px 0;border-top:1px solid #e5e7eb;font-size:15px;"><a href="mailto:${safeEmail}" style="color:#6C63FF;text-decoration:none;">${safeEmail}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:14px 0;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;font-size:13px;color:#6b7280;vertical-align:top;">Message</td>
                    <td style="padding:14px 0;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;font-size:15px;color:#0d1117;line-height:1.6;">${safeMessage}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Please enter your name, email, and message." }, { status: 400 });
  }

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const message = String(payload.message || "").trim();

  if (!name || !email || !message || !isValidEmail(email)) {
    return Response.json({ error: "Please enter a valid name, email, and message." }, { status: 400 });
  }

  if (name.length > 120 || email.length > 200 || message.length > 5000) {
    return Response.json({ error: "That message is too long. Please shorten it and try again." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const recipients = String(process.env.CONTACT_TO || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!host || !user || !pass || !from || recipients.length === 0) {
    return Response.json({ error: "Email is not set up yet. Please try again later." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `SafetyNett <${from}>`,
      to: recipients,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: `New website enquiry\n\nName: ${name}\nEmail: ${email}\n\n${message}`,
      html: enquiryHtml({ name, email, message }),
      attachments: [
        {
          filename: "email-logo.png",
          path: LOGO_PATH,
          cid: "safetynett-logo",
        },
      ],
    });
  } catch {
    return Response.json(
      { error: "We could not send your message. Please email m.chiweda@safetynett.co.uk directly." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
