/**
 * ============================================================================
 *  CYBERPUNK PORTFOLIO — CONFIG
 * ============================================================================
 *  File ini adalah PUSAT KENDALI portfolio. Edit nilai di bawah untuk
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
  /** Warna neon (gunakan token tailwind atau hex). */
  color?: "cyan" | "magenta" | "yellow" | "lime" | "violet";
};

export type ManualProject = {
  name: string;
  description: string;
  url: string;
  homepage?: string;
  language?: string;
  topics?: string[];
  /** Tampilkan badge "FEATURED" di atas card. */
  featured?: boolean;
};

export type TerminalLine = {
  prompt?: string;
  command?: string;
  output?: string | string[];
};

export const config = {
  /** ========================================================================
   *  IDENTITAS
   *  ====================================================================== */
  github: {
    /** Username GitHub yang datanya akan diambil via API. */
    username: "ariardana",
    /** Maksimum repo yang ditampilkan di section "Projects". */
    maxRepos: 9,
    /**
     * Filter repo. Set ke `false` untuk menyembunyikan fork / archived /
     * repo tanpa deskripsi.
     */
    showForks: false,
    showArchived: false,
    requireDescription: false,
  },

  /** ========================================================================
   *  PROFIL & META
   *  ====================================================================== */
  site: {
    title: "ARI ARDANA // CYBER.DEV",
    description:
      "Fullstack developer dari Pacitan — bermain dengan React, Node.js, dan Laravel di rimba neon kode.",
    url: "https://ariardana.dev",
    /** Locale untuk format tanggal di section profil. */
    locale: "id-ID",
  },

  hero: {
    /** Teks kecil di atas nama. */
    tagline: "// SYSTEM ONLINE :: WELCOME, RUNNER",
    /** Nama besar dengan glitch effect (override `name` dari GitHub API). */
    nameOverride: "ARI ARDANA",
    /**
     * Daftar role yang akan diketik bergantian di hero.
     * Edit / tambah sesuai keinginan.
     */
    roles: [
      "FULLSTACK DEVELOPER",
      "REACT ENGINEER",
      "NODE.JS HACKER",
      "LARAVEL ARTISAN",
      "NEON DREAMER",
    ],
    /**
     * Output terminal pseudo di hero. Setiap baris bisa berupa command
     * atau output.
     */
    terminal: [
      { prompt: "root@nightcity:~$", command: "whoami" },
      { output: "ari_ardana :: fullstack-dev :: in-progress" },
      { prompt: "root@nightcity:~$", command: "cat ./status.log" },
      {
        output: [
          "[ OK ] react.runtime ............. online",
          "[ OK ] node.daemon ............... online",
          "[ OK ] laravel.artisan ........... online",
          "[..] coffee.supply ............ refilling",
        ],
      },
      { prompt: "root@nightcity:~$", command: "./jack_in.sh" },
    ] as TerminalLine[],
  },

  about: {
    /** Override bio dari GitHub API. Set `null` untuk pakai bio dari API. */
    bioOverride: null as string | null,
    /** Paragraf tambahan setelah bio. */
    extraParagraphs: [
      "Saya membangun aplikasi web dari ujung ke ujung — frontend yang halus, backend yang tangguh, dan pengalaman pengguna yang terasa seperti masuk ke dunia lain.",
      "Saat ini sedang menyusuri jalur fullstack: React di kanvas, Node.js sebagai mesin, Laravel sebagai pondasi.",
    ],
    /** Highlight bullet points. */
    highlights: [
      "Berbasis di Pacitan, Jawa Timur",
      "Fokus pada produk web modern",
      "Suka eksplorasi tooling baru",
      "Open untuk kolaborasi & freelance",
    ],
  },

  /** ========================================================================
   *  SKILLS
   *  ====================================================================== */
  skills: [
    { name: "TypeScript", level: 88, color: "cyan" },
    { name: "React / Next.js", level: 92, color: "magenta" },
    { name: "Node.js", level: 84, color: "lime" },
    { name: "Laravel / PHP", level: 80, color: "yellow" },
    { name: "Tailwind CSS", level: 95, color: "cyan" },
    { name: "PostgreSQL / MySQL", level: 78, color: "violet" },
  ] as Skill[],

  /** ========================================================================
   *  PROJECTS
   *  ====================================================================== */
  projects: {
    /** Nama repo yang ingin di-pin di urutan teratas (case-insensitive). */
    pinned: ["Azusa-Downloader", "IslamApp", "Chatbot-AI", "desa"],
    /**
     * Project tambahan yang TIDAK ada di GitHub (mis. closed-source).
     * Akan digabung dengan repo dari API.
     */
    manual: [] as ManualProject[],
  },

  /** ========================================================================
   *  CONTACT & SOCIALS
   *  ====================================================================== */
  contact: {
    email: "ariardana192@gmail.com",
    /** Link sosmed. Tinggal hapus / tambah sesuai kebutuhan. */
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

  /** ========================================================================
   *  THEME
   *  ====================================================================== */
  theme: {
    /** Warna neon utama. Diaplikasikan ke aksen, tombol, dan glow. */
    primary: "cyan", // cyan | magenta | yellow | lime | violet
    secondary: "magenta",
    /**
     * Aktifkan efek visual berat. Matikan jika butuh performa di device lemah.
     */
    enableScanlines: true,
    enableGrid: true,
    enableNoise: true,
    enableGlitch: true,
  },
} as const;

export type SiteConfig = typeof config;
export default config;
