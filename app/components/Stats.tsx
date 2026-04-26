"use client";

import { Boxes, GitFork, Star, Users } from "lucide-react";
import type { GitHubRepo, GitHubUser } from "../lib/github";
import AnimatedCounter from "./AnimatedCounter";
import { Stagger, StaggerItem } from "./Reveal";

type Props = {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  loading?: boolean;
};

export default function Stats({ user, repos, loading }: Props) {
  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
  const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);

  const items = [
    { label: "Public Repos", value: user?.public_repos ?? repos.length, icon: Boxes },
    { label: "Total Stars", value: totalStars, icon: Star },
    { label: "Total Forks", value: totalForks, icon: GitFork },
    { label: "Followers", value: user?.followers ?? 0, icon: Users },
  ];

  return (
    <section className="relative">
      <div className="container-base">
        <Stagger className="grid gap-3 grid-cols-2 sm:grid-cols-4">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <StaggerItem key={it.label} className="card card-hover p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-medium uppercase tracking-wider text-slate-400">
                    {it.label}
                  </span>
                  <Icon className="h-4 w-4 text-slate-500" />
                </div>
                <div className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-white tabular-nums">
                  {loading ? "—" : <AnimatedCounter value={it.value} />}
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
