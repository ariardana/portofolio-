"use client";

import { useEffect, useState } from "react";
import config from "../config";
import {
  type GitHubRepo,
  type GitHubUser,
  sortAndPin as sortAndPinHelper,
} from "./github";

const API = "https://api.github.com";

type State = {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
};

export function useGithub(): State {
  const [state, setState] = useState<State>({
    user: null,
    repos: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    const headers = { Accept: "application/vnd.github+json" };

    Promise.all([
      fetch(`${API}/users/${config.github.username}`, { headers }).then((r) =>
        r.ok ? (r.json() as Promise<GitHubUser>) : null,
      ),
      fetch(
        `${API}/users/${config.github.username}/repos?per_page=100&sort=updated`,
        { headers },
      ).then((r) => (r.ok ? (r.json() as Promise<GitHubRepo[]>) : [])),
    ])
      .then(([user, reposRaw]) => {
        if (cancelled) return;
        const filtered = (reposRaw ?? []).filter((r) => {
          if (!config.github.showForks && r.fork) return false;
          if (!config.github.showArchived && r.archived) return false;
          if (config.github.requireDescription && !r.description) return false;
          return true;
        });
        setState({
          user,
          repos: sortAndPinHelper(filtered),
          loading: false,
          error: null,
        });
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setState({
          user: null,
          repos: [],
          loading: false,
          error: e instanceof Error ? e.message : "fetch_error",
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
