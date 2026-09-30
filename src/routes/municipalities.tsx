import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Building2,
  Search,
  ArrowRight,
  MapPin,
  Users,
  CheckCircle2,
  ShieldCheck,
  X,
  Pencil,
} from "lucide-react";
import { CivicNavbar } from "@/components/CivicNavbar";
import { CivicFooter } from "@/components/CivicFooter";
import { CityLogoPlaceholder } from "@/components/CityLogoPlaceholder";
import { CivicBreadcrumb } from "@/components/CivicBreadcrumb";
import { useCivic } from "@/context/CivicContext";

export const Route = createFileRoute("/municipalities")({
  head: () => ({
    meta: [
      { title: "Municipalities Directory | CivicRewards" },
      {
        name: "description",
        content:
          "Explore South African metropolitan and local municipalities, ward allocations, and civic boundaries.",
      },
      { property: "og:title", content: "Municipalities Directory | CivicRewards" },
      {
        property: "og:description",
        content:
          "Detailed directory of all 10 major South African municipalities with ward counts and councillor links.",
      },
    ],
  }),
  component: MunicipalitiesPage,
});

function MunicipalitiesPage() {
  const { municipalities, canEditMunicipality, setEditingMunicipality } = useCivic();
  const [query, setQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>("All Provinces");
  const navigate = useNavigate();

  const provinces = useMemo(() => {
    const list = Array.from(new Set(municipalities.map((m) => m.province)));
    return ["All Provinces", ...list];
  }, []);

  const filteredMunicipalities = useMemo(() => {
    const q = query.trim().toLowerCase();
    return municipalities.filter((m) => {
      const matchesProvince =
        selectedProvince === "All Provinces" || m.province === selectedProvince;
      const matchesQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.short.toLowerCase().includes(q) ||
        m.code.toLowerCase().includes(q) ||
        m.province.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q);
      return matchesProvince && matchesQuery;
    });
  }, [query, selectedProvince]);

  const totalWards = useMemo(() => {
    return municipalities.reduce((acc, curr) => acc + curr.wards, 0);
  }, []);

  return (
    <div className="civic-shell min-h-screen text-ink flex flex-col justify-between">
      <div className="city-sheen city-sheen-one" aria-hidden="true" />
      <div className="city-sheen city-sheen-two" aria-hidden="true" />

      <CivicNavbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 w-full flex-1">
        {/* Breadcrumb Navigation */}
        <CivicBreadcrumb
          items={[
            { label: "Municipalities", current: selectedProvince === "All Provinces" },
            ...(selectedProvince !== "All Provinces"
              ? [{ label: selectedProvince, current: true }]
              : []),
          ]}
        />

        {/* Page Header */}
        <section className="pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="verified-pill">
                <ShieldCheck size={14} /> Official Municipal Boundaries
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                Municipalities of South Africa
              </h1>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-ink/75">
                Explore metropolitan and local municipalities across South Africa. Browse ward
                counts, jurisdictional scope, and connect directly with elected leadership.
              </p>
            </div>

            {/* Quick stats panel */}
            <div className="flex items-center gap-3">
              <div className="glass-panel px-4 py-3 text-center">
                <span className="block font-display text-2xl font-bold text-electric">
                  {municipalities.length}
                </span>
                <span className="text-[11px] font-semibold uppercase text-steel/80">
                  Municipalities
                </span>
              </div>
              <div className="glass-panel px-4 py-3 text-center">
                <span className="block font-display text-2xl font-bold text-ink">{totalWards}</span>
                <span className="text-[11px] font-semibold uppercase text-steel/80">
                  Total Wards
                </span>
              </div>
            </div>
          </div>

          {/* Search & Province Filter Bar */}
          <div className="glass-panel mt-6 p-4 sm:p-5">
            <div className="grid gap-3 sm:grid-cols-12 items-center">
              <div className="search-box sm:col-span-7 !min-h-11">
                <Search size={18} className="text-steel/50" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by city, code (e.g. JHB, CPT, ETH), or region..."
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

              <div className="sm:col-span-5 flex items-center justify-between sm:justify-end gap-2 text-xs font-semibold">
                <span className="text-steel/70">Showing:</span>
                <span className="rounded-full bg-white/70 px-3 py-1 text-ink font-bold border border-white/80">
                  {filteredMunicipalities.length} of {municipalities.length} municipalities
                </span>
              </div>
            </div>

            {/* Province chips */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-2 border-t border-ink/5">
              <span className="text-xs font-semibold text-steel/70 mr-1">Province:</span>
              {provinces.map((prov) => {
                const isActive = selectedProvince === prov;
                return (
                  <button
                    key={prov}
                    type="button"
                    onClick={() => setSelectedProvince(prov)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#E5884B] text-white shadow-sm font-bold"
                        : "bg-white/50 text-steel hover:bg-white/80 hover:text-ink"
                    }`}
                  >
                    {prov}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Municipality Grid */}
        <section className="pb-12">
          {filteredMunicipalities.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredMunicipalities.map((municipality) => (
                <div key={municipality.name} className="glass-card flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <CityLogoPlaceholder
                          name={municipality.name}
                          code={municipality.code}
                          size="md"
                        />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-steel/70">
                            {municipality.province} · {municipality.category}
                          </span>
                          <h3 className="font-display text-base font-bold text-ink leading-tight">
                            {municipality.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-steel/85">
                      {municipality.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-y border-ink/10 py-2.5 text-xs">
                      <span className="flex items-center gap-1 text-steel/80 font-medium">
                        <MapPin size={13} className="text-electric" /> Ward Allocation
                      </span>
                      <span className="font-bold text-ink bg-white/70 px-2 py-0.5 rounded border border-white/80">
                        {municipality.wards} Wards
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2 pt-1">
                    {canEditMunicipality() && (
                      <button
                        type="button"
                        className="button-base button-light button-small w-full justify-center text-xs flex items-center gap-1 border border-ink/15 hover:border-ink/30"
                        onClick={() => setEditingMunicipality(municipality)}
                        title="Edit municipality details"
                      >
                        <Pencil size={11} className="text-electric" /> Edit Municipality
                      </button>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/councillors"
                        search={{ municipality: municipality.name }}
                        className="button-base button-light button-small justify-center text-xs"
                      >
                        <Users size={13} /> Councillors
                      </Link>
                      <Link
                        to="/wards"
                        search={{ municipality: municipality.name }}
                        className="button-base button-dark button-small justify-center text-xs"
                      >
                        Wards <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel py-16 text-center">
              <Building2 size={32} className="mx-auto text-steel/40 mb-2" />
              <h3 className="font-display font-bold text-lg">No Municipalities Found</h3>
              <p className="mt-1 text-xs text-steel/70">
                Try searching for a different city, code, or reset the province filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedProvince("All Provinces");
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
