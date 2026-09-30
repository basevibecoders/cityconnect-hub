import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import nalediPortrait from "@/assets/councillor-naledi.jpg";
import thaboPortrait from "@/assets/councillor-thabo.jpg";
import zanelePortrait from "@/assets/councillor-zanele.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Councillor Directory | CivicRewards" },
      {
        name: "description",
        content: "Find ward councillors across South African municipalities and connect with your local representatives.",
      },
      { property: "og:title", content: "Councillor Directory | CivicRewards" },
      {
        property: "og:description",
        content: "Search wards and connect with councillors across South Africa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CouncillorDirectory,
});

const councillors = [
  {
    name: "Naledi Mokoena",
    ward: "47",
    municipality: "eThekwini",
    areas: "Berea · Musgrave",
    image: nalediPortrait,
    focus: ["Public health", "Water"],
    party: { name: "Civic Alliance", initials: "CA", tone: "party-emerald" },
    statement: "Supporting reliable local services and stronger neighbourhood health programmes.",
    commitments: 6,
  },
  {
    name: "Thabo Nkosi",
    ward: "115",
    municipality: "Johannesburg",
    areas: "Fourways · Bloubosrand",
    image: thaboPortrait,
    focus: ["Housing", "Roads"],
    party: { name: "Ubuntu Movement", initials: "UM", tone: "party-gold" },
    statement: "Focused on road maintenance and sustainable housing across growing communities.",
    commitments: 4,
  },
  {
    name: "Zanele Dlamini",
    ward: "36",
    municipality: "Cape Town",
    areas: "Langa · Pinelands",
    image: zanelePortrait,
    focus: ["Youth", "Safety"],
    party: { name: "People First", initials: "PF", tone: "party-coral" },
    statement: "Working for safer streets and more skills opportunities for young residents.",
    commitments: 3,
  },
];

const municipalities = [
  { name: "City of Johannesburg", short: "Johannesburg", wards: 135 },
  { name: "eThekwini Municipality", short: "eThekwini", wards: 111 },
  { name: "City of Cape Town", short: "Cape Town", wards: 116 },
  { name: "City of Tshwane", short: "Tshwane", wards: 107 },
];

function ActionButton({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button className={`button-base ${className}`} {...props}>
      {children}
    </button>
  );
}

