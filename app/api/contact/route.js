import nodemailer from "nodemailer";

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

function recipients() {
  return String(process.env.CONTACT_TO || "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => isValidEmail(item));
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

  const to = recipients();
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !pass || to.length === 0) {
    return Response.json(
      { error: "We could not send your message. Please email m.chiweda@safetynett.co.uk directly." },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    requireTLS: true,
    auth: { user, pass },
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  try {
    await transporter.sendMail({
      from: `"SafetyNett" <${from}>`,
      to,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#111827">
          <div style="background:#4f46e5;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
            <p style="margin:0;font-size:12px;letter-spacing:.08em;text-transform:uppercase">SafetyNett</p>
            <h1 style="margin:8px 0 0;font-size:22px">New website enquiry</h1>
          </div>
          <div style="border:1px solid #e5e7eb;border-top:0;padding:24px;border-radius:0 0 12px 12px">
            <p style="margin:0 0 8px"><strong>Name</strong><br>${safeName}</p>
            <p style="margin:0 0 8px"><strong>Email</strong><br><a href="mailto:${safeEmail}">${safeEmail}</a></p>
            <p style="margin:16px 0 8px"><strong>Message</strong></p>
            <p style="margin:0;line-height:1.6">${safeMessage}</p>
          </div>
        </div>
      `,
    });
  } catch {
    return Response.json(
      { error: "We could not send your message. Please email m.chiweda@safetynett.co.uk directly." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
