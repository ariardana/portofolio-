import config from "../config";

const items = [
  "JACK_IN",
  "SYSTEM_ONLINE",
  config.github.username.toUpperCase(),
  "FULLSTACK",
  "REACT",
  "NODE.JS",
  "LARAVEL",
  "NEON_DREAMS",
  "NIGHT_CITY",
];

export default function Marquee() {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-black/40 py-3">
      <div className="flex animate-marquee whitespace-nowrap font-display text-sm tracking-[0.4em] text-neon-cyan/80">
        {repeated.map((t, i) => (
          <span key={i} className="mx-8 flex items-center gap-8">
            <span>// {t}</span>
            <span className="text-neon-magenta">◆</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-900 to-transparent" />
    </div>
  );
}
