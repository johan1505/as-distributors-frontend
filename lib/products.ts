import productsData from '@/data/products.json';

// Define slugs as const array to preserve literal types and derive union type
export const PRODUCT_SLUGS = [
	'ox-palm-corned-beef-7oz',
	'ox-palm-corned-beef-11-5oz',
	'ox-palm-corned-beef-tapered',
	'ox-palm-corned-beef-15oz',
	'ox-palm-corned-beef-3lb',
	'ox-palm-corned-beef-6lb',
	'pacific-corned-beef-7oz',
	'pacific-corned-beef-11-5oz',
	'pacific-corned-beef-15oz',
	'pacific-corned-beef-3lb',
	'crown-corned-mutton',
	'colonial-corned-mutton-halal',
	'colonial-corned-mutton-regular',
	'globe-corned-mutton-halal',
	'angel-mackerel-natural-oil',
	'angel-mackerel-tomato-sauce',
	'pacific-ocean-mackerel-natural-oil',
	'pacific-ocean-mackerel-tomato-sauce',
	'777-mackerel-natural-oil',
	'777-mackerel-tomato-sauce',
	'brunswick-sardines-soybean-oil',
	'skipper-tuna-vegetable-oil',
	'fish-kawa-kawa',
	'fish-kawa-kawa-steak-slices',
	'ulavi-parrot-fish',
	'unicorn-ta',
	'kawango',
	'pacific-taste-coconut-milk-13oz',
	'pacific-taste-coconut-milk-98oz',
	'pacific-crown-fiji-coconut-cream',
	'pacific-crown-tahitian-chestnut',
	'watties-spaghetti-tomato-sauce',
	'watties-baked-beans-tomato-sauce',
	'palusami-taro-leaves',
	'pacific-crown-duruka-stalk-brine',
	'milk-arrowroot',
	'monte-carlo',
	'tim-tam-extra-chocolate',
	'tim-tam-chewy-caramel',
	'tim-tam-dark-chocolate',
	'tim-tam-mint',
	'tim-tam-original',
	'delta-cream',
	'scotch-finger',
	'shortbread-cream',
	'shortbread-plain',
	'punjas-milk-arrowroot',
	'fmf-milk-arrowroot',
	'fmf-coconut-cookies',
	'big-sister-light-fruit-cake',
	'big-sister-dark-fruit-cake',
	'fmf-flour',
	'sao-shortbread-cream',
	'fmf-scotch-finger',
	'fmf-breakfast-crackers-13oz',
	'fmf-breakfast-crackers-fine',
	'fmf-breakfast-crackers-4lb',
	'fmf-breakfast-crackers-11lb',
	'corn-puff-mix',
	'lakdhi-methai',
	'murkoo',
	'rice-murkoo',
	'desi-mix',
	'madras-mix',
	'punjabi-mix',
	'sao-plain',
	'sao-fine',
	'sao-mix',
	'peanut-peas-mix',
	'fried-peanuts',
	'fried-peas',
	'fried-peas-hot',
	'fiji-mix',
	'fix-mix-spicy',
	'boja-king-cheese-snack-56gr',
	'boja-king-cheese-snack-64gr',
	'boja-king-cheese-snack-28oz',
	'boja-king-chicken-snack-156oz',
	'boja-king-chicken-snack-64oz',
	'boja-king-chicken-snack-28oz',
	'boja-king-cheese-20gr',
	'boja-king-cheese-100gr',
	'boja-king-cheese-250gr',
	'twistes-cheese-500gr',
	'boja-king-chicken-20gr',
	'boja-king-chicken-28gr',
	'boja-king-chicken-100gr',
	'twistes-chicken-500gr',
	'boja-king-ufo-burger-20gr',
	'boja-king-ufo-burger-100gr',
	'boja-king-ufo-burger-200gr',
	'jasons-peanut-ruffs-20gr',
	'jasons-peanut-ruffs-64gr',
	'jasons-peanut-ruffs-156gr',
	'cadbury-crunchie-bars',
	'cadbury-dream-bars',
	'cadbury-fruit-nut',
	'cadbury-dairy-milk-bar',
	'amra-pickles',
	'kamrak-star-pickle-apple',
	'kutchla-hot-mango-chutney',
	'homemade-mango',
	'tamarind-chutney',
	'bongo-chili',
	'sweet-mango-pickle',
	'pacific-choice-curry-powder-mild',
	'pacific-choice-curry-powder-hot',
	'punjas-curry-powder',
	'haldi-powder-turmeric',
	'punjas-hot-masala-12pk',
	'punjas-hot-masala-24pk',
	'punjas-meat-masala',
	'punjas-coconut-oil',
	'punjas-mustard-oil-750ml',
	'punjas-mustard-oil-2lt',
	'punjas-mustard-oil-4lt',
	'punjas-ghee-butter-750ml',
	'punjas-ghee-butter-2lt',
	'punjas-vanaspati',
	'punjas-ghee-butter-4lt',
	'natural-coconut-oil-tiara',
	'natural-coconut-oil-frangipani',
	'natural-coconut-oil-rose',
	'natural-coconut-oil-infusion',
	'natural-coconut-oil-sandalwood',
	'weetbix-breakfast-cereal-13oz',
	'weetbix-breakfast-cereal-20oz',
	'weetbix-breakfast-cereal-2lb',
	'fufu-mix-plantain-flour',
	'fufu-mix-cocoyam-flour',
	'rewa-full-cream-milk-powder',
	'milo-powder-singapore-14oz',
	'milo-powder-singapore-3lb',
	'kava-lawena-powder',
	'kava-wake-powder',
	'nestle-cocoa',
	'bushells-black-tea-200gr',
	'ceylon-black-tea-200gr',
	'punjas-tea-masala',
	'lamb-shoulder-whole',
	'lamb-regular-diced',
	'lamb-regular-diced-prepack',
	'lamb-neck-whole',
	'lamb-neck-sliced',
	'lamb-neck-sliced-prepack',
	'lamb-leg-whole',
	'lamb-leg-sliced-prepack',
	'lamb-flap-whole',
	'lamb-flap-sliced-prepack',
	'lamb-shank-whole',
	'lamb-shank-sliced-prepack',
	'australian-goat-whole',
	'australian-goat-diced-prepack',
	'chicken-sausage',
	'chicken-sausage-hot',
	'lamb-sausage-2lb',
	'lamb-sausage-hot',
	'samoan-beef-bangers',
	'samoan-pork-bangers',
	'muscovy-duck-halal',
	'roosters-halal',
	'povi-masima',
	'turkey-tails',
	'yellow-cassava-2lb',
	'white-cassava-5lb',
	'white-cassava-2lb',
	'pink-taro',
	'purple-taro-2lb',
	'purple-taro-5lb',
	'white-taro',
	'yellow-taro-2lb',
	'yellow-taro-5lb',
	'bele',
	'duruka',
	'jackfruit',
	'taro-leaves',
	'breadfruit-5lb',
	'tahitian-chestnut-ivi',
	'paranthas-plain-value-pack',
	'anchor-butter-new-zealand',
	'tuckers-blitz',
	'tucker-blitz-bars',
	'tuckers-passion-fruit',
	'tuckers-triple-ripple',
	'sunquick-tropical-juice-concentrate',
	'sunquick-orange-juice-concentrate',
	'sunquick-mango-juice-concentrate',
	'bula-noni-fiji-islands',
	'cordial-raspberry',
	'cordial-kola',
	'cordial-lime',
] as const;

// Derive ProductSlug union type from the const array
export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

// Define category keys as const array to preserve literal types and derive union type
const CATEGORY_KEYS = [
	'corned-beef',
	'fish-tuna',
	'canned-vegetables',
	'cookies',
	'crackers',
	'snacks',
	'candies',
	'pickles-spices',
	'oils',
	'breakfast-cereal',
	'powders-teas',
	'lamb-goat',
	'sausages',
	'white-meats',
	'root-vegetables',
	'misc-frozen-fresh',
	'drinks',
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
	categoryKey: CategoryKey;
	featured: boolean;
}

export function getProductImageSource(slug: ProductSlug): string {
	return `/images/${slug}.webp`;
}

// Type guard for ProductBase
function isValidProductBase(p: {
	slug: string;
	itemNumber: string;
	unitPerPack: number;
	overallSize: string;
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
