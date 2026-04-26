"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import config from "../config";
import { SectionHeader } from "./About";
import Reveal, { Stagger, StaggerItem } from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-base">
        <Reveal>
          <SectionHeader eyebrow="Skills" title="Keahlian & Teknologi" />
        </Reveal>

        <Stagger className="mt-10 sm:mt-12 grid gap-3 sm:gap-4 sm:grid-cols-2">
          {config.skills.map((s) => (
            <StaggerItem key={s.name} as="div" className="card card-hover p-4 sm:p-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-white">{s.name}</span>
                <span className="text-xs font-mono text-slate-400 tabular-nums">
                  {s.level}%
                </span>
              </div>
              {s.category && (
                <p className="mt-1 text-xs text-slate-500">{s.category}</p>
              )}
              <SkillBar level={s.level} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function SkillBar({ level }: { level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const target = Math.min(100, Math.max(0, level));
  return (
    <div ref={ref} className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-accent-500 via-accent-400 to-accent-300"
        initial={{ width: 0 }}
        animate={{ width: inView ? `${target}%` : 0 }}
        transition={{
          duration: reduce ? 0 : 1.0,
          ease: [0.22, 0.61, 0.36, 1],
          delay: 0.05,
        }}
      />
    </div>
  );
}
