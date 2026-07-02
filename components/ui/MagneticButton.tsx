"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";

type Variant = "solid" | "outline";

type Props = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  showArrow?: boolean;
};

const MAGNET_STRENGTH = 0.32;
const SPRING = { stiffness: 180, damping: 16, mass: 0.6 };

export function MagneticButton({
  children,
  href,
  variant = "solid",
  showArrow = true,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * MAGNET_STRENGTH);
    y.set((e.clientY - rect.top - rect.height / 2) * MAGNET_STRENGTH);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 active:scale-[0.98]";
  const styles =
    variant === "solid"
      ? "bg-accent text-background"
      : "border border-line bg-transparent text-foreground hover:border-accent/50";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduce ? undefined : { x: springX, y: springY }}
      className={`${base} ${styles}`}
    >
      {/* hover fill sweeps up from the bottom */}
      <span
        aria-hidden
        className={`absolute inset-0 translate-y-full rounded-full transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 ${
          variant === "solid" ? "bg-foreground" : "bg-accent"
        }`}
      />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-background">
        {children}
      </span>
      {showArrow && (
        <span className="relative z-10 grid size-5 place-items-center overflow-hidden">
          <ArrowUpRight
            weight="bold"
            className="size-4 transition-all duration-300 group-hover:-translate-y-4 group-hover:translate-x-4"
          />
          <ArrowUpRight
            weight="bold"
            className="absolute size-4 -translate-x-4 translate-y-4 text-background transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
          />
        </span>
      )}
    </motion.a>
  );
}
