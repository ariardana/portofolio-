"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import config from "../config";
import type { GitHubUser } from "../lib/github";

type Props = {
  user: GitHubUser | null;
  loading?: boolean;
};

export default function Hero({ user, loading }: Props) {
  const roles = config.hero.roles;
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const tick = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, typed.length + 1);
          setTyped(next);
          if (next === current) {
            setTimeout(() => setDeleting(true), 1500);
          }
        } else {
          const next = current.slice(0, Math.max(0, typed.length - 1));
          setTyped(next);
          if (next.length === 0) {
            setDeleting(false);
            setRoleIdx((i) => (i + 1) % roles.length);
          }
        }
      },
      deleting ? 30 : 65,
    );
    return () => clearTimeout(tick);
  }, [typed, deleting, roleIdx, roles]);

  const displayName =
    config.hero.nameOverride || user?.name || user?.login || "Developer";

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[92svh] items-center pt-24"
    >
      <div className="container-base relative z-10 grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-surface px-3 py-1 text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {config.hero.availability}
          </div>

          <p className="mt-6 text-sm font-medium text-slate-400">
            {config.hero.eyebrow}
          </p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {displayName}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-lg text-slate-300">
            <span className="font-medium text-white">
              {config.hero.headline}
            </span>
            <span className="text-slate-600">·</span>
            <span className="font-mono text-base text-accent-300 caret-blink">
              {typed}
            </span>
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300/90 text-balance">
            {loading
              ? "Memuat profil…"
              : (user?.bio && config.about.bioOverride === null)
                ? user.bio
                : config.hero.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary">
              Lihat Proyek
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Hubungi Saya
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-slate-500" />
              {config.hero.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="font-mono text-slate-500">{loading ? "—" : user?.public_repos ?? 0}</span>
              <span>repositori publik</span>
            </span>
          </div>
        </div>

        <div className="hidden lg:col-span-5 lg:block">
          <ProfileCard user={user} loading={loading} />
        </div>
      </div>
    </section>
  );
}

function ProfileCard({ user, loading }: { user: GitHubUser | null; loading?: boolean }) {
  return (
    <div className="card p-6 shadow-soft">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border-strong">
          {user?.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt={user.login}
              fill
              sizes="64px"
              className="object-cover"
              unoptimized
              priority
            />
          ) : (
            <div className="grid h-full place-items-center bg-bg-elevated text-xs text-slate-500">
              {loading ? "..." : "—"}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">
            {user?.name || config.hero.nameOverride}
          </p>
          <p className="truncate text-xs text-slate-400">
            @{user?.login || config.github.username}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4">
        <Stat label="Repos" value={loading ? "—" : String(user?.public_repos ?? 0)} />
        <Stat label="Followers" value={loading ? "—" : String(user?.followers ?? 0)} />
        <Stat label="Following" value={loading ? "—" : String(user?.following ?? 0)} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-lg font-semibold text-white">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}
