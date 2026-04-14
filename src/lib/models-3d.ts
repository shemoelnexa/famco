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

// Demo-phase model registry. Uses CesiumMilkTruck (CC0, Khronos Sample Assets) as
// the placeholder construction-vehicle GLB across all categories. Production phase
// will replace `src` with FAMCO-specific construction-vehicle GLBs (excavator,
// dump truck, wheel loader, etc). Camera angles vary so visually-similar listings
// look different.
const PLACEHOLDER_TRUCK = "/3d/CesiumMilkTruck.glb";

export const MODELS: Record<ModelSlug, ModelEntry> = {
  "tractor-head": {
    slug: "tractor-head",
    label: "Tractor Head",
    src: PLACEHOLDER_TRUCK,
    cameraOrbit: "35deg 70deg 6m",
    fieldOfView: "32deg",
  },
  "tipping-trailer": {
    slug: "tipping-trailer",
    label: "Tipping Trailer",
    src: PLACEHOLDER_TRUCK,
    cameraOrbit: "-40deg 75deg 6.5m",
    fieldOfView: "32deg",
  },
  "excavator": {
    slug: "excavator",
    label: "Excavator",
    src: PLACEHOLDER_TRUCK,
    cameraOrbit: "60deg 70deg 6m",
    fieldOfView: "32deg",
  },
  "wheel-loader": {
    slug: "wheel-loader",
    label: "Wheel Loader",
    src: PLACEHOLDER_TRUCK,
    cameraOrbit: "120deg 75deg 6m",
    fieldOfView: "32deg",
  },
  "dump-truck": {
    slug: "dump-truck",
    label: "Dump Truck",
    src: PLACEHOLDER_TRUCK,
    cameraOrbit: "-110deg 70deg 6.5m",
    fieldOfView: "32deg",
  },
  "backhoe-loader": {
    slug: "backhoe-loader",
    label: "Backhoe Loader",
    src: PLACEHOLDER_TRUCK,
    cameraOrbit: "150deg 75deg 6m",
    fieldOfView: "32deg",
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