function CouncillorDirectory() {
  const [query, setQuery] = useState("");
  const [activeMunicipality, setActiveMunicipality] = useState("All municipalities");
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactName, setContactName] = useState<string | null>(null);

  const filteredCouncillors = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return councillors.filter((councillor) => {
      const municipalityMatch = activeMunicipality === "All municipalities" || councillor.municipality === activeMunicipality;
      const queryMatch = !normalized || [councillor.name, councillor.ward, councillor.areas, councillor.municipality].join(" ").toLowerCase().includes(normalized);
      return municipalityMatch && queryMatch;
    });
  }, [activeMunicipality, query]);

  return (
    <div className="civic-shell min-h-screen text-ink">
      <div className="city-sheen city-sheen-one" aria-hidden="true" />
      <div className="city-sheen city-sheen-two" aria-hidden="true" />

      <header className="relative z-20 mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="glass-panel flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-5">
          <a href="#top" className="flex items-center gap-3" aria-label="CivicRewards home">
            <span className="grid size-9 place-items-center rounded-lg bg-electric font-display text-sm font-bold text-electric-foreground">CR</span>
            <span>
              <span className="block font-display text-sm font-bold leading-none">CivicRewards</span>
              <span className="mt-1 block text-[11px] text-steel/70">Find your councillor</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 text-sm font-medium text-steel md:flex" aria-label="Primary navigation">
            <a href="#directory" className="nav-link nav-link-active">Directory</a>
            <a href="#municipalities" className="nav-link">Municipalities</a>
            <a href="#directory" className="nav-link">Wards</a>
            <a href="#about" className="nav-link">About</a>
          </nav>
          <div className="flex items-center gap-2">
            <ActionButton className="button-dark hidden sm:inline-flex">Councillor sign in</ActionButton>
            <ActionButton className="icon-button md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </ActionButton>
          </div>
        </div>
        {menuOpen && (
          <nav className="glass-panel mt-2 grid gap-1 p-2 text-sm font-medium md:hidden" aria-label="Mobile navigation">
            <a href="#directory" className="nav-link nav-link-active" onClick={() => setMenuOpen(false)}>Directory</a>
            <a href="#municipalities" className="nav-link" onClick={() => setMenuOpen(false)}>Municipalities</a>
            <a href="#about" className="nav-link" onClick={() => setMenuOpen(false)}>About</a>
          </nav>
        )}
      </header>

      <main id="top" className="relative z-10">
        <section className="mx-auto grid max-w-7xl items-end gap-8 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-12 lg:pt-16">
          <div className="lg:col-span-7">
            <span className="verified-pill"><ShieldCheck size={15} /> 2024–2029 term · verified directory</span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">Find the councillor who represents your ward.</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">Search municipalities and wards across South Africa. Find the right representative and take part in your community.</p>
          </div>
          <div className="lg:col-span-5">
            <div className="glass-panel p-4">
              <label htmlFor="councillor-search" className="text-xs font-semibold uppercase text-steel/70">Search the directory</label>
              <div className="search-box mt-2">
                <Search size={18} className="text-steel/50" />
                <input id="councillor-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, ward or suburb" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-steel/45" />
                {query && <ActionButton className="icon-button-plain" aria-label="Clear search" onClick={() => setQuery("")}><X size={16} /></ActionButton>}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="info-tile"><Building2 size={15} /><span className="truncate">{activeMunicipality}</span></div>
                <div className="info-tile"><MapPin size={15} /><span>{filteredCouncillors.length} matches</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="directory" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-14 sm:px-6">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-label">Councillor directory</p>
              <h2 className="mt-1 font-display text-2xl font-bold">Representatives near you</h2>
            </div>
            <div className="relative">
              <select value={activeMunicipality} onChange={(event) => setActiveMunicipality(event.target.value)} className="select-control appearance-none pr-10" aria-label="Filter by municipality">
                <option>All municipalities</option>
                {municipalities.map((municipality) => <option key={municipality.name}>{municipality.short}</option>)}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-steel/60" />
            </div>
          </div>

          {filteredCouncillors.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredCouncillors.map((councillor) => (
                <article key={councillor.name} className="glass-card">
                  <div className="flex items-center gap-3">
                    <img src={councillor.image} alt={`Portrait of ${councillor.name}`} loading="lazy" width={816} height={816} className="size-16 shrink-0 rounded-xl object-cover" />
                    <div className="min-w-0">
                      <h3 className="truncate font-display font-bold">{councillor.name}</h3>
                      <p className="mt-0.5 text-xs text-steel/70">Ward Councillor · Ward {councillor.ward}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs font-medium text-electric"><MapPin size={12} /> {councillor.areas}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 border-y border-ink/10 py-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className={`party-logo ${councillor.party.tone}`} aria-hidden="true">{councillor.party.initials}</span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-semibold uppercase text-steel/55">Political party</span>
                        <span className="block truncate text-xs font-bold text-ink">{councillor.party.name}</span>
                      </span>
                    </div>
                    <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
                      {councillor.focus.map((item, index) => <span key={item} className={index === 0 ? "focus-pill focus-pill-primary" : "focus-pill"}>{item}</span>)}
                    </div>
                  </div>
                  <p className="mt-3 min-h-16 text-sm leading-relaxed text-steel/80">{councillor.statement}</p>
                  <div className="mt-4 flex items-center justify-between pt-3">
                    <span className="flex items-center gap-1.5 text-xs font-semibold"><CheckCircle2 size={14} className="text-electric" /> {councillor.commitments} commitments</span>
                    <ActionButton className="button-dark button-small" onClick={() => setContactName(councillor.name)}>Contact <ArrowRight size={14} /></ActionButton>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="glass-panel py-16 text-center">
              <Search size={28} className="mx-auto text-steel/45" />
              <h3 className="mt-3 font-display text-lg font-bold">No councillors found</h3>
              <p className="mt-1 text-sm text-steel/70">Try another name, ward or municipality.</p>
              <ActionButton className="button-dark mt-5" onClick={() => { setQuery(""); setActiveMunicipality("All municipalities"); }}>Clear filters</ActionButton>
            </div>
          )}
        </section>

        <section id="municipalities" className="mx-auto grid max-w-7xl scroll-mt-24 gap-5 px-4 pb-20 sm:px-6 lg:grid-cols-12">
          <div className="glass-panel p-6 lg:col-span-5">
            <p className="section-label">Browse by municipality</p>
            <div className="mt-4 space-y-2">
              {municipalities.slice(0, 3).map((municipality) => (
                <button key={municipality.name} onClick={() => { setActiveMunicipality(municipality.short); document.querySelector("#directory")?.scrollIntoView({ behavior: "smooth" }); }} className="municipality-row">
                  <span>{municipality.name}</span><span className="text-steel/50">{municipality.wards} wards</span>
                </button>
              ))}
            </div>
          </div>
          <div id="about" className="rewards-panel p-6 lg:col-span-7">
            <div className="relative z-10">
              <span className="flex size-10 items-center justify-center rounded-xl bg-paper/20"><Sparkles size={20} /></span>
              <h2 className="mt-5 font-display text-3xl font-bold">A more connected city starts with you.</h2>
              <p className="mt-2 max-w-xl text-paper/80">Find your representative, raise local concerns and stay informed about the work happening in your ward.</p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <ActionButton className="button-light">Open resident app <ArrowRight size={15} /></ActionButton>
                <span className="flex items-center gap-2 text-sm font-semibold"><Users size={18} /> Built for every resident</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-paper/25 px-4 py-6 text-sm text-ink/60 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3"><span>© 2026 CivicRewards</span><span>Clear civic information for South Africa</span></div>
      </footer>

      {contactName && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setContactName(null)}>
          <div className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div><p className="section-label">Contact councillor</p><h2 id="contact-title" className="mt-1 font-display text-xl font-bold">{contactName}</h2></div>
              <ActionButton className="icon-button" aria-label="Close contact dialog" onClick={() => setContactName(null)}><X size={18} /></ActionButton>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-steel/75">Sign in to the resident app to send a verified message and track the response.</p>
            <ActionButton className="button-dark mt-6 w-full justify-center">Continue to sign in <ArrowRight size={15} /></ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}