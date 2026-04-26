"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Cpu, Zap } from "lucide-react";
import config from "../config";
import type { GitHubUser } from "../lib/github";
import GlitchText from "./GlitchText";

type Props = {
  user: GitHubUser | null;
  loading?: boolean;
};

export default function Hero({ user, loading }: Props) {
  const roles = config.hero.roles;
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Typewriter effect for role
  useEffect(() => {
    const current = roles[roleIdx];
    const tick = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, typed.length + 1);
          setTyped(next);
          if (next === current) {
            setTimeout(() => setDeleting(true), 1400);
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
      deleting ? 35 : 70,
    );
    return () => clearTimeout(tick);
  }, [typed, deleting, roleIdx, roles]);

  const displayName =
    config.hero.nameOverride || user?.name || user?.login || "DEVELOPER";

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center pt-20"
    >
      <div className="container-cyber relative z-10 grid items-center gap-10 lg:grid-cols-12">
        {/* Left: text */}
        <div className="lg:col-span-7">
          <p className="section-kicker mb-4 inline-flex items-center gap-2 animate-flicker">
            <Zap className="h-3 w-3" />
            {config.hero.tagline}
          </p>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-[0.95]">
            <GlitchText className="text-white">{displayName.toUpperCase()}</GlitchText>
          </h1>

          <div className="mt-6 flex items-center gap-3 font-mono text-sm sm:text-base">
            <span className="text-neon-magenta">{">"}</span>
            <span className="text-slate-300">role:</span>
            <span className="text-neon-cyan caret">{typed}</span>
          </div>

          <p className="mt-6 max-w-xl text-base text-slate-300/90 sm:text-lg">
            {loading
              ? "// loading bio from github..."
              : user?.bio ||
                "Fullstack Dev in progress. React | Node.js | Laravel."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-neon">
              VIEW PROJECTS
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="btn-neon btn-neon-magenta"
            >
              CONTACT ME
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
            <span className="flex items-center gap-2">
              <Cpu className="h-3 w-3 text-neon-cyan" />
              {loading ? "..." : user?.public_repos ?? 0} REPOS
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-lime shadow-neon-lime" />
              ONLINE
            </span>
          </div>
        </div>

        {/* Right: terminal panel */}
        <div className="lg:col-span-5">
          <TerminalCard user={user} />
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-neon-cyan/70 transition hover:text-neon-cyan"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}

function TerminalCard({ user }: { user: GitHubUser | null }) {
  const lines = config.hero.terminal;
  return (
    <div className="panel panel-hover overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-neon-red/80 shadow-[0_0_6px_#ff3a5c]" />
          <span className="h-2.5 w-2.5 rounded-full bg-neon-yellow/80 shadow-[0_0_6px_#f9f871]" />
          <span className="h-2.5 w-2.5 rounded-full bg-neon-lime/80 shadow-[0_0_6px_#7cff6b]" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">
          /bin/zsh — {user?.login ?? "guest"}@nightcity
        </span>
        <span className="font-mono text-[10px] text-neon-cyan/70 animate-pulse">
          ●REC
        </span>
      </div>

      {/* Body */}
      <pre className="m-0 max-h-[360px] overflow-hidden p-4 font-mono text-[12.5px] leading-relaxed">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {l.prompt && (
              <span>
                <span className="text-neon-magenta">{l.prompt}</span>{" "}
                <span className="text-neon-cyan">{l.command}</span>
              </span>
            )}
            {l.output &&
              (Array.isArray(l.output) ? (
                l.output.map((o, j) => (
                  <div key={j} className="text-slate-300">
                    {o}
                  </div>
                ))
              ) : (
                <div className="text-slate-300">{l.output}</div>
              ))}
          </div>
        ))}
        <div>
          <span className="text-neon-magenta">root@nightcity:~$</span>{" "}
          <span className="text-neon-cyan caret"> </span>
        </div>
      </pre>
    </div>
  );
}
