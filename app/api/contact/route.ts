import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/schemas/contact";

export const runtime = "nodejs";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email";

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

async function verifyTurnstile(token: string, remoteIp: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    throw new Error("TURNSTILE_SECRET_KEY is not configured");
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  const res = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = (await res.json()) as TurnstileVerifyResponse;
  return data.success === true;
}

async function sendContactEmail(input: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    throw new Error("Brevo email environment variables are not configured");
  }

  const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (char) => {
      const entities: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return entities[char];
    });

  const res = await fetch(BREVO_SEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { email: fromEmail, name: "Website Contact Form" },
      to: [{ email: toEmail }],
      replyTo: { email: input.email, name: input.name },
      subject: `New contact form submission from ${input.name}`,
      htmlContent: `
        <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(input.phone || "—")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(input.message).replace(/\n/g, "<br />")}</p>
      `,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Brevo send failed (${res.status}): ${errorBody}`);
  }
}

export async function POST(request: NextRequest) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid form data", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { name, email, phone, message, turnstileToken, referenceId } = parsed.data;

  // Honeypot tripped: pretend success, do not tip off the bot.
  if (referenceId && referenceId.length > 0) {
    return NextResponse.json({ ok: true });
  }

  try {
    const remoteIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    const verified = await verifyTurnstile(turnstileToken, remoteIp);
    if (!verified) {
      return NextResponse.json(
        { ok: false, error: "Verification failed. Please try again." },
        { status: 400 },
      );
    }

    await sendContactEmail({ name, email, phone, message });

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Unexpected error";
    console.error("[contact] submission failed:", errMessage);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please try again shortly." },
      { status: 500 },
    );
  }
}
