"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Script from "next/script";
import { Reveal } from "@/components/ui/Reveal";

type Status = "idle" | "submitting" | "success" | "error";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const fieldClass =
  "w-full rounded-2xl border border-line bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-muted/70 transition-colors duration-300 outline-none focus:border-accent/60";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const turnstileTokenRef = useRef<string>("");
  const honeypotId = useId();

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!scriptReady || !widgetContainerRef.current || !window.turnstile) return;
    if (widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(widgetContainerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "dark",
      callback: (token) => {
        turnstileTokenRef.current = token;
      },
      "expired-callback": () => {
        turnstileTokenRef.current = "";
      },
      "error-callback": () => {
        turnstileTokenRef.current = "";
      },
    });
  }, [scriptReady]);

  const resetTurnstile = () => {
    turnstileTokenRef.current = "";
    if (widgetIdRef.current) {
      window.turnstile?.reset(widgetIdRef.current);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
      turnstileToken: turnstileTokenRef.current,
      referenceId: String(formData.get("referenceId") ?? ""),
    };

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        resetTurnstile();
        return;
      }

      setStatus("success");
      form.reset();
      resetTurnstile();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
      resetTurnstile();
    }
  };

  return (
    <Reveal delay={0.15}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="mt-14 grid max-w-2xl gap-5"
      >
        {/* Honeypot: hidden from real visitors, opted out of password-manager autofill. */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
        >
          <label htmlFor={honeypotId}>Reference ID</label>
          <input
            id={honeypotId}
            name="referenceId"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            data-lpignore="true"
            data-1p-ignore="true"
            aria-hidden="true"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="mb-2 block text-xs uppercase tracking-wide text-muted">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              maxLength={120}
              autoComplete="name"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-2 block text-xs uppercase tracking-wide text-muted">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-phone" className="mb-2 block text-xs uppercase tracking-wide text-muted">
            Phone <span className="normal-case text-muted/60">(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-2 block text-xs uppercase tracking-wide text-muted">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            maxLength={4000}
            rows={5}
            className={`${fieldClass} resize-none`}
          />
        </div>

        <div ref={widgetContainerRef} />

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-accent px-7 py-3.5 text-sm font-medium tracking-wide text-background transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Send message"}
          </button>

          {status === "success" && (
            <p role="status" className="text-sm text-accent">
              Thanks — your message has been sent. I&apos;ll reply shortly.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-sm text-red-400">
              {errorMessage}
            </p>
          )}
        </div>
      </form>
    </Reveal>
  );
}
