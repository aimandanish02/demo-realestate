"use client";

import Script from "next/script";
import { Reveal } from "@/components/ui/Reveal";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

/* Calendly's own hosted widget: visitor sees live availability and books
   directly. Booking auto-creates the event on the connected calendar
   (Google/Outlook/iCloud — configured in Calendly account settings, not
   here) and emails both sides a confirmation. No backend needed. */
export function CalendlyEmbed() {
  if (!CALENDLY_URL) return null;

  return (
    <Reveal delay={0.1}>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <div
        className="calendly-inline-widget mt-14 overflow-hidden rounded-3xl border border-line"
        data-url={CALENDLY_URL}
        style={{ minWidth: "280px", height: "700px" }}
      />
    </Reveal>
  );
}
