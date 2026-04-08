"use client";

import { X } from "lucide-react";
import {
  MAKES,
  CONDITIONS,
  LOCATIONS,
  type FilterState,
} from "@/lib/types";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClear: () => void;
}

function hasActiveFilters(filters: FilterState): boolean {
  return (
    filters.categories.length > 0 ||
    filters.makes.length > 0 ||
    filters.conditions.length > 0 ||
    filters.locations.length > 0 ||
    filters.priceMin !== null ||
    filters.priceMax !== null ||
    filters.yearMin !== null ||
    filters.yearMax !== null
  );
}

function toggleArrayItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

function FilterCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-0.5 group">
      <span
        onClick={onChange}
        className={`inline-flex items-center justify-center size-[18px] rounded border transition-all ${
          checked
            ? "bg-black border-black"
            : "border-black/20 group-hover:border-black/40"
        }`}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="text-[14px] text-black/70 tracking-[-0.01em] group-hover:text-black transition-colors">
        {label}
      </span>
    </label>
  );
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onClear,
}: FilterSidebarProps) {
  const active = hasActiveFilters(filters);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <h3 className="text-[15px] font-semibold text-black tracking-[-0.02em]">
          Filters
        </h3>
        {active && (
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1 text-[13px] font-medium text-black/40 hover:text-black transition-colors"
          >
            <X className="size-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="border-t border-black/[0.06] py-5">
        <h4 className="mb-3 text-[13px] font-semibold text-black/50 uppercase tracking-[0.05em]">
          Price Range (AED)
        </h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin ?? ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                priceMin: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="h-10 w-full rounded-lg border border-black/10 bg-transparent px-3 text-[14px] text-black placeholder:text-black/30 outline-none focus:border-black/25 focus:ring-2 focus:ring-black/5 transition-all"
          />
          <span className="text-black/25 text-sm">–</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax ?? ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                priceMax: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="h-10 w-full rounded-lg border border-black/10 bg-transparent px-3 text-[14px] text-black placeholder:text-black/30 outline-none focus:border-black/25 focus:ring-2 focus:ring-black/5 transition-all"
          />
        </div>
      </div>

      {/* Year Range */}
      <div className="border-t border-black/[0.06] py-5">
        <h4 className="mb-3 text-[13px] font-semibold text-black/50 uppercase tracking-[0.05em]">
          Year Range
        </h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="From"
            value={filters.yearMin ?? ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                yearMin: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="h-10 w-full rounded-lg border border-black/10 bg-transparent px-3 text-[14px] text-black placeholder:text-black/30 outline-none focus:border-black/25 focus:ring-2 focus:ring-black/5 transition-all"
          />
          <span className="text-black/25 text-sm">–</span>
          <input
            type="number"
            placeholder="To"
            value={filters.yearMax ?? ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                yearMax: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="h-10 w-full rounded-lg border border-black/10 bg-transparent px-3 text-[14px] text-black placeholder:text-black/30 outline-none focus:border-black/25 focus:ring-2 focus:ring-black/5 transition-all"
          />
        </div>
      </div>

      {/* Make/Brand */}
      <div className="border-t border-black/[0.06] py-5">
        <h4 className="mb-3 text-[13px] font-semibold text-black/50 uppercase tracking-[0.05em]">
          Make / Brand
        </h4>
        <div className="space-y-1.5">
          {MAKES.map((make) => (
            <FilterCheckbox
              key={make}
              checked={filters.makes.includes(make)}
              onChange={() =>
                onFilterChange({
                  ...filters,
                  makes: toggleArrayItem(filters.makes, make),
                })
              }
              label={make}
            />
          ))}
        </div>
      </div>

      {/* Condition */}
      <div className="border-t border-black/[0.06] py-5">
        <h4 className="mb-3 text-[13px] font-semibold text-black/50 uppercase tracking-[0.05em]">
          Condition
        </h4>
        <div className="space-y-1.5">
          {CONDITIONS.map((cond) => (
            <FilterCheckbox
              key={cond}
              checked={filters.conditions.includes(cond)}
              onChange={() =>
                onFilterChange({
                  ...filters,
                  conditions: toggleArrayItem(filters.conditions, cond),
                })
              }
              label={cond}
            />
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="border-t border-black/[0.06] py-5">
        <h4 className="mb-3 text-[13px] font-semibold text-black/50 uppercase tracking-[0.05em]">
          Location
        </h4>
        <div className="space-y-1.5">
          {LOCATIONS.map((loc) => (
            <FilterCheckbox
              key={loc}
              checked={filters.locations.includes(loc)}
              onChange={() =>
                onFilterChange({
                  ...filters,
                  locations: toggleArrayItem(filters.locations, loc),
                })
              }
              label={loc}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
