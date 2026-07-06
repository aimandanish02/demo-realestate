"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { AGENT, STATS } from "@/lib/data";

function StatValue({
  value,
  prefix,
  suffix,
}: {
  value: number;
  prefix: string;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, reduce, count, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-semibold md:text-5xl">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[3/4] max-w-[440px] overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=1200&fit=crop&auto=format&q=80"
              alt={`${AGENT.name}, ${AGENT.title}`}
              fill
              sizes="(max-width: 1024px) 90vw, 440px"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 rounded-2xl border border-line bg-surface/80 px-6 py-4 backdrop-blur-xl md:right-8">
            <p className="font-display text-lg font-medium">{AGENT.name}</p>
            <p className="text-sm text-muted">Prime KL since 2015</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h2
              id="about-heading"
              className="font-display text-3xl font-semibold tracking-tight md:text-5xl"
            >
              Most agents list property.
              <br />
              <span className="text-accent">I place people.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[52ch] leading-relaxed text-muted">
              Eleven years in Kuala Lumpur&apos;s prime market taught me that
              the right home is rarely the loudest listing. I work with a small
              number of clients at a time, on both sides of the table, so every
              transaction gets negotiated like it&apos;s my own.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={0.08 * i}>
                <StatValue
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
