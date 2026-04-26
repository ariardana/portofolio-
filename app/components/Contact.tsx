"use client";

import {
  ArrowUpRight,
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
    <section id="contact" className="section">
      <div className="container-base">
        <SectionHeader eyebrow="Contact" title={config.contact.headline} />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="card p-6 sm:p-8 lg:col-span-7">
            <p className="text-base leading-relaxed text-slate-300">
              {config.contact.message}
            </p>

            <a
              href={`mailto:${config.contact.email}`}
              className="btn btn-primary mt-6"
            >
              <Mail className="h-4 w-4" />
              {config.contact.email}
            </a>
          </div>

          <div className="grid gap-2 lg:col-span-5">
            {config.contact.socials.map((s) => {
              const Icon = ICONS[s.icon] ?? Globe;
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="card card-hover group flex items-center justify-between p-4"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-md border border-border bg-bg-elevated text-slate-300 group-hover:text-accent-300">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-white">
                      {s.label}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-500 transition-colors group-hover:text-white" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
