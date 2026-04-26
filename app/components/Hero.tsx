"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  const reduce = useReducedMotion();
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

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: { opacity: 1, y: 0 },
  } as const;

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: 0.05,
      },
    },
  } as const;

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[92svh] items-center pt-24"
    >
      <div className="container-base relative z-10 grid items-center gap-10 sm:gap-12 lg:grid-cols-12">
        <motion.div
          className="lg:col-span-7"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.div
            variants={item}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-surface/70 px-3 py-1 text-xs text-slate-300 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {config.hero.availability}
          </motion.div>

          <motion.p
            variants={item}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-6 text-sm font-medium text-slate-400"
          >
            {config.hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={item}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-1 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <span className="bg-gradient-to-r from-white via-white to-accent-200 bg-clip-text text-transparent">
              {displayName}
            </span>
          </motion.h1>

          <motion.div
            variants={item}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-base sm:text-lg text-slate-300"
          >
            <span className="font-medium text-white">
              {config.hero.headline}
            </span>
            <span className="text-slate-600">·</span>
            <span className="font-mono text-sm sm:text-base text-accent-300 caret-blink">
              {typed}
            </span>
          </motion.div>

          <motion.p
            variants={item}
            transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-300/90 text-balance"
          >
            {loading
              ? "Memuat profil…"
              : user?.bio && config.about.bioOverride === null
                ? user.bio
                : config.hero.summary}
          </motion.p>

          <motion.div
            variants={item}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#projects" className="btn btn-primary group">
              Lihat Proyek
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Hubungi Saya
            </a>
          </motion.div>

          <motion.div
            variants={item}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-slate-500" />
              {config.hero.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="font-mono text-slate-500">
                {loading ? "—" : (user?.public_repos ?? 0)}
              </span>
              <span>repositori publik</span>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hidden lg:col-span-5 lg:block"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
        >
          <ProfileCard user={user} loading={loading} />
        </motion.div>
      </div>
    </section>
  );
}

function ProfileCard({
  user,
  loading,
}: {
  user: GitHubUser | null;
  loading?: boolean;
}) {
  return (
    <motion.div
      className="card relative overflow-hidden p-6 shadow-soft"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div
        aria-hidden
        className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent-400/10 blur-3xl"
      />
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
    </motion.div>
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
