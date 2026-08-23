import type { StaticImageData } from 'next/image';
import productsData from '@/data/products.json';
import { PRODUCT_IMAGE_BY_SLUG, PRODUCT_IMAGE_PATH_BY_SLUG } from '@/lib/product-images';

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
	'old-capital-special-tuna',
	'sun-bell-tuna',
	'wahoo-lapana',
	'ovalau-blue-tuna',
	'fish-kawa-kawa',
	'fish-kawa-kawa-steak-slices',
	'ulavi-parrot-fish',
	'unicorn-ta',
	'kawango',
	'chaokoh-coconut-milk',
	'pacific-taste-coconut-milk-13oz',
	'pacific-taste-coconut-milk-98oz',
	'pacific-crown-fiji-coconut-cream',
	'pacific-crown-tahitian-chestnut',
	'palusami-taro-leaves',
	'pacific-crown-duruka-stalk-brine',
	'pacific-crown-breadfruit',
	'watties-spaghetti-tomato-sauce',
	'watties-baked-beans-tomato-sauce',
	'tim-tam-extra-chocolate',
	'tim-tam-chewy-caramel',
	'tim-tam-dark-chocolate',
	'tim-tam-mint',
	'tim-tam-original',
	'milk-arrowroot',
	'monte-carlo',
	'delta-cream',
	'scotch-finger',
	'shortbread-cream',
	'shortbread-plain',
	'punjas-milk-arrowroot',
	'punjas-scotch-finger',
	'punjas-breakfast-crackers-375g',
	'punjas-breakfast-crackers-2kg',
	'fmf-milk-arrowroot',
	'fmf-peanut-cookies',
	'fmf-choc-chip-cookies',
	'fmf-coconut-cookies',
	'big-sister-light-fruit-cake',
	'big-sister-dark-fruit-cake',
	'fmf-flour',
	'arnotts-sao-cracker',
	'arnotts-kingston',
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
	'guru-lucky-thin-sev',
	'guru-lucky-muruku',
	'guru-lucky-chili-peanuts',
	'guru-lucky-hot-mix',
	'guru-lucky-mix-bhuja',
	'guru-lucky-hot-fiji-mix',
	'guru-lucky-fiji-mix',
	'guru-lucky-spicy-garlic-peas',
	'guru-lucky-peas-peanuts',
	'guru-lucky-cornflakes-chewra',
	'guru-lucky-lakhri-meethai',
	'bongo-cheese-snack-156gr',
	'bongo-cheese-snack-64gr',
	'bongo-cheese-snack-28gr',
	'bongo-chicken-snack-156gr',
	'bongo-chicken-snack-64gr',
	'bongo-chicken-snack-28gr',
	'twistes-cheese-20gr',
	'twistes-cheese-100gr',
	'twistes-cheese-250gr',
	'twistes-cheese-500gr',
	'twistes-sour-cream-100gr',
	'twistes-sour-cream-250gr',
	'twistes-chicken-20gr',
	'twistes-chicken-100gr',
	'twistes-chicken-250gr',
	'twistes-chicken-500gr',
	'ufo-burger-20gr',
	'ufo-burger-100gr',
	'ufo-burger-200gr',
	'jasons-peanut-ruffs-28gr',
	'jasons-peanut-ruffs-64gr',
	'jasons-peanut-ruffs-156gr',
	'fmf-chow-tomato-flavour',
	'fmf-chow-chicken-flavour',
	'fmf-chow-curry-flavour',
	'maggi-noodles-chicken-flavour',
	'maggi-noodles-curry-flavour',
	'cadbury-crunchie-bars',
	'cadbury-dream-bars',
	'cadbury-fruit-nut',
	'cadbury-dairy-milk-bar',
	'homemaid-amra-pickles',
	'homemaid-kamrak-star-pickle-apple',
	'homemaid-kutchla-hot-mango-chutney',
	'homemaid-mango',
	'homemaid-tamarind-chutney',
	'homemaid-bongo-chili',
	'homemaid-sweet-mango-pickle',
	'pacific-choice-curry-powder-mild',
	'pacific-choice-curry-powder-hot',
	'punjas-curry-powder',
	'punjas-haldi-powder-turmeric',
	'punjas-hot-masala-17-64oz',
	'punjas-hot-masala-2-20lbs',
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
	'anchor-butter-new-zealand',
	'kraft-cheddar-cheese',
	'punja-red-cow-milk-powder',
	'rewa-full-cream-milk-powder',
	'weetbix-breakfast-cereal-13oz',
	'weetbix-breakfast-cereal-20oz',
	'weetbix-breakfast-cereal-2lb',
	'fufu-mix-plantain-flour',
	'fufu-mix-cocoyam-flour',
	'edmonds-custard-powder',
	'milo-powder-singapore-14oz',
	'milo-powder-singapore-3lb',
	'kava-lawena-powder',
	'kava-waka-powder',
	'nestle-cocoa',
	'punjas-ceylon-black-tea-200gr',
	'punjas-ceylon-black-tea-500g',
	'punjas-tea-masala',
	'lamb-shoulder-whole',
	'lamb-shoulder-chops',
	'lamb-shoulder-chops-prepack',
	'lamb-neck-whole',
	'lamb-neck-sliced',
	'lamb-neck-sliced-prepack',
	'lamb-leg-whole',
	'lamb-leg-sliced-prepack',
	'lamb-flap-whole',
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
	'fresh-taro',
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
	'tuckers-blitz',
	'tucker-blitz-bars',
	'tuckers-passion-fruit',
	'tuckers-triple-ripple',
	'kool-pop',
	'bula-pop',
	'pacific-split',
	'bula-noni-fiji-islands',
	'pops-pineapple-2-5l',
	'pops-kola-2-5l',
	'pops-orange-2-5l',
	'pops-lime-2-5l',
	'pops-raspberry-2-5l',
	'pops-cordial-raspberry-1l',
	'pops-cordial-pineapple-1l',
	'pops-cordial-kola-1l',
	'pops-cordial-lime-1l',
	'pops-cordial-orange-1l',
	'pops-raspberry-can-355ml',
	'pops-pineapple-can-355ml',
	'pops-lime-can-355ml',
	'pops-kola-can-355ml',
	'pops-orange-can-355ml',
	'sunquick-tropical-juice-concentrate',
	'sunquick-orange-juice-concentrate',
	'sunquick-mango-juice-concentrate',
	'nestle-smarties-50g',
	'nestle-milkybar-classic',
	'nestle-kitkat-chunky-milo-165g',
	'jasons-black-hacks-150g',
	'jasons-clear-mints-150g',
] as const;

