import { Link } from "@tanstack/react-router";

export function CivicFooter() {
  return (
    <footer className="relative z-10 border-t border-paper/30 px-4 py-8 text-sm text-ink/70 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-ink">
            <span className="grid size-6 place-items-center rounded bg-electric text-xs text-white">
              CR
            </span>
            <span>CivicRewards · CityConnect Hub</span>
          </div>
          <p className="mt-1 text-xs text-steel/70 max-w-md">
            Direct, verified civic connections for South African municipalities, wards, and local
            representatives.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-steel">
          <Link to="/" className="hover:text-ink transition-colors">
            Home Directory
          </Link>
          <span className="text-steel/30">•</span>
          <Link to="/municipalities" className="hover:text-ink transition-colors">
            Municipalities
          </Link>
          <span className="text-steel/30">•</span>
          <Link to="/councillors" className="hover:text-ink transition-colors">
            Councillors
          </Link>
          <span className="text-steel/30">•</span>
          <Link to="/wards" className="hover:text-ink transition-colors">
            Wards
          </Link>
        </div>

        <div className="text-xs text-steel/60">
          <span>© 2026 CivicRewards</span>
        </div>
      </div>
    </footer>
  );
}
