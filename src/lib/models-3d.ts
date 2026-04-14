export type ModelSlug =
  | "tractor-head"
  | "tipping-trailer"
  | "excavator"
  | "wheel-loader"
  | "dump-truck"
  | "backhoe-loader";

export type ModelEntry = {
  slug: ModelSlug;
  label: string;
  /** Sketchfab model UID (used for iframe embed). */
  uid: string;
};

/**
 * Sketchfab UID library — every model the user provided.
 * Embedded via <SketchfabViewer uid={...} />, no auth required.
 */
export const SKETCHFAB_UIDS = {
  craneTruck: "852c8f01bf8444ed8b91e58c232f37ea",
  roadRoller1: "744cd75cc35444c6bd7015b6a9db3e6f",
  realisticDumpTruck: "88374c3f2e944d11ba61fd673eafa210",
  cementTruck: "9533a5599f7848e88dc97bb5ee78c5e5",
  graderTruck: "fd9f8d68895a410f849a8dd5fe38b50d",
  cat797bExcavator: "22aecd2a01384ca884f2cb43b4e22d1c",
  articulatedDumpTruck: "c39fe54062664666957d1b3ad54a46ee",
  dumpTruck1: "f37266d44be84fbaba773fd174b08950",
  scraperTruck: "d84b207945e1464f9879658be795c7eb",
  bulldozer1: "c8bdce3097814930a9b8e5d55d76399a",
  dumpTruck2: "c3edad869ee045f2bf1c888783de7279",
  bulldozer2: "3f9f2563965149478fb9956df2c04382",
  bulldozer3: "188a6d9af62a4f4e8842fd849ca8bc21",
  excavator1: "566ad0a6bb8a48f1943221cb401e9484",
  combineTruck: "766a9af9c3d2431fad505b93526fef3c",
  roadRoller2: "61c3030da63d4b5699e2146eaba6cdf4",
  excavator2: "85c1afbf8ee9400e8769cb8e4b74f408",
  miningTruck: "4c210792ade14346aba5418a946a7062",
} as const;

/**
 * Pool of all 18 UIDs — used for variety across product cards via hash fallback.
 */
const ALL_UIDS = Object.values(SKETCHFAB_UIDS);

/**
 * Best-fit primary model per slug (used by the 3 sanctioned places when
 * no specific product mapping is needed).
 */
export const MODELS: Record<ModelSlug, ModelEntry> = {
  "tractor-head": {
    slug: "tractor-head",
    label: "Tractor Head",
    uid: SKETCHFAB_UIDS.cementTruck,
  },
  "tipping-trailer": {
    slug: "tipping-trailer",
    label: "Tipping Trailer",
    uid: SKETCHFAB_UIDS.articulatedDumpTruck,
  },
  excavator: {
    slug: "excavator",
    label: "Excavator",
    uid: SKETCHFAB_UIDS.cat797bExcavator,
  },
  "wheel-loader": {
    slug: "wheel-loader",
    label: "Wheel Loader",
    uid: SKETCHFAB_UIDS.bulldozer1,
  },
  "dump-truck": {
    slug: "dump-truck",
    label: "Dump Truck",
    uid: SKETCHFAB_UIDS.realisticDumpTruck,
  },
  "backhoe-loader": {
    slug: "backhoe-loader",
    label: "Backhoe Loader",
    uid: SKETCHFAB_UIDS.graderTruck,
  },
};

const CATEGORY_MAP: Record<string, ModelSlug> = {
  // App Category enum values
  "construction equipment": "excavator",
  "material handling": "wheel-loader",
  "commercial vehicles & trucks": "tractor-head",
  buses: "tractor-head",
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

/**
 * Resolve the best model for a product. Cards with the same id always get the
 * same model; across all 18 UIDs we get good visual variety per card grid.
 */
export function getModelForProduct(product: {
  category?: string;
  id?: string | number;
}): ModelEntry {
  const idStr = String(product.id ?? "0");
  let hash = 0;
  for (let i = 0; i < idStr.length; i++) {
    hash = (hash * 31 + idStr.charCodeAt(i)) >>> 0;
  }

  // 50% of the time pick the category-best model; 50% pick from full pool for variety
  if (product.category && hash % 2 === 0) {
    return getModelForCategory(product.category);
  }

  const uid = ALL_UIDS[hash % ALL_UIDS.length];
  // Find the slug whose UID matches; default to dump-truck label if none
  const baseSlug =
    (Object.keys(MODELS) as ModelSlug[]).find(
      (s) => MODELS[s].uid === uid
    ) ?? "dump-truck";
  return { slug: baseSlug, label: MODELS[baseSlug].label, uid };
}
