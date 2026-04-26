import config from "../config";

export type GitHubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  company: string | null;
  email: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  updated_at: string;
};

const API = "https://api.github.com";

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

export async function fetchUser(): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`${API}/users/${config.github.username}`, {
      headers,
      // Revalidate hourly so static export still gets fresh-ish data on rebuild.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as GitHubUser;
  } catch {
    return null;
  }
}

export async function fetchRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${API}/users/${config.github.username}/repos?per_page=100&sort=updated`,
      {
        headers,
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return [];
    const repos = (await res.json()) as GitHubRepo[];
    return repos.filter((r) => {
      if (!config.github.showForks && r.fork) return false;
      if (!config.github.showArchived && r.archived) return false;
      if (config.github.requireDescription && !r.description) return false;
      return true;
    });
  } catch {
    return [];
  }
}

export function sortAndPin(repos: GitHubRepo[]): GitHubRepo[] {
  const pinned = config.projects.pinned.map((p) => p.toLowerCase());
  return [...repos].sort((a, b) => {
    const aPinned = pinned.indexOf(a.name.toLowerCase());
    const bPinned = pinned.indexOf(b.name.toLowerCase());
    if (aPinned !== -1 || bPinned !== -1) {
      if (aPinned === -1) return 1;
      if (bPinned === -1) return -1;
      return aPinned - bPinned;
    }
    if (b.stargazers_count !== a.stargazers_count) {
      return b.stargazers_count - a.stargazers_count;
    }
    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
  });
}

export const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  PHP: "#777bb4",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Rust: "#dea584",
  Shell: "#89e051",
  Java: "#b07219",
  "C++": "#f34b7d",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};
