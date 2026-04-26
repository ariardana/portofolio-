"use client";

import { useEffect, useState } from "react";
import { Github } from "lucide-react";
import config from "../config";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
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
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-base flex h-14 items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md border border-border-strong bg-bg-surface text-accent-300">
            <span className="text-xs font-semibold">A</span>
          </span>
          <span className="hidden xs:inline">{config.hero.nameOverride}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-sm text-slate-300 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={`https://github.com/${config.github.username}`}
          target="_blank"
          rel="noreferrer noopener"
          className="btn btn-secondary px-3 py-1.5 text-xs"
        >
          <Github className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </header>
  );
}
