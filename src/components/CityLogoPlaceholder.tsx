import React from "react";

interface CityLogoPlaceholderProps {
  name: string;
  code: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CityLogoPlaceholder({
  name,
  code,
  size = "md",
  className = "",
}: CityLogoPlaceholderProps) {
  const normalized = name.toLowerCase();

  const getCityConfig = () => {
    if (normalized.includes("johannesburg")) {
      return {
        bg: "from-amber-500/20 via-emerald-600/15 to-amber-700/30",
        border: "border-amber-600/40",
        badgeBg: "bg-amber-600",
        accentColor: "#D97706",
        initials: "JHB",
        subtitle: "Johannesburg",
        icon: (
          <path
            d="M3 21h18M5 21V7l7-4 7 4v14M9 10h2v3H9zm4 0h2v3h-2zm-4 6h2v3H9zm4 0h2v3h-2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ),
      };
    }
    if (normalized.includes("cape town")) {
      return {
        bg: "from-sky-500/20 via-blue-600/15 to-emerald-700/30",
        border: "border-sky-600/40",
        badgeBg: "bg-sky-600",
        accentColor: "#0284C7",
        initials: "CPT",
        subtitle: "Cape Town",
        icon: (
          <path
            d="M4 18c3-2 6-2 8 0 2-2 5-2 8 0M12 2v10M8 8l4-4 4 4M7 14c0 3 2.5 5 5 5s5-2 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ),
      };
    }
    if (normalized.includes("ethekwini") || normalized.includes("durban")) {
      return {
        bg: "from-teal-500/20 via-cyan-600/15 to-emerald-700/30",
        border: "border-teal-600/40",
        badgeBg: "bg-teal-600",
        accentColor: "#0D9488",
        initials: "ETH",
        subtitle: "eThekwini",
        icon: (
          <path
            d="M2 12c4-3 7-3 10 0 3-3 6-3 10 0M2 17c4-3 7-3 10 0 3-3 6-3 10 0M12 3v5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ),
      };
    }
    if (normalized.includes("tshwane") || normalized.includes("pretoria")) {
      return {
        bg: "from-purple-500/20 via-indigo-600/15 to-amber-700/30",
        border: "border-purple-600/40",
        badgeBg: "bg-purple-600",
        accentColor: "#9333EA",
        initials: "TSH",
        subtitle: "Tshwane",
        icon: (
          <path
            d="M3 21h18M4 18h16M6 18V9M10 18V9M14 18V9M18 18V9M3 9l9-6 9 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ),
      };
    }
    if (normalized.includes("ekurhuleni")) {
      return {
        bg: "from-blue-500/20 via-sky-600/15 to-slate-700/30",
        border: "border-blue-600/40",
        badgeBg: "bg-blue-600",
        accentColor: "#2563EB",
        initials: "EKU",
        subtitle: "Ekurhuleni",
        icon: (
          <path
            d="M12 2L3 9h4v11h10V9h4L12 2zM10 15h4v5h-4z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ),
      };
    }
    if (normalized.includes("nelson mandela")) {
      return {
        bg: "from-indigo-500/20 via-blue-600/15 to-cyan-700/30",
        border: "border-indigo-600/40",
        badgeBg: "bg-indigo-600",
        accentColor: "#4F46E5",
        initials: "NMB",
        subtitle: "Gqeberha",
        icon: (
          <path
            d="M3 20l9-16 9 16H3zM12 8v5M12 16h.01"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ),
      };
    }
    if (normalized.includes("buffalo city")) {
      return {
        bg: "from-orange-500/20 via-amber-600/15 to-stone-700/30",
        border: "border-orange-600/40",
        badgeBg: "bg-orange-600",
        accentColor: "#EA580C",
        initials: "BUF",
        subtitle: "East London",
        icon: (
          <path
            d="M12 2L4 7v6c0 5.5 3.5 10 8 11 4.5-1 8-5.5 8-11V7l-8-5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ),
      };
    }
    if (normalized.includes("mangaung")) {
      return {
        bg: "from-rose-500/20 via-pink-600/15 to-amber-700/30",
        border: "border-rose-600/40",
        badgeBg: "bg-rose-600",
        accentColor: "#E11D48",
        initials: "MAN",
        subtitle: "Bloemfontein",
        icon: (
          <path
            d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ),
      };
    }
    if (normalized.includes("msunduzi")) {
      return {
        bg: "from-emerald-500/20 via-green-600/15 to-teal-700/30",
        border: "border-emerald-600/40",
        badgeBg: "bg-emerald-600",
        accentColor: "#059669",
        initials: "MSU",
        subtitle: "Msunduzi",
        icon: (
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ),
      };
    }

    // Default fallback
    return {
      bg: "from-emerald-500/20 via-teal-600/15 to-amber-700/30",
      border: "border-emerald-600/40",
      badgeBg: "bg-emerald-600",
      accentColor: "#0D9488",
      initials: code.slice(0, 3).toUpperCase(),
      subtitle: name.slice(0, 10),
      icon: (
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
    };
  };

  const config = getCityConfig();

  const sizeClasses = {
    sm: "size-10 text-[10px]",
    md: "size-13 text-xs",
    lg: "size-16 text-sm",
  };

  return (
    <div
      className={`relative group shrink-0 select-none overflow-hidden rounded-2xl border bg-gradient-to-br shadow-sm transition-all duration-300 hover:shadow-md ${config.bg} ${config.border} ${sizeClasses[size]} ${className}`}
      title={`${name} Official Municipal Seal & Logo`}
      aria-label={`${name} Official Logo`}
    >
      {/* Decorative City Crest Emblem */}
      <div className="flex h-full w-full flex-col items-center justify-center p-1 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-5 shrink-0 opacity-80 transition-transform group-hover:scale-110"
          style={{ color: config.accentColor }}
        >
          {config.icon}
        </svg>

        <span className="mt-0.5 font-display text-[9px] font-black tracking-wider text-ink/90 uppercase leading-none">
          {config.initials}
        </span>
      </div>

      {/* Verified City Seal Ribbon Accent */}
      <span className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-500 opacity-80" />
    </div>
  );
}
