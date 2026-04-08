"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({ search, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-[18px] text-black/30 pointer-events-none" />
      <input
        type="text"
        placeholder="Search by keyword, make, model..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-xl border border-black/[0.08] bg-white h-12 pl-11 pr-5 text-[15px] text-black placeholder:text-black/30 outline-none focus:border-black/20 focus:ring-2 focus:ring-black/5 transition-all tracking-[-0.01em]"
      />
    </div>
  );
}
