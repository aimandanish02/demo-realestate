"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { SealCheck, Trophy } from "@phosphor-icons/react";
import { TEAM } from "@/lib/data";

export function TeamSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32"
    >
      <h2
        id="team-heading"
        className="font-display text-3xl font-semibold tracking-tight md:text-5xl"
      >
        Certified, accountable, on your side
      </h2>
      <p className="mt-3 max-w-[48ch] text-muted">
        Every advisor on this team holds an active real-estate certification.
        No unlicensed runners, no handoffs mid-deal.
      </p>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((member, i) => (
          <motion.article
            key={member.id}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative overflow-hidden rounded-3xl border border-line bg-surface"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

              {member.employeeOfMonth && (
                <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-background">
                  <Trophy weight="fill" className="size-3.5" />
                  Employee of the month
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-lg font-medium">{member.name}</p>
                <p className="text-sm text-muted">{member.role}</p>
                <p className="mt-2 flex items-start gap-1.5 text-xs text-muted">
                  <SealCheck weight="fill" className="mt-0.5 size-4 shrink-0 text-accent" />
                  {member.cert}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
