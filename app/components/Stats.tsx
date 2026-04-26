"use client";

import { Boxes, GitFork, Star, Users } from "lucide-react";
import type { GitHubRepo, GitHubUser } from "../lib/github";

type Props = {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  loading?: boolean;
};

export default function Stats({ user, repos, loading }: Props) {
  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
  const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);

  const items = [
    {
      label: "Public Repos",
      value: user?.public_repos ?? repos.length,
      icon: Boxes,
      color: "text-neon-cyan",
    },
    {
      label: "Total Stars",
      value: totalStars,
      icon: Star,
      color: "text-neon-yellow",
    },
    {
      label: "Total Forks",
      value: totalForks,
      icon: GitFork,
      color: "text-neon-magenta",
    },
    {
      label: "Followers",
      value: user?.followers ?? 0,
      icon: Users,
      color: "text-neon-violet",
    },
  ];

  return (
    <section className="relative py-10">
      <div className="container-cyber">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div key={it.label} className="panel panel-hover p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-400">
                    {it.label}
                  </span>
                  <Icon className={`h-4 w-4 ${it.color}`} />
                </div>
                <div className={`mt-3 font-display text-3xl ${it.color}`}>
                  {loading ? "--" : String(it.value).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
