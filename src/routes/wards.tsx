import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Building2,
  Users,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Layers,
  Pencil,
} from "lucide-react";
import { CivicNavbar } from "@/components/CivicNavbar";
import { CivicFooter } from "@/components/CivicFooter";
import { CivicBreadcrumb } from "@/components/CivicBreadcrumb";
import { useCivic } from "@/context/CivicContext";

interface WardSearchState {
  municipality?: string;
}

export const Route = createFileRoute("/wards")({
  validateSearch: (search: Record<string, unknown>): WardSearchState => {
    return {
      municipality: typeof search.municipality === "string" ? search.municipality : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Municipal Wards Directory | CivicRewards" },
      {
        name: "description",
        content:
          "Explore municipal wards across South Africa, registered voter counts, suburbs, and active civic projects.",
      },
      { property: "og:title", content: "Municipal Wards Directory | CivicRewards" },
      {
        property: "og:description",
        content:
          "Find your ward, check priority infrastructure projects, and review local representative details.",
      },
    ],
  }),
  component: WardsPage,
});

function WardsPage() {
  const searchParams = Route.useSearch();
  const { wards, municipalities, canEditWard, setEditingWard } = useCivic();
  const [query, setQuery] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>(
    searchParams.municipality ?? "All municipalities",
  );

  const filteredWards = useMemo(() => {
    const q = query.trim().toLowerCase();
    return wards.filter((w) => {
      const matchesMuni =
        selectedMunicipality === "All municipalities" ||
        w.municipality === selectedMunicipality ||
        w.municipality.toLowerCase().includes(selectedMunicipality.toLowerCase()) ||
        selectedMunicipality.toLowerCase().includes(w.municipality.toLowerCase());

      const matchesQuery =
        !q ||
        w.wardNumber.includes(q) ||
        w.suburbs.toLowerCase().includes(q) ||
        w.councillorName.toLowerCase().includes(q) ||
        w.municipality.toLowerCase().includes(q) ||
        w.keyPriorities.some((p) => p.toLowerCase().includes(q));

      return matchesMuni && matchesQuery;
    });
  }, [query, selectedMunicipality]);

  return (
    <div className="civic-shell min-h-screen text-ink flex flex-col justify-between">
      <div className="city-sheen city-sheen-one" aria-hidden="true" />
      <div className="city-sheen city-sheen-two" aria-hidden="true" />

      <CivicNavbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 w-full flex-1">
        {/* Breadcrumb Navigation */}
        <CivicBreadcrumb
          items={[
            {
              label: "Wards",
              to: selectedMunicipality !== "All municipalities" ? "/wards" : undefined,
              current: selectedMunicipality === "All municipalities",
            },
            ...(selectedMunicipality !== "All municipalities"
              ? [{ label: selectedMunicipality, current: true }]
              : []),
          ]}
        />

        {/* Header */}
        <section className="pb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="verified-pill">
                <ShieldCheck size={14} /> Official Electoral Delimitation
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                Municipal Wards Directory
              </h1>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-ink/75">
                Search wards by number, suburb, or municipal jurisdiction. View registered voting
                populations, infrastructure priorities, and active community projects.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="glass-panel px-4 py-2.5 text-center">
                <span className="block font-display text-2xl font-bold text-electric">
                  {wards.length}
                </span>
                <span className="text-[11px] font-semibold uppercase text-steel/80">
                  Featured Wards
                </span>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="glass-panel mt-6 p-4 sm:p-5">
            <div className="grid gap-3 sm:grid-cols-12 items-center">
              {/* Query search */}
              <div className="search-box sm:col-span-7 !min-h-11">
                <Search size={18} className="text-steel/50" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by ward (e.g. 115, 47), suburb, or priority..."
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-steel/50"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="button-base icon-button-plain"
                    aria-label="Clear query"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Municipality filter */}
              <div className="relative sm:col-span-5">
                <select
                  value={selectedMunicipality}
                  onChange={(e) => setSelectedMunicipality(e.target.value)}
                  className="select-control w-full appearance-none pr-10 text-xs sm:text-sm font-semibold truncate"
                  aria-label="Filter wards by municipality"
                >
                  <option value="All municipalities">All Municipalities (10)</option>
                  {municipalities.map((m) => (
                    <option key={m.name} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-steel/60"
                />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-ink/5 text-xs">
              <span className="text-steel/80 font-medium">
                Showing <strong className="text-ink">{filteredWards.length}</strong> matching wards
              </span>

              {(query || selectedMunicipality !== "All municipalities") && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSelectedMunicipality("All municipalities");
                  }}
                  className="text-xs font-semibold text-electric hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Wards List Grid */}
        <section className="pb-12">
          {filteredWards.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredWards.map((ward) => (
                <div
                  key={`${ward.municipality}-${ward.wardNumber}`}
                  className="glass-card flex flex-col justify-between"
                >
                  <div>
                    {/* Header with Ward Number Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="grid size-12 place-items-center rounded-xl bg-electric text-white font-display font-bold text-lg shadow-sm">
                          {ward.wardNumber}
                        </span>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-steel/70">
                            {ward.province}
                          </span>
                          <h3 className="font-display text-base font-bold text-ink leading-tight">
                            Ward {ward.wardNumber}
                          </h3>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-500/20">
                        <Layers size={11} /> {ward.activeProjects} Projects
                      </span>
                    </div>

                    {/* Municipality info */}
                    <p className="mt-3 text-xs font-medium text-steel/80 flex items-center gap-1.5">
                      <Building2 size={13} className="text-electric shrink-0" />
                      <span className="truncate">{ward.municipality}</span>
                    </p>

                    {/* Suburbs */}
                    <div className="mt-2 rounded-lg bg-white/60 p-2.5 text-xs border border-white/80">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-steel/60">
                        Suburbs & Communities
                      </span>
                      <p className="font-medium text-ink mt-0.5">{ward.suburbs}</p>
                    </div>

                    {/* Key Priorities */}
                    <div className="mt-3">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-steel/60 mb-1">
                        Active Priorities
                      </span>
                      <ul className="space-y-1">
                        {ward.keyPriorities.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-1.5 text-xs text-steel/85"
                          >
                            <CheckCircle2 size={12} className="text-electric shrink-0" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer with Councillor link */}
                  <div className="mt-5 flex items-center justify-between border-t border-ink/5 pt-3">
                    <div className="text-xs">
                      <span className="block text-[10px] text-steel/60 font-medium">
                        Representative
                      </span>
                      <span className="font-bold text-ink">{ward.councillorName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {canEditWard(ward.wardNumber, ward.municipality) && (
                        <button
                          type="button"
                          className="button-base button-light button-small !py-1 !px-2 text-xs flex items-center gap-1 border border-ink/15 hover:border-ink/30"
                          onClick={() => setEditingWard(ward)}
                          title="Edit this ward card"
                        >
                          <Pencil size={11} className="text-electric" /> Edit
                        </button>
                      )}
                      <Link
                        to="/councillors"
                        search={{ municipality: ward.municipality }}
                        className="button-base button-dark button-small text-xs"
                      >
                        Connect <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel py-16 text-center">
              <MapPin size={32} className="mx-auto text-steel/40 mb-2" />
              <h3 className="font-display font-bold text-lg">No Wards Found</h3>
              <p className="mt-1 text-xs text-steel/70">
                Try searching for a different ward number, suburb, or municipality.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedMunicipality("All municipalities");
                }}
                className="button-base button-dark button-small mt-4"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>
      </main>

      <CivicFooter />
    </div>
  );
}
