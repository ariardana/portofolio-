/**
 * ============================================================================
 *  PORTFOLIO CONFIG
 * ============================================================================
 *  File ini adalah pusat kendali konten portfolio. Edit nilai di bawah untuk
 *  mengubah konten tanpa perlu menyentuh kode komponen.
 * ============================================================================
 */

export type SocialLink = {
  label: string;
  url: string;
  /** Nama icon dari `lucide-react` (lihat https://lucide.dev/icons) */
  icon:
    | "Github"
    | "Twitter"
    | "Linkedin"
    | "Instagram"
    | "Mail"
    | "Globe"
    | "Youtube"
    | "Send"
    | "Phone";
};

export type Skill = {
  name: string;
  level: number; // 0 - 100
  category?: "Frontend" | "Backend" | "Tools" | "Database";
};

export type ManualProject = {
  name: string;
  description: string;
  url: string;
  homepage?: string;
  language?: string;
  topics?: string[];
  /** Tampilkan badge "Featured" di atas card. */
  featured?: boolean;
};

export const config = {
  /** ========================================================================
   *  IDENTITAS
   *  ====================================================================== */
  github: {
    /** Username GitHub yang datanya akan diambil via API. */
    username: "ariardana",
    /** Maksimum repo yang ditampilkan di section Projects. */
    maxRepos: 9,
    /** Filter repo. */
    showForks: false,
    showArchived: false,
    requireDescription: false,
  },

  /** ========================================================================
   *  PROFIL & META
   *  ====================================================================== */
  site: {
    title: "Ari Ardana — Fullstack Developer",
    description:
      "Fullstack developer yang membangun aplikasi web modern dengan React, Node.js, dan Laravel.",
    url: "https://ariardana.dev",
    /** Locale untuk format tanggal. */
    locale: "id-ID",
  },

  hero: {
    /** Eyebrow kecil di atas nama. */
    eyebrow: "Hi, saya",
    /** Nama besar (override `name` dari GitHub API). */
    nameOverride: "Ari Ardana",
    /** Headline / one-liner di bawah nama. */
    headline: "Fullstack Developer",
    /**
     * Daftar role yang akan diketik bergantian sebagai sub-headline.
     * Edit / tambah sesuai keinginan.
     */
    roles: [
      "React Engineer",
      "Node.js Developer",
      "Laravel Developer",
      "UI / UX Enthusiast",
    ],
    /** Paragraf singkat di hero. */
    summary:
      "Saya merancang dan membangun aplikasi web end-to-end — dari antarmuka yang rapi sampai backend yang tangguh. Fokus pada produk yang cepat, mudah dirawat, dan menyenangkan untuk digunakan.",
    /** Lokasi singkat di hero. */
    location: "Pacitan, Jawa Timur",
    /** Status ketersediaan. */
    availability: "Tersedia untuk proyek freelance",
  },

  about: {
    /** Override bio dari GitHub API. Set `null` untuk pakai bio dari API. */
    bioOverride: null as string | null,
    /** Paragraf utama di section About. */
    paragraphs: [
      "Saya seorang fullstack developer yang berbasis di Pacitan, Jawa Timur. Saya senang menerjemahkan kebutuhan bisnis menjadi produk digital yang rapi, cepat, dan mudah dipakai.",
      "Sehari-hari saya bekerja dengan React/Next.js di sisi frontend, serta Node.js dan Laravel di sisi backend. Saya juga terbiasa menangani basis data relasional, integrasi API, dan deployment ke berbagai platform modern.",
    ],
    /** Highlight bullet points (singkat & to the point). */
    highlights: [
      "Berbasis di Pacitan, Jawa Timur",
      "Pengalaman membangun aplikasi web end-to-end",
      "Terbiasa bekerja remote & kolaborasi tim",
      "Terbuka untuk peluang kerja & freelance",
    ],
  },

  /** ========================================================================
   *  SKILLS
   *  ====================================================================== */
  skills: [
    { name: "TypeScript", level: 88, category: "Frontend" },
    { name: "React / Next.js", level: 92, category: "Frontend" },
    { name: "Tailwind CSS", level: 95, category: "Frontend" },
    { name: "Node.js", level: 84, category: "Backend" },
    { name: "Laravel / PHP", level: 80, category: "Backend" },
    { name: "PostgreSQL / MySQL", level: 78, category: "Database" },
  ] as Skill[],

  /** ========================================================================
   *  PROJECTS
   *  ====================================================================== */
  projects: {
    /** Nama repo yang ingin di-pin di urutan teratas (case-insensitive). */
    pinned: ["Azusa-Downloader", "IslamApp", "Chatbot-AI", "desa"],
    /** Project tambahan yang TIDAK ada di GitHub. */
    manual: [] as ManualProject[],
  },

  /** ========================================================================
   *  CONTACT & SOCIALS
   *  ====================================================================== */
  contact: {
    email: "ariardana192@gmail.com",
    /** Headline section contact. */
    headline: "Mari berkolaborasi",
    /** Pesan singkat di section contact. */
    message:
      "Punya ide proyek atau ingin berdiskusi soal pengembangan web? Saya akan dengan senang hati mendengar cerita Anda dan biasanya membalas dalam 24 jam.",
    /** Link sosmed. */
    socials: [
      {
        label: "GitHub",
        url: "https://github.com/ariardana",
        icon: "Github",
      },
      {
        label: "Twitter",
        url: "https://twitter.com/ariardana192",
        icon: "Twitter",
      },
      {
        label: "Email",
        url: "mailto:ariardana192@gmail.com",
        icon: "Mail",
      },
      {
        label: "Website",
        url: "https://ariardn.web.id",
        icon: "Globe",
      },
    ] as SocialLink[],
  },
} as const;

export type SiteConfig = typeof config;
export default config;
