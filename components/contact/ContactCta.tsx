"use client";

import { Phone, EnvelopeSimple, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { CalendlyEmbed } from "@/components/contact/CalendlyEmbed";
import { AGENT, NAV_LINKS } from "@/lib/data";

export function ContactCta() {
  return (
    <footer id="contact" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-[1400px] px-5 pb-14 pt-24 md:px-10 md:pt-36">
        <Reveal>
          <h2
            id="contact-heading"
            className="font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[1.05] tracking-tight"
          >
            Let&apos;s find your
            <br />
            next <span className="text-accent">address</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <MagneticButton href={`mailto:${AGENT.email}`}>
              {AGENT.consultCta}
            </MagneticButton>
            <div className="flex flex-col gap-1 text-sm text-muted">
              <a
                href={`tel:${AGENT.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Phone className="size-4 text-accent" /> {AGENT.phone}
              </a>
              <a
                href={`mailto:${AGENT.email}`}
                className="flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <EnvelopeSimple className="size-4 text-accent" /> {AGENT.email}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h3 className="mt-20 font-display text-2xl font-medium">
            Or pick a slot directly
          </h3>
          <p className="mt-2 max-w-[48ch] text-sm text-muted">
            Live availability below — book a consultation without waiting for a reply.
          </p>
        </Reveal>
        <CalendlyEmbed />

        <ContactForm />

        <div className="mt-20 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted">
            {AGENT.name} · REN 08214 · Demo site, all content fictional.
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-6 text-sm text-muted">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="flex gap-3">
                <a
                  href="#top"
                  aria-label="Instagram"
                  className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <InstagramLogo className="size-4" />
                </a>
                <a
                  href="#top"
                  aria-label="LinkedIn"
                  className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <LinkedinLogo className="size-4" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
