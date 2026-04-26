"use client";

import { useEffect, useState } from "react";
import { Github, Terminal } from "lucide-react";
import config from "../config";

const links = [
  { href: "#home", label: "HOME" },
  { href: "#about", label: "ABOUT" },
  { href: "#skills", label: "SKILLS" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#contact", label: "CONTACT" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-ink-900/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-cyber flex h-14 items-center justify-between">
        <a
          href="#home"
          className="group flex items-center gap-2 font-display text-sm tracking-[0.3em] text-neon-cyan"
        >
          <Terminal className="h-4 w-4 text-neon-magenta animate-pulse-neon" />
          <span className="hidden xs:inline">{config.github.username.toUpperCase()}</span>
          <span className="text-neon-magenta">/</span>
          <span className="hidden sm:inline">PORTFOLIO</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-3 py-2 font-mono text-xs tracking-[0.25em] text-slate-300 transition hover:text-neon-cyan"
            >
              <span className="text-neon-magenta/60">{">"}</span> {l.label}
            </a>
          ))}
        </nav>

        <a
          href={`https://github.com/${config.github.username}`}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-neon px-3 py-1.5 text-[11px]"
        >
          <Github className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">GITHUB</span>
        </a>
      </div>

      {/* Bottom gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" />
    </header>
  );
}
