import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Flame,
  Layers,
  Pencil,
} from "lucide-react";
import { useMemo, useState } from "react";
import { type Councillor } from "@/data/civic-data";
import { CivicNavbar } from "@/components/CivicNavbar";
import { CivicFooter } from "@/components/CivicFooter";
import { ContactModal } from "@/components/ContactModal";
import { CityLogoPlaceholder } from "@/components/CityLogoPlaceholder";
import { useCivic } from "@/context/CivicContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CityConnect Hub - Councillor Directory | CivicRewards" },
      {
        name: "description",
        content:
          "Find ward councillors across South African municipalities and connect with your local representatives.",
      },
      { property: "og:title", content: "CityConnect Hub - Councillor Directory | CivicRewards" },
      {
        property: "og:description",
        content: "Search wards and connect with councillors across South Africa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomeDirectoryPage,
});

function HomeDirectoryPage() {
  const {
    municipalities,
    councillors,
    wards,
    canEditCouncillor,
    canEditWard,
    canEditMunicipality,
    setEditingCouncillor,
    setEditingWard,
    setEditingMunicipality,
  } = useCivic();
  const [query, setQuery] = useState("");
  const [activeMunicipality, setActiveMunicipality] = useState("All municipalities");
  const [contactCouncillor, setContactCouncillor] = useState<Councillor | null>(null);

  // Top 4 Most Active Councillors
  const previewCouncillors = useMemo(() => {
    return councillors
      .filter((c) => {
        const matchesMuni =
          activeMunicipality === "All municipalities" ||
          c.municipality === activeMunicipality ||
          activeMunicipality.toLowerCase().includes(c.municipality.toLowerCase()) ||
          c.municipality.toLowerCase().includes(activeMunicipality.toLowerCase());

        const normalized = query.trim().toLowerCase();
        const matchesQuery =
          !normalized ||
          [c.name, c.ward, c.areas, c.municipality, ...c.focus]
            .join(" ")
            .toLowerCase()
            .includes(normalized);

        return matchesMuni && matchesQuery;
      })
      .sort((a, b) => b.activityScore - a.activityScore)
      .slice(0, 4);
  }, [activeMunicipality, query]);

  // Top 4 Most Active Municipalities
  const previewMunicipalities = useMemo(() => {
    return [...municipalities].sort((a, b) => b.wards - a.wards).slice(0, 4);
  }, []);

  // Top 4 Most Active Wards
  const previewWards = useMemo(() => {
    return [...wards].sort((a, b) => b.activeProjects - a.activeProjects).slice(0, 4);
  }, []);

  return (
    <div className="civic-shell min-h-screen text-ink flex flex-col justify-between">
      <div className="city-sheen city-sheen-one" aria-hidden="true" />
      <div className="city-sheen city-sheen-two" aria-hidden="true" />

      <CivicNavbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 w-full flex-1">
        {/* Hero Section with Quick Search */}
        <section className="grid items-end gap-8 pb-10 pt-4 sm:pt-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="verified-pill">
              <ShieldCheck size={14} /> 2024–2029 Term · Verified Directory
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">
              Find the councillor who represents your ward.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
              Search municipalities and wards across South Africa. Connect directly with your local
              representative and raise neighborhood priorities.
            </p>

            {/* Hub Quick Links */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link
                to="/municipalities"
                className="inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/60 px-3.5 py-2 text-xs font-bold text-ink shadow-sm transition-all hover:bg-white hover:scale-105"
              >
                <Building2 size={14} className="text-electric" />
                <span>Municipalities (10)</span>
                <ArrowRight size={12} className="text-steel/60" />
              </Link>
              <Link
                to="/councillors"
                className="inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/60 px-3.5 py-2 text-xs font-bold text-ink shadow-sm transition-all hover:bg-white hover:scale-105"
              >
                <Users size={14} className="text-electric" />
                <span>All Councillors</span>
                <ArrowRight size={12} className="text-steel/60" />
              </Link>
              <Link
                to="/wards"
                className="inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/60 px-3.5 py-2 text-xs font-bold text-ink shadow-sm transition-all hover:bg-white hover:scale-105"
              >
                <MapPin size={14} className="text-electric" />
                <span>Ward Boundaries</span>
                <ArrowRight size={12} className="text-steel/60" />
              </Link>
            </div>
          </div>

          {/* Quick Search Panel */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-5">
              <label
                htmlFor="home-councillor-search"
                className="text-xs font-bold uppercase tracking-wider text-steel/70"
              >
                Quick Directory Search
              </label>

              <div className="search-box mt-2">
                <Search size={18} className="text-steel/50" />
                <input
                  id="home-councillor-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Name, ward or suburb (e.g. 115, Berea)"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-steel/45"
                />
              </div>

              {/* Dropdown for All Municipalities */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="relative info-tile group cursor-pointer transition-colors hover:bg-white/80">
                  <Building2 size={15} className="shrink-0 text-steel/70 pointer-events-none" />
                  <span className="truncate flex-1 font-medium pointer-events-none text-ink text-xs">
                    {activeMunicipality}
                  </span>
                  <ChevronDown
                    size={13}
                    className="shrink-0 text-steel/50 pointer-events-none transition-transform group-hover:translate-y-0.5"
                  />
                  <select
                    value={activeMunicipality}
                    onChange={(event) => setActiveMunicipality(event.target.value)}
                    className="absolute inset-0 size-full cursor-pointer opacity-0 text-xs"
                    aria-label="Filter by municipality"
                  >
                    <option value="All municipalities">All Municipalities</option>
                    {municipalities.map((m) => (
                      <option key={m.name} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="info-tile">
                  <MapPin size={15} className="shrink-0 text-steel/70" />
                  <span className="truncate font-semibold text-xs">
                    {previewCouncillors.length} match{previewCouncillors.length === 1 ? "" : "es"}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs pt-2 border-t border-ink/5">
                <span className="text-steel/70">Need a comprehensive list?</span>
                <Link
                  to="/councillors"
                  search={{
                    municipality:
                      activeMunicipality !== "All municipalities" ? activeMunicipality : undefined,
                  }}
                  className="font-bold text-electric hover:underline flex items-center gap-1"
                >
                  Full Directory <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Most Active Councillors (Preview of 4) */}
        <section className="pb-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="section-label">Verified Activity Feed</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                  <Flame size={11} className="text-amber-600" /> Top Responders
                </span>
              </div>
              <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl text-ink">
                Most Active Councillors
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-steel/80 max-w-xl">
                Top 4 featured representatives with highest engagement scores and verified
                commitment delivery.
              </p>
            </div>

            <Link to="/councillors" className="button-base button-light text-xs font-bold">
              View all councillors <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {previewCouncillors.map((councillor) => (
              <article key={councillor.id} className="glass-card flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-3">
                    <img
                      src={councillor.image}
                      alt={`Portrait of ${councillor.name}`}
                      loading="lazy"
                      width={64}
                      height={64}
                      className="size-14 shrink-0 rounded-xl object-cover shadow-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="truncate font-display font-bold text-sm text-ink">
                          {councillor.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded bg-electric/10 px-1.5 py-0.5 text-[10px] font-bold text-electric">
                          {councillor.activityScore}%
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-steel/80 font-medium">
                        Ward {councillor.ward}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-electric truncate">
                        <MapPin size={11} className="shrink-0" /> {councillor.areas}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2 border-y border-ink/10 py-2">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span
                        className={`party-logo !size-7 !text-[10px] ${councillor.party.tone}`}
                        aria-hidden="true"
                      >
                        {councillor.party.initials}
                      </span>
                      <span className="truncate text-xs font-bold text-ink">
                        {councillor.party.name}
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-steel/85 line-clamp-2">
                    {councillor.statement}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-3 text-xs">
                  <span className="flex items-center gap-1 font-semibold text-ink">
                    <CheckCircle2 size={13} className="text-electric" /> {councillor.commitments}{" "}
                    commitments
                  </span>
                  <div className="flex items-center gap-1">
                    {canEditCouncillor(councillor.id) && (
                      <button
                        type="button"
                        className="button-base button-light button-small !min-h-7 !py-1 !px-2 text-[11px] flex items-center gap-1 border border-ink/15 hover:border-ink/30"
                        onClick={() => setEditingCouncillor(councillor)}
                        title="Edit councillor card"
                      >
                        <Pencil size={10} className="text-electric" /> Edit
                      </button>
                    )}
                    <button
                      type="button"
                      className="button-base button-dark button-small !min-h-7 !py-1 !px-2.5 text-[11px]"
                      onClick={() => setContactCouncillor(councillor)}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 2. Most Active Municipalities (Preview of 4) */}
        <section className="pb-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="section-label">Municipal Demographics</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-electric/10 px-2 py-0.5 text-[10px] font-bold text-electric">
                  <Building2 size={11} /> Metropolitan Hubs
                </span>
              </div>
              <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl text-ink">
                Most Active Municipalities
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-steel/80 max-w-xl">
                Top 4 metropolitan and regional municipalities with the highest ward allocations.
              </p>
            </div>

            <Link to="/municipalities" className="button-base button-light text-xs font-bold">
              View all 10 municipalities <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {previewMunicipalities.map((m) => (
              <div key={m.name} className="glass-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <CityLogoPlaceholder name={m.name} code={m.code} size="md" />
                    <span className="text-xs font-bold text-ink bg-white/80 px-2.5 py-0.5 rounded-full border border-white/90">
                      {m.wards} Wards
                    </span>
                  </div>
                  <h3 className="mt-3 font-display font-bold text-base text-ink leading-tight">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-[11px] text-steel/70 font-semibold">{m.province}</p>
                  <p className="mt-2 text-xs text-steel/80 line-clamp-2">{m.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-ink/5 space-y-1.5">
                  {canEditMunicipality() && (
                    <button
                      type="button"
                      className="button-base button-light button-small w-full justify-center !min-h-7 !py-1 text-[11px] flex items-center gap-1 border border-ink/15 hover:border-ink/30"
                      onClick={() => setEditingMunicipality(m)}
                      title="Edit municipality"
                    >
                      <Pencil size={10} className="text-electric" /> Edit Municipality
                    </button>
                  )}
                  <Link
                    to="/councillors"
                    search={{ municipality: m.name }}
                    className="button-base button-dark button-small w-full justify-center text-xs"
                  >
                    View councillors <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Most Active Wards (Preview of 4) */}
        <section className="pb-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="section-label">Community Infrastructure</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  <Layers size={11} /> Active Projects
                </span>
              </div>
              <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl text-ink">
                Most Active Wards
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-steel/80 max-w-xl">
                Top 4 wards leading in infrastructure maintenance, community meetings, and active
                projects.
              </p>
            </div>

            <Link to="/wards" className="button-base button-light text-xs font-bold">
              View all wards <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {previewWards.map((w) => (
              <div
                key={`${w.municipality}-${w.wardNumber}`}
                className="glass-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid size-9 place-items-center rounded-xl bg-electric text-white font-display font-bold text-sm">
                      {w.wardNumber}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {w.activeProjects} active projects
                    </span>
                  </div>
                  <h3 className="mt-3 font-display font-bold text-base text-ink">
                    Ward {w.wardNumber}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-steel/70 font-medium truncate">
                    {w.municipality}
                  </p>
                  <p className="mt-2 text-xs text-steel/85 line-clamp-2">
                    <strong>Areas:</strong> {w.suburbs}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-ink/5 flex items-center justify-between text-xs">
                  <span className="text-steel/70">Rep: {w.councillorName}</span>
                  <div className="flex items-center gap-1.5">
                    {canEditWard(w.wardNumber, w.municipality) && (
                      <button
                        type="button"
                        className="button-base button-light button-small !min-h-7 !py-0.5 !px-1.5 text-[10px] flex items-center gap-1 border border-ink/15 hover:border-ink/30"
                        onClick={() => setEditingWard(w)}
                        title="Edit ward"
                      >
                        <Pencil size={9} className="text-electric" /> Edit
                      </button>
                    )}
                    <Link
                      to="/councillors"
                      search={{ municipality: w.municipality }}
                      className="font-bold text-electric hover:underline flex items-center gap-1"
                    >
                      Connect <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Civic banner */}
        <section className="rewards-panel p-6 sm:p-8 mb-12">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-paper/20">
                <Sparkles size={20} />
              </span>
              <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold">
                A more responsive, connected city starts with you.
              </h2>
              <p className="mt-2 max-w-xl text-paper/85 text-xs sm:text-sm">
                Join thousands of residents submitting service inquiries, monitoring water and power
                maintenance schedules, and holding local ward representatives accountable.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link to="/councillors" className="button-base button-light justify-center">
                Search my councillor <ArrowRight size={15} />
              </Link>
              <Link
                to="/municipalities"
                className="button-base button-dark justify-center !bg-ink/40 !border !border-white/20"
              >
                Browse municipalities
              </Link>
            </div>
          </div>
        </section>
      </main>

      <CivicFooter />

      {/* Contact modal */}
      <ContactModal councillor={contactCouncillor} onClose={() => setContactCouncillor(null)} />
    </div>
  );
}
