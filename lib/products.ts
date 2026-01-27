import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";

// Define slugs as const array to preserve literal types and derive union type
const PRODUCT_SLUGS = [
  "poi-fresh",
  "haupia-mix",
  "kalua-pork-frozen",
  "lau-lau-frozen",
  "coconut-milk-can",
  "taro-chips",
  "li-hing-mui-powder",
  "poke-sauce",
  "teriyaki-sauce",
  "shoyu-sauce",
  "taro-root-fresh",
  "sweet-potato-hawaiian",
  "breadfruit-fresh",
  "kulolo-mix",
  "malasada-mix",
  "coconut-haupia-pie",
  "chicken-long-rice-frozen",
  "squid-luau-frozen",
  "guava-nectar",
  "passion-fruit-juice",
  "lilikoi-juice",
  "macadamia-nuts",
  "dried-ika",
  "arare-rice-crackers",
] as const;

// Derive ProductSlug union type from the const array
export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

// Define category keys as const array to preserve literal types and derive union type
const CATEGORY_KEYS = [
  "traditional-staples",
  "desserts",
  "frozen-foods",
  "beverages",
  "snacks",
  "seasonings",
] as const;

// Derive CategoryKey union type from the const array
export type CategoryKey = (typeof CATEGORY_KEYS)[number];

// Type guard function to narrow string to ProductSlug without casts
export function isProductSlug(slug: string): slug is ProductSlug {
  // TypeScript can narrow the type when we check against the const array values
  for (const validSlug of PRODUCT_SLUGS) {
    if (slug === validSlug) {
      return true;
    }
  }
  return false;
}

// Type guard function to narrow string to CategoryKey without casts
export function isCategoryKey(key: string): key is CategoryKey {
  // TypeScript can narrow the type when we check against the const array values
  for (const validKey of CATEGORY_KEYS) {
    if (key === validKey) {
      return true;
    }
  }
  return false;
}

export interface ProductBase {
  slug: ProductSlug;
  itemNumber: string;
  unitPerPack: number;
  overallSize: string;
  imageUrl: string;
  categoryKey: CategoryKey;
  featured: boolean;
}

// Type guard for ProductBase
function isValidProductBase(p: {
  slug: string;
  itemNumber: string;
  unitPerPack: number;
  overallSize: string;
  imageUrl: string;
  categoryKey: string;
  featured: boolean;
}): p is ProductBase {
  return isProductSlug(p.slug) && isCategoryKey(p.categoryKey);
}

export function getAllProductsBase(): ProductBase[] {
  // Validate that all products have valid slugs (type-safe without casts)
  return productsData.filter(isValidProductBase);
}

export function getProductBySlug(slug: ProductSlug): ProductBase | undefined {
  return getAllProductsBase().find((p) => p.slug === slug);
}

export function getAllSlugs(): ProductSlug[] {
  return getAllProductsBase().map((p) => p.slug);
}

export function getFeaturedProducts(): ProductBase[] {
  return getAllProductsBase().filter((p) => p.featured);
}

export function getCategories(): CategoryKey[] {
  const categories = new Set<CategoryKey>();
  getAllProductsBase().forEach((p) => {
    categories.add(p.categoryKey);
  });
  return Array.from(categories);
}

export function getProductsByCategory(categoryKey: CategoryKey): ProductBase[] {
  return getAllProductsBase().filter((p) => p.categoryKey === categoryKey);
}

export function getCategoryImage(categoryKey: CategoryKey): string {
  const images = categoriesData as Record<CategoryKey, string>;
  return images[categoryKey] || "";
}
