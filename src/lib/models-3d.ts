export type ModelSlug =
  | "tractor-head"
  | "tipping-trailer"
  | "excavator"
  | "wheel-loader"
  | "dump-truck"
  | "backhoe-loader";

type ModelEntry = {
  slug: ModelSlug;
  label: string;
  src: string;
  poster?: string;
  cameraOrbit: string;
  fieldOfView: string;
};

// Demo-phase model registry. Mapping uses 3 sourced CC0 GLBs (Khronos Sample Assets).
// Production phase will replace src URLs with FAMCO-specific construction-vehicle GLBs.
export const MODELS: Record<ModelSlug, ModelEntry> = {
  "tractor-head": {
    slug: "tractor-head",
    label: "Tractor Head",
    src: "/3d/CesiumMilkTruck.glb",
    cameraOrbit: "45deg 75deg 8m",
    fieldOfView: "30deg",
  },
  "tipping-trailer": {
    slug: "tipping-trailer",
    label: "Tipping Trailer",
    src: "/3d/CesiumMilkTruck.glb",
    cameraOrbit: "-45deg 70deg 9m",
    fieldOfView: "32deg",
  },
  "excavator": {
    slug: "excavator",
    label: "Excavator",
    src: "/3d/CarConcept.glb",
    cameraOrbit: "60deg 70deg 6m",
    fieldOfView: "28deg",
  },
  "wheel-loader": {
    slug: "wheel-loader",
    label: "Wheel Loader",
    src: "/3d/ToyCar.glb",
    cameraOrbit: "30deg 75deg 1.5m",
    fieldOfView: "28deg",
  },
  "dump-truck": {
    slug: "dump-truck",
    label: "Dump Truck",
    src: "/3d/CesiumMilkTruck.glb",
    cameraOrbit: "120deg 75deg 9m",
    fieldOfView: "30deg",
  },
  "backhoe-loader": {
    slug: "backhoe-loader",
    label: "Backhoe Loader",
    src: "/3d/CarConcept.glb",
    cameraOrbit: "-60deg 70deg 7m",
    fieldOfView: "30deg",
  },
};

const CATEGORY_MAP: Record<string, ModelSlug> = {
  // App Category enum values
  "construction equipment": "excavator",
  "material handling": "wheel-loader",
  "commercial vehicles & trucks": "tractor-head",
  "buses": "tractor-head",
  "industrial machinery": "backhoe-loader",
  // Friendly slugs / synonyms
  trucks: "tractor-head",
  truck: "tractor-head",
  trailers: "tipping-trailer",
  trailer: "tipping-trailer",
  excavators: "excavator",
  excavator: "excavator",
  loaders: "wheel-loader",
  loader: "wheel-loader",
  dumpers: "dump-truck",
  dumper: "dump-truck",
  backhoe: "backhoe-loader",
  backhoes: "backhoe-loader",
};

export function getModelForCategory(category?: string | null): ModelEntry {
  if (!category) return MODELS["tractor-head"];
  const slug = CATEGORY_MAP[category.toLowerCase()] ?? "tractor-head";
  return MODELS[slug];
}

export function getModelForProduct(product: {
  category?: string;
  id?: string | number;
}): ModelEntry {
  if (product.category) {
    const found = getModelForCategory(product.category);
    if (found) return found;
  }
  // Stable fallback: hash id to one of 6
  const idStr = String(product.id ?? "0");
  const slugs = Object.keys(MODELS) as ModelSlug[];
  let hash = 0;
  for (let i = 0; i < idStr.length; i++) hash = (hash * 31 + idStr.charCodeAt(i)) >>> 0;
  return MODELS[slugs[hash % slugs.length]];
}
