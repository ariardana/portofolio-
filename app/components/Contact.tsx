"use client";

import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";
import config, { type SocialLink } from "../config";
import { SectionHeader } from "./About";

const ICONS: Record<SocialLink["icon"], React.ComponentType<{ className?: string }>> = {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Globe,
  Youtube,
  Send,
  Phone,
};

export default function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <div className="container-cyber">
        <SectionHeader kicker="// 05_contact" title="OPEN_A_CHANNEL" />

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="panel p-6 sm:p-8 lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-magenta">
              /// secure_line
            </p>
            <h3 className="mt-2 heading-display text-2xl text-white sm:text-3xl">
              Let&apos;s build something <span className="text-glow-cyan">neon</span>.
            </h3>
            <p className="mt-3 text-slate-300/90">
              Punya ide proyek, ingin kolaborasi, atau sekedar ngobrol soal kode?
              Kirim sinyal lewat salah satu kanal di samping. Saya biasanya
              merespons dalam 24 jam.
            </p>

            <a
              href={`mailto:${config.contact.email}`}
              className="btn-neon mt-6"
            >
              <Mail className="h-4 w-4" />
              {config.contact.email}
            </a>
          </div>

          <div className="grid gap-3 lg:col-span-5">
            {config.contact.socials.map((s) => {
              const Icon = ICONS[s.icon] ?? Globe;
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="panel panel-hover flex items-center justify-between p-4"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center border border-neon-cyan/40 bg-neon-cyan/[0.06] text-neon-cyan">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="heading-display text-sm text-white">{s.label}</span>
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-400 group-hover:text-neon-cyan">
                    OPEN ↗
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
