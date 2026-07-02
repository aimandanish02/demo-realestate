"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { NEIGHBOURHOODS, type Neighbourhood } from "@/lib/data";

const SPAN_CLASSES: Record<Neighbourhood["span"], string> = {
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  standard: "",
};

function Cell({ hood, index }: { hood: Neighbourhood; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href="#contact"
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative min-h-[240px] overflow-hidden rounded-3xl border border-line ${SPAN_CLASSES[hood.span]}`}
    >
      <Image
        src={hood.image}
        alt={`${hood.name} neighbourhood`}
        fill
        sizes="(max-width: 768px) 90vw, 45vw"
        className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl font-medium">{hood.name}</h3>
            <p className="mt-1 max-w-[36ch] text-sm text-muted opacity-0 transition-all duration-500 group-hover:opacity-100">
              {hood.blurb}
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-line bg-background/60 px-3.5 py-1.5 text-xs text-foreground backdrop-blur-md">
            {hood.listings} listings
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export function NeighbourhoodGrid() {
  return (
    <section
      id="neighbourhoods"
      aria-labelledby="neighbourhoods-heading"
      className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36"
    >
      <h2
        id="neighbourhoods-heading"
        className="font-display text-3xl font-semibold tracking-tight md:text-5xl"
      >
        Where I work
      </h2>
      <p className="mt-3 max-w-[42ch] text-muted">
        Five neighbourhoods, covered street by street.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:[grid-auto-rows:260px]">
        {NEIGHBOURHOODS.map((hood, i) => (
          <Cell key={hood.name} hood={hood} index={i} />
        ))}
      </div>
    </section>
  );
}
