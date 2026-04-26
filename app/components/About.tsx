"use client";

import Image from "next/image";
import { Calendar, Check, Globe, MapPin, Twitter, Users } from "lucide-react";
import config from "../config";
import type { GitHubUser } from "../lib/github";

type Props = { user: GitHubUser | null; loading?: boolean };

export default function About({ user, loading }: Props) {
  const created = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(config.site.locale, {
        year: "numeric",
        month: "long",
      })
    : null;

  return (
    <section id="about" className="section">
      <div className="container-base">
        <SectionHeader eyebrow="About" title="Tentang Saya" />

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="card overflow-hidden">
              <div className="relative aspect-square">
                {user?.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    alt={user.login}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 320px, 80vw"
                    unoptimized
                  />
                ) : (
                  <div className="grid h-full place-items-center text-sm text-slate-500">
                    {loading ? "Memuat…" : "—"}
                  </div>
                )}
              </div>
              <div className="grid gap-2 p-4 text-sm">
                {user?.location && (
                  <InfoRow icon={<MapPin className="h-4 w-4" />} label={user.location} />
                )}
                {created && (
                  <InfoRow
                    icon={<Calendar className="h-4 w-4" />}
                    label={`Bergabung ${created}`}
                  />
                )}
                {user?.followers !== undefined && (
                  <InfoRow
                    icon={<Users className="h-4 w-4" />}
                    label={`${user.followers} followers · ${user.following} following`}
                  />
                )}
                {user?.blog && (
                  <InfoRow
                    icon={<Globe className="h-4 w-4" />}
                    label={user.blog}
                    href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                  />
                )}
                {user?.twitter_username && (
                  <InfoRow
                    icon={<Twitter className="h-4 w-4" />}
                    label={`@${user.twitter_username}`}
                    href={`https://twitter.com/${user.twitter_username}`}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-5">
              {config.about.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-slate-300">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {config.about.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-start gap-3 rounded-lg border border-border bg-bg-surface px-4 py-3 text-sm text-slate-200"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const inner = (
    <span className="flex items-center gap-2.5 text-slate-300">
      <span className="text-slate-500">{icon}</span>
      <span className="truncate">{label}</span>
    </span>
  );
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="block rounded-md px-2 py-1.5 transition-colors hover:bg-bg-elevated hover:text-white"
      >
        {inner}
      </a>
    );
  }
  return <div className="block px-2 py-1.5">{inner}</div>;
}

export function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-2">{title}</h2>
    </div>
  );
}
