"use client";

import config from "../config";
import { SectionHeader } from "./About";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-base">
        <SectionHeader eyebrow="Skills" title="Keahlian & Teknologi" />

        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {config.skills.map((s) => (
            <div key={s.name} className="card card-hover p-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-white">{s.name}</span>
                <span className="text-xs font-mono text-slate-400">{s.level}%</span>
              </div>
              {s.category && (
                <p className="mt-1 text-xs text-slate-500">{s.category}</p>
              )}
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
                <div
                  className="h-full rounded-full bg-accent-400"
                  style={{ width: `${Math.min(100, Math.max(0, s.level))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
