const RECIPIENTS = ["m.chiweda@safetynett.co.uk", "no-reply@safetynett.co.uk"];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="background:#6C63FF;padding:28px 32px;">
                <p style="margin:0;color:#ffffff;font-size:13px;letter-spacing:1px;text-transform:uppercase;">SafetyNett</p>
                <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;font-weight:700;">New website enquiry</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;">
                <p style="margin:0 0 20px;color:#4b5563;font-size:15px;line-height:1.6;">Someone sent a message from the contact form.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding:12px 0;border-top:1px solid #e5e7eb;font-size:13px;color:#6b7280;width:110px;">Name</td>
                    <td style="padding:12px 0;border-top:1px solid #e5e7eb;font-size:15px;color:#111827;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-top:1px solid #e5e7eb;font-size:13px;color:#6b7280;">Email</td>
                    <td style="padding:12px 0;border-top:1px solid #e5e7eb;font-size:15px;"><a href="mailto:${safeEmail}" style="color:#6C63FF;text-decoration:none;">${safeEmail}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;font-size:13px;color:#6b7280;vertical-align:top;">Message</td>
                    <td style="padding:12px 0;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;font-size:15px;color:#111827;line-height:1.6;">${safeMessage}</td>
                  </tr>
                </table>
                <p style="margin:24px 0 0;">
                  <a href="mailto:${safeEmail}" style="display:inline-block;background:#6C63FF;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:10px;font-size:14px;font-weight:600;">Reply to ${safeName}</a>
                </p>
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Email is not set up yet. Please try again later." }, { status: 500 });
  }

  const from = process.env.CONTACT_FROM_EMAIL || "SafetyNett <no-reply@safetynett.co.uk>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: RECIPIENTS,
      reply_to: email,
      subject: `New enquiry from ${name}`,
      html: enquiryHtml({ name, email, message }),
      text: `New website enquiry\n\nName: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    return Response.json(
      { error: "We could not send your message. Please email m.chiweda@safetynett.co.uk directly." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
