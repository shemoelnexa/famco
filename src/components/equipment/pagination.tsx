"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white h-9 px-4 text-[13px] font-medium text-black/60 hover:text-black hover:border-black/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="size-3.5" />
        Previous
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`size-9 rounded-full text-[13px] font-semibold transition-all ${
              page === currentPage
                ? "bg-black text-white"
                : "text-black/40 hover:text-black hover:bg-black/5"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white h-9 px-4 text-[13px] font-medium text-black/60 hover:text-black hover:border-black/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        Next
        <ChevronRight className="size-3.5" />
      </button>
    </div>
  );
}
