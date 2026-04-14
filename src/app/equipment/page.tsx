"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, PackageX, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { SearchBar } from "@/components/equipment/search-bar";
import { FilterSidebar } from "@/components/equipment/filter-sidebar";
import { SortDropdown } from "@/components/equipment/sort-dropdown";
import { Pagination } from "@/components/equipment/pagination";
import { ProductCard } from "@/components/equipment/product-card";
import { products } from "@/data/products";
import {
  type FilterState,
  type Product,
  type Category,
  CATEGORIES,
  CATEGORY_SLUGS,
} from "@/lib/types";

const ITEMS_PER_PAGE = 6;

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  priceMin: null,
  priceMax: null,
  yearMin: null,
  yearMax: null,
  makes: [],
  conditions: [],
  locations: [],
  search: "",
  sort: "newest",
};

function applyFilters(items: Product[], filters: FilterState): Product[] {
  let result = [...items];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.make.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (filters.categories.length > 0) {
    result = result.filter((p) => filters.categories.includes(p.category));
  }

  if (filters.makes.length > 0) {
    result = result.filter((p) => filters.makes.includes(p.make));
  }

  if (filters.conditions.length > 0) {
    result = result.filter((p) => filters.conditions.includes(p.condition));
  }

  if (filters.locations.length > 0) {
    result = result.filter((p) =>
      filters.locations.some((loc) => p.location.includes(loc))
    );
  }

  if (filters.priceMin !== null)
    result = result.filter((p) => p.price >= filters.priceMin!);
  if (filters.priceMax !== null)
    result = result.filter((p) => p.price <= filters.priceMax!);
  if (filters.yearMin !== null)
    result = result.filter((p) => p.year >= filters.yearMin!);
  if (filters.yearMax !== null)
    result = result.filter((p) => p.year <= filters.yearMax!);

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "year-desc":
      result.sort((a, b) => b.year - a.year);
      break;
    default:
      result.sort((a, b) => Number(b.id) - Number(a.id));
      break;
  }

  return result;
}

function slugToCategory(slug: string): Category | null {
  for (const [cat, s] of Object.entries(CATEGORY_SLUGS)) {
    if (s === slug) return cat as Category;
  }
  return null;
}

const CATEGORY_LABELS: Record<Category, string> = {
  "Construction Equipment": "Construction",
  "Material Handling": "Material Handling",
  "Commercial Vehicles & Trucks": "Trucks & Vehicles",
  Buses: "Buses",
  "Industrial Machinery": "Industrial",
};

