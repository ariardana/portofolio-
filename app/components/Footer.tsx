import config from "../config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 py-8">
      <div className="container-cyber flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-mono text-xs text-slate-500">
          © {year} {config.github.username} //{" "}
          <span className="text-neon-cyan">SYSTEM_OK</span> //{" "}
          <span className="text-neon-magenta">v1.0.0</span>
        </p>
        <p className="font-mono text-xs text-slate-500">
          built with <span className="text-neon-cyan">Next.js</span> +{" "}
          <span className="text-neon-magenta">Tailwind</span> + ☕
        </p>
      </div>
    </footer>
  );
}
