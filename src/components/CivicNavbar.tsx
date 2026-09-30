import { Link } from "@tanstack/react-router";
import {
  Menu,
  X,
  Landmark,
  Users,
  Building2,
  MapPin,
  ShieldAlert,
  UserCheck,
  Eye,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { useCivic, type UserRole } from "@/context/CivicContext";

export function CivicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    role,
    setRole,
    councillors,
    activeCouncillorId,
    setActiveCouncillorId,
    resetAllToDefault,
  } = useCivic();

  const activeCouncillor = councillors.find((c) => c.id === activeCouncillorId);

  return (
    <header className="relative z-30 mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6">
      {/* Role Switcher Banner */}
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-ink/10 bg-white/75 px-3.5 py-1.5 text-xs backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 font-bold text-ink">
            {role === "admin" && <ShieldAlert size={14} className="text-amber-600" />}
            {role === "councillor" && <UserCheck size={14} className="text-electric" />}
            {role === "public" && <Eye size={14} className="text-steel" />}
            <span className="capitalize">{role} Access:</span>
          </span>
          <span className="text-steel/80 hidden sm:inline">
            {role === "admin" && "Editing enabled for all Ward, Councillor & Municipality cards"}
            {role === "councillor" &&
              `Editing enabled for ${activeCouncillor?.name || "Your"} Ward & Profile`}
            {role === "public" && "Read-only public browsing directory"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-semibold text-steel/70">Mode:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="rounded-lg border border-ink/15 bg-white px-2 py-0.5 text-xs font-bold text-ink focus:outline-none focus:ring-1 focus:ring-electric"
              aria-label="Select User Role"
            >
              <option value="admin">🛡️ Admin (All Edits)</option>
              <option value="councillor">🏛️ Councillor Mode</option>
              <option value="public">👥 Public View</option>
            </select>
          </div>

          {role === "councillor" && (
            <select
              value={activeCouncillorId}
              onChange={(e) => setActiveCouncillorId(e.target.value)}
              className="rounded-lg border border-ink/15 bg-white px-2 py-0.5 text-xs font-semibold text-ink focus:outline-none focus:ring-1 focus:ring-electric"
              aria-label="Select Active Councillor"
            >
              {councillors.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} (Ward {c.ward})
                </option>
              ))}
            </select>
          )}

          {role === "admin" && (
            <button
              type="button"
              onClick={resetAllToDefault}
              title="Reset all card edits back to official defaults"
              className="flex items-center gap-1 rounded-lg border border-ink/10 bg-white/60 px-2 py-0.5 text-[11px] font-semibold text-steel hover:bg-rose-50 hover:text-rose-700 transition-colors"
            >
              <RotateCcw size={11} /> Reset Data
            </button>
          )}
        </div>
      </div>

      <div className="glass-panel flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-5">
        <Link to="/" className="flex items-center gap-3" aria-label="CivicRewards home">
          <span className="grid size-9 place-items-center rounded-lg bg-electric font-display text-sm font-bold text-electric-foreground shadow-sm">
            CR
          </span>
          <span>
            <span className="block font-display text-sm font-bold leading-none">CivicRewards</span>
            <span className="mt-1 block text-[11px] text-steel/70">Civic Connect Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-1.5 text-sm font-medium text-steel md:flex"
          aria-label="Primary navigation"
        >
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "nav-link-active" }}
            className="nav-link flex items-center gap-1.5"
          >
            <Landmark size={15} />
            <span>Home Directory</span>
          </Link>
          <Link
            to="/municipalities"
            activeProps={{ className: "nav-link-active" }}
            className="nav-link flex items-center gap-1.5"
          >
            <Building2 size={15} />
            <span>Municipalities</span>
          </Link>
          <Link
            to="/councillors"
            activeProps={{ className: "nav-link-active" }}
            className="nav-link flex items-center gap-1.5"
          >
            <Users size={15} />
            <span>Councillors</span>
          </Link>
          <Link
            to="/wards"
            activeProps={{ className: "nav-link-active" }}
            className="nav-link flex items-center gap-1.5"
          >
            <MapPin size={15} />
            <span>Wards</span>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/councillors" className="button-base button-dark hidden sm:inline-flex">
            Find your councillor
          </Link>
          <button
            type="button"
            className="button-base icon-button md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          className="glass-panel mt-2 grid gap-1 p-2 text-sm font-medium md:hidden"
          aria-label="Mobile navigation"
        >
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "nav-link-active" }}
            className="nav-link flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <Landmark size={16} />
            <span>Home Directory</span>
          </Link>
          <Link
            to="/municipalities"
            activeProps={{ className: "nav-link-active" }}
            className="nav-link flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <Building2 size={16} />
            <span>Municipalities (10)</span>
          </Link>
          <Link
            to="/councillors"
            activeProps={{ className: "nav-link-active" }}
            className="nav-link flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <Users size={16} />
            <span>Councillors</span>
          </Link>
          <Link
            to="/wards"
            activeProps={{ className: "nav-link-active" }}
            className="nav-link flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <MapPin size={16} />
            <span>Wards</span>
          </Link>
        </nav>
      )}
    </header>
  );
}
