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
import Reveal, { Stagger, StaggerItem } from "./Reveal";

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
        <Reveal>
          <SectionHeader eyebrow="Contact" title={config.contact.headline} />
        </Reveal>

        <div className="mt-10 sm:mt-12 grid gap-5 sm:gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="card relative overflow-hidden p-6 sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-400/10 blur-3xl"
              />
              <p className="relative text-base leading-relaxed text-slate-300">
                {config.contact.message}
              </p>

              <a
                href={`mailto:${config.contact.email}`}
                className="btn btn-primary group mt-6"
              >
                <Mail className="h-4 w-4" />
                <span className="break-all sm:break-normal">{config.contact.email}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          <Stagger className="grid gap-2 lg:col-span-5">
            {config.contact.socials.map((s) => {
              const Icon = ICONS[s.icon] ?? Globe;
              return (
                <StaggerItem key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="card card-hover group flex items-center justify-between p-4"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-md border border-border bg-bg-elevated text-slate-300 transition-colors group-hover:border-accent-400/40 group-hover:text-accent-300">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-white">
                        {s.label}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-slate-500 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </a>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
