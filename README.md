# 🟣 Cyberpunk Neon Portfolio · `ariardana`

Portfolio web bergaya **cyberpunk · neon · glitch** yang datanya tarik
langsung dari **GitHub REST API**. Dibangun dengan **Next.js 14** +
**Tailwind CSS** dan dirancang biar gampang banget di-customize lewat
satu file: `app/config.ts`.

> Live data: profile, bio, avatar, stats, dan repositori — semuanya
> diambil dari `https://api.github.com/users/<username>` saat halaman
> dibuka di browser.

---

## ✨ Highlights

- **Single-page portfolio** dengan section:
  - Hero (glitch text + typewriter role + fake terminal panel)
  - Marquee neon
  - Stats card (repos / stars / forks / followers)
  - About + avatar dengan scanline overlay
  - Skill matrix dengan progress neon
  - Projects (auto fetch dari GitHub + dukungan pinned & manual)
  - Contact + sosial media
- **Efek visual cyberpunk**: scanlines, grid neon, noise overlay,
  glitch text, animated border, marquee, pulse-neon glow, dan custom
  scrollbar.
- **Responsif** + **dark-only** by design.
- **Static export ready** (`output: 'export'`) — bisa deploy ke
  GitHub Pages, Vercel, Netlify, Cloudflare Pages, atau static host
  apa pun.
- **Nol API key**: pakai endpoint publik GitHub (rate-limited per IP
  klien — biasanya cukup untuk portfolio pribadi).

---

## 🧬 Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) + custom neon theme
- [Lucide Icons](https://lucide.dev/)
- TypeScript

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Edit konfigurasi
#    Buka app/config.ts, ganti username, role, skill, sosmed, dll.

# 3. Jalankan dev server
npm run dev
# -> http://localhost:3000

# 4. Build untuk produksi (static export)
npm run build
# Output: ./out
```

Hasil `out/` siap deploy ke GitHub Pages / Vercel / Netlify / Cloudflare Pages.

---

## ⚙️ Konfigurasi (`app/config.ts`)

Semua isi portfolio bisa diubah dari **satu file**. Tidak perlu nyentuh
komponen.

```ts
export const config = {
  github: {
    username: "ariardana",       // username GitHub kamu
    maxRepos: 9,
    showForks: false,
    showArchived: false,
    requireDescription: false,
  },

  site: {
    title: "ARI ARDANA // CYBER.DEV",
    description: "Fullstack developer ...",
    url: "https://ariardana.dev",
    locale: "id-ID",
  },

  hero: {
    tagline: "// SYSTEM ONLINE :: WELCOME, RUNNER",
    nameOverride: "ARI ARDANA",
    roles: ["FULLSTACK DEVELOPER", "REACT ENGINEER", ...],
    terminal: [
      { prompt: "root@nightcity:~$", command: "whoami" },
      { output: "ari_ardana :: fullstack-dev :: in-progress" },
      ...
    ],
  },

  about: {
    bioOverride: null,            // null = pakai bio dari GitHub API
    extraParagraphs: [...],
    highlights: [...],
  },

  skills: [
    { name: "TypeScript", level: 88, color: "cyan" },
    ...
  ],

  projects: {
    pinned: ["Azusa-Downloader", "IslamApp", ...],  // urutkan repo unggulan
    manual: [],                    // proyek tambahan non-GitHub
  },

  contact: {
    email: "...",
    socials: [
      { label: "GitHub",  url: "...", icon: "Github"  },
      { label: "Twitter", url: "...", icon: "Twitter" },
      ...
    ],
  },

  theme: {
    primary: "cyan",
    secondary: "magenta",
    enableScanlines: true,
    enableGrid: true,
    enableNoise: true,
    enableGlitch: true,
  },
};
```

### Hal-hal yang sering di-edit

| Mau ganti...                              | Edit di...                       |
| ----------------------------------------- | -------------------------------- |
| Username GitHub                           | `github.username`                |
| Nama besar di hero                        | `hero.nameOverride`              |
| Daftar role yang diketik                  | `hero.roles`                     |
| Konten terminal palsu di hero             | `hero.terminal`                  |
| Bio (override dari GitHub)                | `about.bioOverride`              |
| Bullet "highlights"                       | `about.highlights`               |
| Skill bar                                 | `skills`                         |
| Repo yang di-pin di urutan teratas        | `projects.pinned`                |
| Tambah proyek di luar GitHub              | `projects.manual`                |
| Email / social links                      | `contact.*`                      |
| Matikan efek berat (untuk device lemah)   | `theme.enableScanlines/...`      |

---

## 📦 Deploy

### Vercel (rekomendasi, paling cepat)

1. Push repo ke GitHub.
2. Import repo di [vercel.com/new](https://vercel.com/new).
3. Klik **Deploy**. Selesai.

### GitHub Pages

```bash
npm run build
# Upload folder ./out ke branch gh-pages atau atur GitHub Actions
```

### Static host lain (Netlify, Cloudflare Pages, dll)

Jalankan `npm run build`, lalu deploy folder `out/` sebagai static site.

---

## 🎨 Custom Tema

Warna neon utama didefinisikan di `tailwind.config.js`:

```js
colors: {
  neon: {
    cyan:    '#00f0ff',
    magenta: '#ff2ec4',
    yellow:  '#f9f871',
    lime:    '#7cff6b',
    violet:  '#b388ff',
    red:     '#ff3a5c',
  },
}
```

Tinggal ganti hex value di sini untuk merombak palet keseluruhan.

---

## 📁 Struktur

```
app/
├── components/      # Hero, About, Skills, Projects, Stats, Contact, Footer, Navbar, ...
├── lib/             # github.ts (API client), useGithub.ts (client hook), clsx.ts
├── config.ts        # 👈 SATU-SATUNYA file yang biasa kamu edit
├── globals.css      # Styles cyberpunk (scanlines, glitch, neon, dll)
├── layout.tsx
└── page.tsx
```

---

## 📝 Lisensi

MIT — bebas dipakai, di-fork, dan dimodifikasi.
