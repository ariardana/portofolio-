"use client";

import Image from "next/image";
import { Calendar, Globe, MapPin, Twitter, Users } from "lucide-react";
import config from "../config";
import type { GitHubUser } from "../lib/github";

type Props = { user: GitHubUser | null; loading?: boolean };

export default function About({ user, loading }: Props) {
  const bio =
    config.about.bioOverride ??
    user?.bio ??
    (loading ? "// loading bio from github..." : "Fullstack Dev in progress. React | Node.js | Laravel.");
  const created = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(config.site.locale, {
        year: "numeric",
        month: "long",
      })
    : null;

  return (
    <section id="about" className="relative py-24">
      <div className="container-cyber">
        <SectionHeader kicker="// 02_about" title="WHO IS THIS RUNNER?" />

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Avatar card */}
          <div className="lg:col-span-4">
            <div className="panel panel-hover relative p-1">
              <div className="absolute -top-3 left-4 z-10 chip text-neon-cyan border-neon-cyan/40 bg-ink-900">
                profile.dat
              </div>
              <div className="relative aspect-square overflow-hidden">
                {user?.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    alt={user.login}
                    fill
                    className="object-cover saturate-[1.1] contrast-[1.05]"
                    sizes="(min-width: 1024px) 320px, 80vw"
                    unoptimized
                    priority
                  />
                ) : (
                  <div className="grid h-full place-items-center font-mono text-neon-cyan/60">
                    NO_SIGNAL
                  </div>
                )}
                {/* Overlay scanlines + grid */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_0,transparent_2px,rgba(0,0,0,0.3)_3px)] bg-[length:100%_3px] mix-blend-overlay" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-neon-cyan/30" />
              </div>
            </div>

            <div className="mt-4 grid gap-2 font-mono text-xs">
              {user?.location && (
                <InfoRow icon={<MapPin className="h-3.5 w-3.5" />} label={user.location} />
              )}
              {created && (
                <InfoRow
                  icon={<Calendar className="h-3.5 w-3.5" />}
                  label={`joined ${created}`}
                />
              )}
              {user?.followers !== undefined && (
                <InfoRow
                  icon={<Users className="h-3.5 w-3.5" />}
                  label={`${user.followers} followers · ${user.following} following`}
                />
              )}
              {user?.blog && (
                <InfoRow
                  icon={<Globe className="h-3.5 w-3.5" />}
                  label={user.blog}
                  href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                />
              )}
              {user?.twitter_username && (
                <InfoRow
                  icon={<Twitter className="h-3.5 w-3.5" />}
                  label={`@${user.twitter_username}`}
                  href={`https://twitter.com/${user.twitter_username}`}
                />
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-8">
            <div className="panel p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-magenta">
                /// transmission begin
              </p>
              <p className="mt-4 text-lg text-slate-200">{bio}</p>
              {config.about.extraParagraphs.map((p, i) => (
                <p key={i} className="mt-4 text-slate-300/90">
                  {p}
                </p>
              ))}

              <div className="mt-8 grid gap-2 sm:grid-cols-2">
                {config.about.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-center gap-3 border-l-2 border-neon-cyan/60 bg-neon-cyan/[0.04] px-3 py-2 text-sm text-slate-200"
                  >
                    <span className="font-mono text-neon-cyan">▌</span>
                    {h}
                  </div>
                ))}
              </div>

              <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-neon-magenta">
                /// transmission end
              </p>
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
    <span className="flex items-center gap-2 text-slate-300">
      <span className="text-neon-cyan">{icon}</span>
      <span className="truncate">{label}</span>
    </span>
  );
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="block rounded-sm border border-white/5 bg-white/[0.02] px-3 py-2 transition hover:border-neon-cyan/40 hover:bg-neon-cyan/[0.05]"
      >
        {inner}
      </a>
    );
  }
  return (
    <div className="block rounded-sm border border-white/5 bg-white/[0.02] px-3 py-2">
      {inner}
    </div>
  );
}

export function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-3">
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2 className="section-heading mt-2">{title}</h2>
      </div>
      <div className="hidden h-px flex-1 bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/40 to-transparent sm:block" />
    </div>
  );
}
