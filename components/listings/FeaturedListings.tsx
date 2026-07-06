"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { PropertyCard } from "./PropertyCard";
import { PROPERTIES, type ListingCategory } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CATEGORY_FILTERS: Array<ListingCategory | "All"> = [
  "All",
  "For Sale",
  "Airbnb",
  "Rent",
];

/* Vertical scroll pins the section and pans the card track horizontally. */
export function FeaturedListings() {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<ListingCategory | "All">(
    "All"
  );

  const properties =
    activeCategory === "All"
      ? PROPERTIES
      : PROPERTIES.filter((property) => property.category === activeCategory);

  useGSAP(
    () => {
      if (reduce || !trackRef.current) return;

      const distance = () =>
        trackRef.current!.scrollWidth - window.innerWidth;

      gsap.to(trackRef.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          id: "listings-pin",
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

  /* x/end are functions, so they re-evaluate against the current DOM on
   * refresh alone — no need to tear down and rebuild the ScrollTrigger,
   * which risked leaving a second pin-spacer around the same trigger. */
  useEffect(() => {
    if (reduce) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [activeCategory, reduce]);

  /* Filtering mid-pin changes the scrub distance while scrollY stays put,
   * so the trigger can read itself as already past the new (shorter) end
   * and unpin instantly — teleporting the page past the section. Snapping
   * to the section's top *before* the card list changes means refresh
   * always runs from a clean, not-yet-pinned state instead of racing a
   * live pin recalculation.
   *
   * Must read the pin's cached `.start` here, not
   * wrapRef.getBoundingClientRect() — while actively pinned the section
   * is fixed to the viewport, so its rect.top reads 0 and `0 + scrollY`
   * always equals the current scrollY, silently no-opping the snap right
   * when it's needed most. */
  function handleCategoryClick(category: ListingCategory | "All") {
    const pin = ScrollTrigger.getById("listings-pin");
    if (pin && window.scrollY > pin.start) {
      window.scrollTo({ top: pin.start, behavior: "instant" });
    }
    setActiveCategory(category);
  }

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

          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter listings by category">
            {CATEGORY_FILTERS.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryClick(category)}
                aria-pressed={activeCategory === category}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors duration-300 ${
                  activeCategory === category
                    ? "border-accent bg-accent text-background"
                    : "border-line text-muted hover:border-accent/40 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={trackRef}
          className={`flex gap-5 pl-5 pr-[12vw] md:gap-8 md:pl-10 ${
            reduce ? "overflow-x-auto" : ""
          }`}
        >
          {properties.map((property, i) => (
            <PropertyCard key={property.id} property={property} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
