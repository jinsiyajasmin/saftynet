const TO = "m.chiweda@safetynett.co.uk";
const COPY = "no-reply@safetynett.co.uk,athulya@safetynett.co.uk";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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

  const response = await fetch(`https://formsubmit.co/ajax/${TO}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      message,
      _subject: `New enquiry from ${name}`,
      _replyto: email,
      _cc: COPY,
      _template: "box",
      _captcha: "false",
    }),
  });

  const result = await response.json().catch(() => ({}));
  const succeeded = response.ok && String(result.success) !== "false";

  if (!succeeded) {
    const notice = String(result.message || "");
    if (/activat/i.test(notice)) {
      return Response.json(
        {
          error:
            "One confirmation is needed first. Open the email sent to m.chiweda@safetynett.co.uk, click Activate Form, then send this message again.",
        },
        { status: 409 }
      );
    }

    return Response.json(
      { error: "We could not send your message. Please email m.chiweda@safetynett.co.uk directly." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
