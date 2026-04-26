"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitFork, Github, Pin, Star } from "lucide-react";
import config from "../config";
import { LANG_COLORS, type GitHubRepo } from "../lib/github";
import { SectionHeader } from "./About";
import Reveal, { Stagger, StaggerItem } from "./Reveal";

type ProjectCard = {
  id: string;
  name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  url: string;
  homepage: string | null;
  featured?: boolean;
  pinned?: boolean;
};

type Props = { repos: GitHubRepo[]; loading?: boolean };

export default function Projects({ repos, loading }: Props) {
  const pinnedSet = new Set(config.projects.pinned.map((p) => p.toLowerCase()));

  const repoCards: ProjectCard[] = repos
    .slice(0, config.github.maxRepos)
    .map((r) => ({
      id: `gh-${r.id}`,
      name: r.name,
      description: r.description,
      language: r.language,
      topics: r.topics ?? [],
      stars: r.stargazers_count,
      forks: r.forks_count,
      url: r.html_url,
      homepage: r.homepage,
      pinned: pinnedSet.has(r.name.toLowerCase()),
    }));

  const manualCards: ProjectCard[] = config.projects.manual.map((m, i) => ({
    id: `manual-${i}`,
    name: m.name,
    description: m.description,
    language: m.language ?? null,
    topics: m.topics ?? [],
    stars: 0,
    forks: 0,
    url: m.url,
    homepage: m.homepage ?? null,
    featured: m.featured,
  }));

  const cards = [...manualCards, ...repoCards];

  return (
    <section id="projects" className="section">
      <div className="container-base">
        <Reveal>
          <SectionHeader eyebrow="Projects" title="Proyek Terbaru" />
        </Reveal>

        {loading ? (
          <div className="mt-10 sm:mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : cards.length === 0 ? (
          <div className="card mt-10 sm:mt-12 p-10 text-center text-slate-400">
            Belum ada proyek untuk ditampilkan.
          </div>
        ) : (
          <Stagger
            className="mt-10 sm:mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.06}
          >
            {cards.map((p) => (
              <StaggerItem as="article" key={p.id}>
                <RepoCard project={p} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}

function SkeletonCard() {
  return (
    <div className="card flex h-full flex-col p-5">
      <div className="h-5 w-2/3 animate-pulse rounded bg-bg-elevated" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-bg-elevated" />
      <div className="mt-2 h-3 w-5/6 animate-pulse rounded bg-bg-elevated" />
      <div className="mt-auto pt-5">
        <div className="h-3 w-1/2 animate-pulse rounded bg-bg-elevated" />
      </div>
    </div>
  );
}

function RepoCard({ project: p }: { project: ProjectCard }) {
  const langColor = p.language ? (LANG_COLORS[p.language] ?? "#888") : "#555";

  return (
    <motion.div
      className="card card-hover group relative flex h-full flex-col overflow-hidden p-5"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-400/0 blur-2xl transition-all duration-500 group-hover:bg-accent-400/15"
      />

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-white transition-colors group-hover:text-accent-300">
          {p.name}
        </h3>
        <div className="flex shrink-0 items-center gap-1.5">
          {p.pinned && (
            <span className="inline-flex items-center gap-1 rounded-md bg-accent-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent-300">
              <Pin className="h-3 w-3" /> Pinned
            </span>
          )}
          {p.featured && (
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-300">
              <Star className="h-3 w-3" /> Featured
            </span>
          )}
        </div>
      </div>

      <p className="mt-2 line-clamp-3 min-h-[3.6rem] text-sm leading-relaxed text-slate-400">
        {p.description || "Tidak ada deskripsi."}
      </p>

      {p.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.topics.slice(0, 4).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-3 sm:gap-4 text-xs text-slate-400">
          {p.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: langColor }}
              />
              <span className="hidden xs:inline">{p.language}</span>
            </span>
          )}
          <span className="flex items-center gap-1 tabular-nums">
            <Star className="h-3 w-3" /> {p.stars}
          </span>
          <span className="flex items-center gap-1 tabular-nums">
            <GitFork className="h-3 w-3" /> {p.forks}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <a
            href={p.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`GitHub repo ${p.name}`}
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-bg-elevated hover:text-white"
          >
            <Github className="h-4 w-4" />
          </a>
          {p.homepage && (
            <a
              href={p.homepage}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Live demo for ${p.name}`}
              className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-bg-elevated hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
