"use client";

import { ExternalLink, GitFork, Github, Pin, Star } from "lucide-react";
import config from "../config";
import { LANG_COLORS, type GitHubRepo } from "../lib/github";
import { SectionHeader } from "./About";

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
    <section id="projects" className="relative py-24">
      <div className="container-cyber">
        <SectionHeader kicker="// 04_projects" title="DEPLOYED_PAYLOADS" />

        {loading ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : cards.length === 0 ? (
          <div className="panel mt-10 p-10 text-center font-mono text-slate-400">
            // no transmissions found from github api ¯\_(ツ)_/¯
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((p) => (
              <RepoCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SkeletonCard() {
  return (
    <div className="panel flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-4 py-2">
        <div className="h-3 w-32 animate-pulse rounded bg-white/10" />
        <div className="h-3 w-16 animate-pulse rounded bg-white/10" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="h-5 w-2/3 animate-pulse rounded bg-white/10" />
        <div className="mt-3 h-3 w-full animate-pulse rounded bg-white/5" />
        <div className="mt-2 h-3 w-5/6 animate-pulse rounded bg-white/5" />
        <div className="mt-auto pt-5">
          <div className="h-3 w-1/2 animate-pulse rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function RepoCard({ project: p }: { project: ProjectCard }) {
  const langColor = p.language ? LANG_COLORS[p.language] ?? "#888" : "#555";

  return (
    <article className="panel panel-hover group flex h-full flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em]">
        <span className="text-neon-cyan/80">~/repos/{p.name}</span>
        <span className="flex items-center gap-2 text-slate-500">
          {p.pinned && (
            <span className="flex items-center gap-1 text-neon-yellow">
              <Pin className="h-3 w-3" /> PINNED
            </span>
          )}
          {p.featured && (
            <span className="flex items-center gap-1 text-neon-magenta">
              <Star className="h-3 w-3" /> FEATURED
            </span>
          )}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="heading-display text-lg text-white transition group-hover:text-glow-cyan">
          {p.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-slate-300/90 min-h-[3.5rem]">
          {p.description || "// no description provided"}
        </p>

        {p.topics.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.topics.slice(0, 4).map((t) => (
              <span key={t} className="chip">
                #{t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-5 font-mono text-xs">
          <div className="flex items-center gap-3 text-slate-400">
            {p.language && (
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{
                    background: langColor,
                    boxShadow: `0 0 8px ${langColor}`,
                  }}
                />
                {p.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 text-neon-yellow" /> {p.stars}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3 w-3 text-neon-magenta" /> {p.forks}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`GitHub repo ${p.name}`}
              className="rounded-sm border border-white/10 p-1.5 text-slate-300 transition hover:border-neon-cyan hover:text-neon-cyan"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
            {p.homepage && (
              <a
                href={p.homepage}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Live demo for ${p.name}`}
                className="rounded-sm border border-white/10 p-1.5 text-slate-300 transition hover:border-neon-magenta hover:text-neon-magenta"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
