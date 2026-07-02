"use client";

import { useReducedMotion } from "motion/react";
import { NEIGHBOURHOODS } from "@/lib/data";

/* Single marquee on the page: neighbourhood names drifting under the hero.
   Keyframes live in globals.css (.marquee-track). */
export function LocationsMarquee() {
  const reduce = useReducedMotion();
  const names = NEIGHBOURHOODS.map((n) => n.name);
  const row = [...names, ...names, ...names];

  return (
    <div aria-hidden className="overflow-hidden border-y border-line py-6">
      <div
        className={`flex w-max gap-12 whitespace-nowrap ${
          reduce ? "" : "marquee-track"
        }`}
      >
        {row.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-display text-2xl font-medium text-muted/50 md:text-3xl"
          >
            {name}
            <span className="ml-12 inline-block size-1.5 rounded-full bg-accent/40 align-middle" />
          </span>
        ))}
      </div>
    </div>
  );
}
