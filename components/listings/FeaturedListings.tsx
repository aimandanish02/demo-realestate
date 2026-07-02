"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { PropertyCard } from "./PropertyCard";
import { PROPERTIES } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* Vertical scroll pins the section and pans the card track horizontally. */
export function FeaturedListings() {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce || !trackRef.current) return;

      const distance = () =>
        trackRef.current!.scrollWidth - window.innerWidth;

      gsap.to(trackRef.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.from(".listing-heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: wrapRef, dependencies: [reduce] }
  );

  return (
    <section
      id="listings"
      ref={wrapRef}
      aria-labelledby="listings-heading"
      className="relative overflow-hidden"
    >
      <div className="flex h-[100dvh] flex-col justify-center">
        <div className="listing-heading mx-auto w-full max-w-[1400px] px-5 pb-10 md:px-10">
          <h2
            id="listings-heading"
            className="font-display text-3xl font-semibold tracking-tight md:text-5xl"
          >
            Featured listings
          </h2>
          <p className="mt-3 max-w-[42ch] text-muted">
            A rotating selection. Most of what I broker never reaches a portal.
          </p>
        </div>

        <div
          ref={trackRef}
          className={`flex gap-5 pl-5 pr-[12vw] md:gap-8 md:pl-10 ${
            reduce ? "overflow-x-auto" : ""
          }`}
        >
          {PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
