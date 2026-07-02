"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { AGENT, NAV_LINKS } from "@/lib/data";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsHidden(latest > previous && latest > 160 && !isOpen);
  });

  return (
    <>
      <motion.header
        animate={reduce ? undefined : { y: isHidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-40 border-b border-line bg-background/70 backdrop-blur-xl"
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-[72px] md:px-10"
        >
          <a
            href="#top"
            className="font-display text-lg font-semibold tracking-tight"
          >
            Adrian Yeoh
            <span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative text-sm text-muted transition-colors duration-300 hover:text-foreground"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full border border-accent/40 px-5 py-2 text-sm text-accent transition-all duration-300 hover:bg-accent hover:text-background lg:inline-block"
            >
              {AGENT.consultCta}
            </a>
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-full border border-line lg:hidden"
            >
              {isOpen ? <X className="size-5" /> : <List className="size-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 z-30 border-b border-line bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col px-5 py-6">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block border-b border-line py-4 font-display text-2xl font-medium"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-5">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-background"
                >
                  {AGENT.consultCta}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
