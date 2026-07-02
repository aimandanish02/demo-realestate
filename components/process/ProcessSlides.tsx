"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { PROCESS_SLIDES } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* Full-screen slides pin and stack like a deck: the outgoing slide scales
   down and fades as the next one scrolls over it. */
export function ProcessSlides() {
  const wrapRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce) return;

      const slides = gsap.utils.toArray<HTMLElement>(".process-slide");

      slides.forEach((slide, i) => {
        if (i === slides.length - 1) return;

        ScrollTrigger.create({
          trigger: slide,
          start: "top top",
          endTrigger: slides[slides.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });

        gsap.to(slide, {
          scale: 0.9,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: slides[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });

      slides.forEach((slide) => {
        gsap.from(slide.querySelectorAll(".slide-inner"), {
          y: 48,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: slide, start: "top 60%" },
        });
      });
    },
    { scope: wrapRef, dependencies: [reduce] }
  );

  return (
    <section id="process" ref={wrapRef} aria-labelledby="process-heading">
      <div className="mx-auto max-w-[1400px] px-5 pb-14 pt-24 md:px-10 md:pt-36">
        <h2
          id="process-heading"
          className="font-display text-3xl font-semibold tracking-tight md:text-5xl"
        >
          How a deal moves
        </h2>
        <p className="mt-3 max-w-[42ch] text-muted">
          Four stages, each one signed off before the next begins.
        </p>
      </div>

      <div className="relative">
        {PROCESS_SLIDES.map((slide) => (
          <div
            key={slide.index}
            className="process-slide sticky top-0 flex min-h-[100dvh] items-center bg-background"
          >
            <div className="slide-inner mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-5 py-16 md:px-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="font-display text-[clamp(4rem,10vw,8rem)] font-semibold leading-none text-accent/25">
                  {slide.index}
                </span>
                <h3 className="mt-2 font-display text-3xl font-medium md:text-4xl">
                  {slide.title}
                </h3>
                <p className="mt-5 max-w-[46ch] leading-relaxed text-muted">
                  {slide.body}
                </p>
              </div>
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-line">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 1024px) 90vw, 640px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
