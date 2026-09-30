import React from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbCrumb {
  label: string;
  to?: string;
  search?: Record<string, unknown>;
  current?: boolean;
}

interface CivicBreadcrumbProps {
  items: BreadcrumbCrumb[];
  className?: string;
}

export function CivicBreadcrumb({ items, className = "" }: CivicBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`mb-4 flex flex-wrap items-center gap-1.5 text-xs text-steel/80 ${className}`}
    >
      <Link
        to="/"
        className="flex items-center gap-1 font-medium text-steel hover:text-ink hover:underline transition-colors"
      >
        <Home size={13} className="text-electric" />
        <span>Home</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1 || item.current;

        return (
          <React.Fragment key={`${item.label}-${idx}`}>
            <ChevronRight size={12} className="text-steel/40 shrink-0" aria-hidden="true" />
            {isLast || !item.to ? (
              <span
                className="font-bold text-ink truncate max-w-[200px] sm:max-w-xs"
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link
                to={item.to}
                search={item.search}
                className="font-medium text-steel hover:text-ink hover:underline transition-colors truncate max-w-[150px] sm:max-w-xs"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
