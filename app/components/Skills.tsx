"use client";

import config from "../config";
import { SectionHeader } from "./About";

const colorMap = {
  cyan: { from: "from-neon-cyan", text: "text-neon-cyan", shadow: "shadow-neon-cyan" },
  magenta: {
    from: "from-neon-magenta",
    text: "text-neon-magenta",
    shadow: "shadow-neon-magenta",
  },
  yellow: {
    from: "from-neon-yellow",
    text: "text-neon-yellow",
    shadow: "shadow-neon-yellow",
  },
  lime: { from: "from-neon-lime", text: "text-neon-lime", shadow: "shadow-neon-lime" },
  violet: {
    from: "from-neon-violet",
    text: "text-neon-violet",
    shadow: "shadow-neon-violet",
  },
} as const;

export default function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="container-cyber">
        <SectionHeader kicker="// 03_skills" title="SKILL_MATRIX.SYS" />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {config.skills.map((s) => {
            const c = colorMap[s.color ?? "cyan"];
            return (
              <div
                key={s.name}
                className="panel panel-hover p-4"
              >
                <div className="flex items-baseline justify-between">
                  <span className={`heading-display text-sm ${c.text}`}>{s.name}</span>
                  <span className="font-mono text-xs text-slate-400">{s.level}%</span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
                  <div
                    className={`h-full bg-gradient-to-r ${c.from} via-white/80 to-transparent ${c.shadow}`}
                    style={{ width: `${Math.min(100, Math.max(0, s.level))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