// Derive ProductSlug union type from the const array
export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

// Define category keys as const array to preserve literal types and derive union type
const CATEGORY_KEYS = [
	'fresh-produce',
	'corned-beef',
	'canned-fish-tuna',
	'frozen-fish',
	'canned-vegetables',
	'cookies-crackers',
	'snacks',
	'snacks-guru-lucky',
	'chips',
	'noodles',
	'candies',
	'pickles-spices',
	'oils',
	'dairy',
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
	unitPerPack: number | string;
	overallSize: string;
	categoryKey: CategoryKey;
	featured: boolean;
	comingSoon?: boolean;
}

export type ProductCriterionKey = 'size' | 'cut' | 'type';

export interface ProductSubtypeOption {
	value: string;
	label: string;
	overallSize?: string;
	unitPerPack?: number | string;
	showUnitPerPack?: boolean;
}

export interface ProductSubtypeConfig {
	criterionKey: ProductCriterionKey;
	defaultOptionValue: string;
	options: ProductSubtypeOption[];
}

const PRODUCT_SUBTYPE_CONFIG_BY_SLUG: Partial<Record<ProductSlug, ProductSubtypeConfig>> = {
	'lamb-shoulder-chops': {
		criterionKey: 'cut',
		defaultOptionValue: 'BBQ',
		options: [
			{ value: 'BBQ', label: 'BBQ' },
			{ value: 'Regular', label: 'Regular' },
		],
	},
	'lamb-shoulder-chops-prepack': {
		criterionKey: 'cut',
		defaultOptionValue: 'BBQ',
		options: [
			{ value: 'BBQ', label: 'BBQ' },
			{ value: 'Regular', label: 'Regular' },
			{ value: 'Curry', label: 'Curry' },
		],
	},
	'pink-taro': {
		criterionKey: 'size',
		defaultOptionValue: '1kg',
		options: [
			{
				value: '1kg',
				label: '1kg',
				overallSize: '1 kg (2.20 lb)',
				unitPerPack: 10,
			},
			{
				value: '2.27kg',
				label: '2.27 kg',
				overallSize: '2.27 kg (5 lb)',
				unitPerPack: 6,
			},
		],
	},
	'cadbury-dream-bars': {
		criterionKey: 'size',
		defaultOptionValue: '50g',
		options: [
			{
				value: '50g',
				label: '50 g',
				overallSize: '50 g',
				unitPerPack: 42,
			},
			{
				value: '180g',
				label: '180 g',
				overallSize: '180 g',
				unitPerPack: 16,
			},
		],
	},
	'cadbury-fruit-nut': {
		criterionKey: 'size',
		defaultOptionValue: '50g',
		options: [
			{
				value: '50g',
				label: '50 g',
				overallSize: '50 g',
				unitPerPack: 42,
			},
			{
				value: '180g',
				label: '180 g',
				overallSize: '180 g',
				unitPerPack: 16,
			},
		],
	},
	'cadbury-dairy-milk-bar': {
		criterionKey: 'size',
		defaultOptionValue: '50g',
		options: [
			{
				value: '50g',
				label: '50 g',
				overallSize: '50 g',
				unitPerPack: 42,
			},
			{
				value: '180g',
				label: '180 g',
				overallSize: '180 g',
				unitPerPack: 16,
			},
		],
	},
	'sun-bell-tuna': {
		criterionKey: 'type',
		defaultOptionValue: 'Oil',
		options: [
			{ value: 'Oil', label: 'Oil' },
			{ value: 'Chilli Oil', label: 'Chilli Oil' },
		],
	},
};

