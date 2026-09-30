import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Search,
  Building2,
  MapPin,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  X,
  Flame,
  Pencil,
} from "lucide-react";
import { type Councillor } from "@/data/civic-data";
import { CivicNavbar } from "@/components/CivicNavbar";
import { CivicFooter } from "@/components/CivicFooter";
import { ContactModal } from "@/components/ContactModal";
import { CivicBreadcrumb } from "@/components/CivicBreadcrumb";
import { useCivic } from "@/context/CivicContext";

interface CouncillorSearchState {
  municipality?: string;
}

export const Route = createFileRoute("/councillors")({
  validateSearch: (search: Record<string, unknown>): CouncillorSearchState => {
    return {
      municipality: typeof search.municipality === "string" ? search.municipality : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Ward Councillors Directory | CivicRewards" },
      {
        name: "description",
        content: "Find and contact your local ward councillor across South African municipalities.",
      },
      { property: "og:title", content: "Ward Councillors Directory | CivicRewards" },
      {
        property: "og:description",
        content:
          "Official directory of ward councillors with commitments, contact info, and response tracking.",
      },
    ],
  }),
  component: CouncillorsPage,
});

function CouncillorsPage() {
  const searchParams = Route.useSearch();
  const { councillors, municipalities, canEditCouncillor, setEditingCouncillor } = useCivic();
  const [query, setQuery] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>(
    searchParams.municipality ?? "All municipalities",
  );
  const [selectedParty, setSelectedParty] = useState<string>("All Parties");
  const [contactCouncillor, setContactCouncillor] = useState<Councillor | null>(null);

  const parties = useMemo(() => {
    const list = Array.from(new Set(councillors.map((c) => c.party.name)));
    return ["All Parties", ...list];
  }, []);

  const filteredCouncillors = useMemo(() => {
    const q = query.trim().toLowerCase();
    return councillors.filter((c) => {
      const matchesMuni =
        selectedMunicipality === "All municipalities" ||
        c.municipality === selectedMunicipality ||
        c.municipality.toLowerCase().includes(selectedMunicipality.toLowerCase()) ||
        selectedMunicipality.toLowerCase().includes(c.municipality.toLowerCase());

      const matchesParty = selectedParty === "All Parties" || c.party.name === selectedParty;

      const matchesQuery =
        !q ||
        [c.name, c.ward, c.areas, c.municipality, c.party.name, ...c.focus]
          .join(" ")
          .toLowerCase()
          .includes(q);

      return matchesMuni && matchesParty && matchesQuery;
    });
  }, [query, selectedMunicipality, selectedParty]);

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
              label: "Councillors",
              to: selectedMunicipality !== "All municipalities" ? "/councillors" : undefined,
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
                <ShieldCheck size={14} /> 2024–2029 Term · Verified Directory
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                Ward Councillors Directory
              </h1>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-ink/75">
                Connect directly with your elected ward representative. Review municipal
                commitments, community track records, and log verified civic inquiries.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="glass-panel px-4 py-2.5 text-center">
                <span className="block font-display text-2xl font-bold text-electric">
                  {councillors.length}
                </span>
                <span className="text-[11px] font-semibold uppercase text-steel/80">
                  Representatives
                </span>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="glass-panel mt-6 p-4 sm:p-5">
            <div className="grid gap-3 md:grid-cols-12 items-center">
              {/* Search */}
              <div className="search-box md:col-span-5 !min-h-11">
                <Search size={18} className="text-steel/50" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, ward (e.g. 115), or suburb..."
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

              {/* Municipality Select Dropdown */}
              <div className="relative md:col-span-4">
                <select
                  value={selectedMunicipality}
                  onChange={(e) => setSelectedMunicipality(e.target.value)}
                  className="select-control w-full appearance-none pr-10 text-xs sm:text-sm font-semibold truncate"
                  aria-label="Filter by municipality"
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

              {/* Party Select Dropdown */}
              <div className="relative md:col-span-3">
                <select
                  value={selectedParty}
                  onChange={(e) => setSelectedParty(e.target.value)}
                  className="select-control w-full appearance-none pr-10 text-xs sm:text-sm font-semibold truncate"
                  aria-label="Filter by political party"
                >
                  {parties.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-steel/60"
                />
              </div>
            </div>

            {/* Quick summary and reset */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-ink/5 text-xs">
              <span className="text-steel/80 font-medium">
                Showing <strong className="text-ink">{filteredCouncillors.length}</strong> matching
                representatives
              </span>

              {(query ||
                selectedMunicipality !== "All municipalities" ||
                selectedParty !== "All Parties") && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSelectedMunicipality("All municipalities");
                    setSelectedParty("All Parties");
                  }}
                  className="text-xs font-semibold text-electric hover:underline cursor-pointer"
                >
                  Reset all filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Councillor Cards Grid */}
        <section className="pb-12">
          {filteredCouncillors.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredCouncillors.map((councillor) => (
                <article key={councillor.id} className="glass-card flex flex-col justify-between">
                  <div>
                    {/* Top portrait & basic details */}
                    <div className="flex items-start gap-3">
                      <img
                        src={councillor.image}
                        alt={`Portrait of ${councillor.name}`}
                        loading="lazy"
                        width={80}
                        height={80}
                        className="size-16 shrink-0 rounded-xl object-cover shadow-sm"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="truncate font-display font-bold text-base text-ink">
                            {councillor.name}
                          </h3>
                          {councillor.isMostActive && (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                              <Flame size={11} className="text-amber-600" /> Active
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-steel/80 font-medium">
                          Ward {councillor.ward} Councillor
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-electric truncate">
                          <MapPin size={12} className="shrink-0" /> {councillor.areas}
                        </p>
                      </div>
                    </div>

                    {/* Political party & Focus */}
                    <div className="mt-4 flex items-center justify-between gap-3 border-y border-ink/10 py-2.5">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className={`party-logo ${councillor.party.tone}`} aria-hidden="true">
                          {councillor.party.initials}
                        </span>
                        <div className="min-w-0">
                          <span className="block text-[9px] font-bold uppercase tracking-wider text-steel/60">
                            Party
                          </span>
                          <span className="block truncate text-xs font-bold text-ink">
                            {councillor.party.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-wrap justify-end gap-1">
                        {councillor.focus.slice(0, 2).map((item, idx) => (
                          <span
                            key={item}
                            className={idx === 0 ? "focus-pill focus-pill-primary" : "focus-pill"}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Statement */}
                    <p className="mt-3 text-xs leading-relaxed text-steel/85 min-h-12">
                      {councillor.statement}
                    </p>
                  </div>

                  {/* Card bottom action & commitments */}
                  <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-3">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                      <CheckCircle2 size={14} className="text-electric" /> {councillor.commitments}{" "}
                      commitments
                    </span>
                    <div className="flex items-center gap-1.5">
                      {canEditCouncillor(councillor.id) && (
                        <button
                          type="button"
                          className="button-base button-light button-small !py-1 !px-2 text-xs flex items-center gap-1 border border-ink/15 hover:border-ink/30"
                          onClick={() => setEditingCouncillor(councillor)}
                          title="Edit this councillor profile"
                        >
                          <Pencil size={11} className="text-electric" /> Edit
                        </button>
                      )}
                      <button
                        type="button"
                        className="button-base button-dark button-small"
                        onClick={() => setContactCouncillor(councillor)}
                      >
                        Contact <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="glass-panel py-16 text-center">
              <Search size={32} className="mx-auto text-steel/40 mb-2" />
              <h3 className="font-display font-bold text-lg">No Councillors Found</h3>
              <p className="mt-1 text-xs text-steel/70">
                Try a different search query or select another municipality.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedMunicipality("All municipalities");
                  setSelectedParty("All Parties");
                }}
                className="button-base button-dark button-small mt-4"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>

      <CivicFooter />

      {/* Interactive Contact Modal */}
      <ContactModal councillor={contactCouncillor} onClose={() => setContactCouncillor(null)} />
    </div>
  );
}
