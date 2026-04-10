export type Category =
  | "Construction Equipment"
  | "Material Handling"
  | "Commercial Vehicles & Trucks"
  | "Buses"
  | "Industrial Machinery";

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: Category;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  hours: number;
  location: string;
  condition: "Excellent" | "Good" | "Fair";
  images: string[];
  description: string;
  specifications: Record<string, string>;
  inspectionDate: string;
  certified: boolean;
  featured: boolean;
}

export interface FilterState {
  categories: Category[];
  priceMin: number | null;
  priceMax: number | null;
  yearMin: number | null;
  yearMax: number | null;
  makes: string[];
  conditions: string[];
  locations: string[];
  search: string;
  sort: "newest" | "price-asc" | "price-desc" | "year-desc";
}

export const CATEGORIES: Category[] = [
  "Construction Equipment",
  "Material Handling",
  "Commercial Vehicles & Trucks",
  "Buses",
  "Industrial Machinery",
];

export const CATEGORY_SLUGS: Record<Category, string> = {
  "Construction Equipment": "construction-equipment",
  "Material Handling": "material-handling",
  "Commercial Vehicles & Trucks": "commercial-vehicles-trucks",
  "Buses": "buses",
  "Industrial Machinery": "industrial-machinery",
};

export const MAKES = ["Volvo", "CAT", "Komatsu", "Doosan", "Linde", "Yanmar", "SDLG", "Gorica"];
export const LOCATIONS = ["UAE", "KSA", "Qatar", "Bahrain"];
export const CONDITIONS: Product["condition"][] = ["Excellent", "Good", "Fair"];