interface ProductDisplayOverrides {
	showUnitPerPack?: boolean;
}

const PRODUCT_DISPLAY_OVERRIDES_BY_ITEM_NUMBER: Record<string, ProductDisplayOverrides> = {
	'120': {
		showUnitPerPack: false,
	},
	'121': {
		showUnitPerPack: false,
	},
	'122': {
		showUnitPerPack: false,
	},
	'123': {
		showUnitPerPack: false,
	},
	'124': {
		showUnitPerPack: false,
	},
};

export function getProductImageSource(slug: ProductSlug): string {
	return PRODUCT_IMAGE_PATH_BY_SLUG[slug] ?? `/images/${slug}.webp`;
}

export function getProductImage(slug: ProductSlug): StaticImageData | string {
	return PRODUCT_IMAGE_BY_SLUG[slug] ?? getProductImageSource(slug);
}

export function getProductSubtypeConfig(
	product: Pick<ProductBase, 'slug'>
): ProductSubtypeConfig | undefined {
	return PRODUCT_SUBTYPE_CONFIG_BY_SLUG[product.slug];
}

export function getProductSubtypeOption(
	product: Pick<ProductBase, 'slug'>,
	value?: string
): ProductSubtypeOption | undefined {
	const config = getProductSubtypeConfig(product);
	if (!config) {
		return undefined;
	}

	if (!value) {
		return (
			config.options.find((option) => option.value === config.defaultOptionValue) ??
			config.options[0]
		);
	}

	return (
		config.options.find((option) => option.value === value) ??
		config.options.find((option) => option.value === config.defaultOptionValue) ??
		config.options[0]
	);
}

export function getProductDisplaySpecs(
	product: Pick<ProductBase, 'slug' | 'itemNumber' | 'overallSize' | 'unitPerPack'>,
	subtypeValue?: string
): { overallSize: string; unitPerPack: number | string; showUnitPerPack: boolean } {
	const subtypeOption = getProductSubtypeOption(product, subtypeValue);
	const displayOverrides = PRODUCT_DISPLAY_OVERRIDES_BY_ITEM_NUMBER[product.itemNumber];

	return {
		overallSize: subtypeOption?.overallSize ?? product.overallSize,
		unitPerPack: subtypeOption?.unitPerPack ?? product.unitPerPack,
		showUnitPerPack: subtypeOption?.showUnitPerPack ?? displayOverrides?.showUnitPerPack ?? true,
	};
}

// Type guard for ProductBase
function isValidProductBase(p: {
	slug: string;
	itemNumber: string;
	unitPerPack: number | string;
	overallSize: string;
	categoryKey: string;
	featured: boolean;
	comingSoon?: boolean;
}): p is ProductBase {
	return isProductSlug(p.slug) && isCategoryKey(p.categoryKey);
}

export function getAllProductsBase(): ProductBase[] {
	// Validate that all products have valid slugs (type-safe without casts)
	return productsData.filter(isValidProductBase) as ProductBase[];
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
	const categories = new Set<CategoryKey>(getAllProductsBase().map((p) => p.categoryKey));
	return CATEGORY_KEYS.filter((key) => categories.has(key));
}

const ITEM_NUMBER_SORTED_CATEGORIES = new Set<CategoryKey>(['canned-fish-tuna', 'lamb-goat']);

export function getProductsByCategory(categoryKey: CategoryKey): ProductBase[] {
	const products = getAllProductsBase().filter((p) => p.categoryKey === categoryKey);
	const sortByItemNumber = (a: ProductBase, b: ProductBase): number => {
		const aNumber = Number.parseInt(a.itemNumber, 10);
		const bNumber = Number.parseInt(b.itemNumber, 10);

		if (Number.isNaN(aNumber) && Number.isNaN(bNumber)) return 0;
		if (Number.isNaN(aNumber)) return 1;
		if (Number.isNaN(bNumber)) return -1;
		return aNumber - bNumber;
	};

	if (ITEM_NUMBER_SORTED_CATEGORIES.has(categoryKey)) {
		return products.slice().sort(sortByItemNumber);
	}

	if (categoryKey === 'cookies-crackers') {
		const arnottsSlugs = new Set([
			'milk-arrowroot',
			'monte-carlo',
			'delta-cream',
			'scotch-finger',
			'shortbread-cream',
			'shortbread-plain',
			'arnotts-sao-cracker',
			'arnotts-kingston',
		]);

		return products.slice().sort((a, b) => {
			const rank = (product: ProductBase): number => {
				if (product.slug.startsWith('tim-tam-')) return 0;
				if (arnottsSlugs.has(product.slug)) return 1;
				if (product.slug.startsWith('fmf-')) return 2;
				if (product.slug.startsWith('punjas-')) return 3;
				if (product.slug.startsWith('big-sister-')) return 4;
				return 5;
			};

			const aRank = rank(a);
			const bRank = rank(b);
			if (aRank !== bRank) return aRank - bRank;

			return sortByItemNumber(a, b);
		});
	}

	return products;
}
