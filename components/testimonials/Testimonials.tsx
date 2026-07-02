"use client";

import { motion, useReducedMotion } from "motion/react";
import { Quotes } from "@phosphor-icons/react";
import { TESTIMONIALS } from "@/lib/data";

export function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="border-y border-line bg-surface"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <h2
          id="testimonials-heading"
          className="font-display text-3xl font-semibold tracking-tight md:text-5xl"
        >
          After the keys changed hands
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="flex flex-col justify-between rounded-3xl border border-line bg-raised p-7 transition-colors duration-300 hover:border-accent/30"
            >
              <div>
                <Quotes weight="fill" className="size-7 text-accent" />
                <blockquote className="mt-5 leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-8 border-t border-line pt-5">
                <p className="font-medium">{t.name}</p>
                <p className="mt-0.5 text-sm text-muted">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
