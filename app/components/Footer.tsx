import config from "../config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-8">
      <div className="container-base flex flex-col items-center justify-between gap-2 text-sm text-slate-400 sm:flex-row">
        <p>
          © {year} {config.hero.nameOverride}. All rights reserved.
        </p>
        <p className="text-slate-500">
          Built with Next.js & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
