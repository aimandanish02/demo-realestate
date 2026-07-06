"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AGENT } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  /* pointer-driven parallax on the hero image, motion values only */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 20 });
  const springY = useSpring(my, { stiffness: 60, damping: 20 });
  const imageX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-10, 10]);
  const cardX = useTransform(springX, [-0.5, 0.5], [18, -18]);
  const cardY = useTransform(springY, [-0.5, 0.5], [12, -12]);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMove}
      aria-labelledby="hero-heading"
      className="relative min-h-[100dvh] overflow-hidden pt-16 md:pt-[72px]"
    >
      <div className="mx-auto grid min-h-[calc(100dvh-72px)] max-w-[1400px] grid-cols-1 items-center gap-10 px-5 py-12 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <motion.p variants={item} className="mb-5 text-sm text-muted">
            {AGENT.title}
          </motion.p>

          <motion.h1
            variants={item}
            id="hero-heading"
            className="font-display text-[clamp(2.6rem,6vw,4.8rem)] font-semibold leading-[1.04] tracking-tight"
          >
            The address that fits
            <br />
            the life you&apos;re <span className="text-accent">building</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-[46ch] leading-relaxed text-muted"
          >
            I advise buyers and sellers across Kuala Lumpur&apos;s prime
            neighbourhoods, from KLCC penthouses to Damansara estates.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <MagneticButton href="#listings">View listings</MagneticButton>
            <MagneticButton href="#contact" variant="outline">
              {AGENT.consultCta}
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          className="relative aspect-[4/5] w-full max-w-[520px] justify-self-center lg:justify-self-end"
        >
          <motion.div
            style={reduce ? undefined : { x: imageX, y: imageY }}
            className="relative h-full w-full overflow-hidden rounded-3xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000&h=1250&fit=crop&auto=format&q=80"
              alt="Luxury residence in Kuala Lumpur at dusk"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 520px"
              className="scale-110 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </motion.div>

          {/* glass teaser card floats against pointer direction */}
          <motion.div
            style={reduce ? undefined : { x: cardX, y: cardY }}
            className="absolute -bottom-5 -left-4 rounded-2xl border border-line bg-surface/70 p-5 backdrop-blur-xl md:-left-10"
          >
            <p className="text-xs text-muted">Latest listing</p>
            <p className="mt-1 font-display text-lg font-medium">
              The Estella Residence
            </p>
            <p className="mt-0.5 text-sm text-accent">RM 4,280,000</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