function EquipmentContent() {
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  const [filters, setFilters] = useState<FilterState>(() => {
    const f = { ...DEFAULT_FILTERS, search: initialSearch };
    if (initialCategory) {
      const cat = slugToCategory(initialCategory);
      if (cat) {
        f.categories = [cat];
      }
    }
    return f;
  });

  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => applyFilters(products, filters), [filters]);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const handleCategoryPill = useCallback(
    (cat: Category | null) => {
      if (cat === null) {
        handleFilterChange({ ...filters, categories: [] });
      } else {
        const isActive =
          filters.categories.length === 1 && filters.categories[0] === cat;
        handleFilterChange({
          ...filters,
          categories: isActive ? [] : [cat],
        });
      }
    },
    [filters, handleFilterChange]
  );

  return (
    <div className="min-h-screen bg-[#EFEEED] pt-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10 pb-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-1.5 text-[13px] text-black/40">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-black/70 font-medium">Equipment</span>
        </nav>

        {/* Page Title */}
        <div className="mb-10 animate-fade-in-up" style={{ animationDuration: "0.6s" }}>
          <h1 className="text-[clamp(32px,5vw,48px)] font-semibold text-black leading-[1.05] tracking-[-0.04em]">
            Browse Equipment
          </h1>
          <p className="mt-3 text-[16px] text-black/45 leading-relaxed tracking-[-0.01em]">
            Verified machines from FAMCO Approved sellers across the region.
          </p>
        </div>

        {/* Category Pills — horizontal scroll on mobile */}
        <div className="mb-8 flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => handleCategoryPill(null)}
            className={`shrink-0 rounded-full h-10 px-5 text-[14px] font-medium transition-all duration-200 tracking-[-0.01em] ${
              filters.categories.length === 0
                ? "bg-black text-white"
                : "bg-white text-black/70 border border-black/12 hover:border-black/25 hover:text-black"
            }`}
          >
            All Equipment
          </button>
          {CATEGORIES.map((cat) => {
            const isActive =
              filters.categories.length === 1 && filters.categories[0] === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryPill(cat)}
                className={`shrink-0 rounded-full h-10 px-5 text-[14px] font-medium transition-all duration-200 tracking-[-0.01em] ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-white text-black/70 border border-black/12 hover:border-black/25 hover:text-black"
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar
            search={filters.search}
            onSearchChange={(val) =>
              handleFilterChange({ ...filters, search: val })
            }
          />
        </div>

        {/* Toolbar: result count + mobile filter + sort */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="text-[14px] text-black/45 tracking-[-0.01em]">
              Showing{" "}
              <span className="font-semibold text-black">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "result" : "results"}
            </p>

            {/* Mobile filter trigger */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger
                render={
                  <button className="lg:hidden inline-flex items-center gap-2 rounded-full bg-white border border-black/12 h-10 px-4 text-[14px] font-medium text-black/70 hover:border-black/25 hover:text-black transition-all" />
                }
              >
                <SlidersHorizontal className="size-4" />
                Filters
              </SheetTrigger>
              <SheetContent side="left" className="overflow-y-auto p-6 w-[85vw] sm:w-[320px]">
                <SheetHeader className="p-0 mb-6">
                  <SheetTitle className="text-[18px] font-semibold tracking-[-0.02em]">
                    Filters
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Filter equipment listings
                  </SheetDescription>
                </SheetHeader>
                <FilterSidebar
                  filters={filters}
                  onFilterChange={(f) => {
                    handleFilterChange(f);
                  }}
                  onClear={() => {
                    handleClearFilters();
                    setMobileFiltersOpen(false);
                  }}
                />
              </SheetContent>
            </Sheet>
          </div>

          <SortDropdown
            value={filters.sort}
            onChange={(sort) => handleFilterChange({ ...filters, sort })}
          />
        </div>

        {/* Main: sidebar + grid */}
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-[260px] shrink-0">
            <div className="sticky top-28 rounded-2xl bg-white border border-black/[0.06] p-6">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClear={handleClearFilters}
              />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {paged.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {paged.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <div className="mt-12">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white border border-black/[0.06] py-24 text-center px-6">
                <PackageX className="size-14 text-black/10" />
                <h3 className="mt-5 text-[18px] font-semibold text-black tracking-[-0.02em]">
                  No equipment found
                </h3>
                <p className="mt-2 max-w-sm text-[15px] text-black/45 tracking-[-0.01em]">
                  Try adjusting your search or filters to find what you&apos;re
                  looking for.
                </p>
                <button
                  className="btn-primary mt-8 rounded-full bg-black text-white h-10 px-6 text-[14px] font-medium hover:bg-black/85 transition-colors"
                  onClick={handleClearFilters}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EquipmentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#EFEEED] pt-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10 pb-16">
            <div className="animate-pulse space-y-8">
              <div className="h-5 w-32 rounded bg-black/8" />
              <div className="h-12 w-80 rounded-lg bg-black/8" />
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-10 w-28 rounded-full bg-black/8" />
                ))}
              </div>
              <div className="h-12 w-full rounded-xl bg-black/8" />
              <div className="flex gap-8">
                <div className="hidden lg:block w-[260px] h-[400px] rounded-2xl bg-black/8" />
                <div className="flex-1 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-[340px] rounded-2xl bg-black/8" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <EquipmentContent />
    </Suspense>
  );
}
