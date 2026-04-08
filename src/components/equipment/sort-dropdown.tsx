"use client";

import { ChevronDown } from "lucide-react";
import type { FilterState } from "@/lib/types";

interface SortDropdownProps {
  value: FilterState["sort"];
  onChange: (value: FilterState["sort"]) => void;
}

const SORT_OPTIONS: { value: FilterState["sort"]; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low–High" },
  { value: "price-desc", label: "Price: High–Low" },
  { value: "year-desc", label: "Year: Newest" },
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const activeLabel = SORT_OPTIONS.find((o) => o.value === value)?.label ?? "Newest";

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as FilterState["sort"])}
        className="appearance-none rounded-full border border-black/15 bg-white h-10 pl-4 pr-10 text-[14px] font-medium text-black cursor-pointer outline-none hover:border-black/25 focus:border-black/30 focus:ring-2 focus:ring-black/5 transition-all tracking-[-0.01em]"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            Sort: {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-black/40 pointer-events-none" />
    </div>
  );
}
