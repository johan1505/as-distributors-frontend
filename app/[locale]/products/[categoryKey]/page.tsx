import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getCategories, getProductsByCategory, isCategoryKey } from '@/lib/products';
import { ProductCatalog } from '@/components/products/ProductCatalog';
import { ProductCatalogSkeleton } from '@/components/products/ProductCatalogSkeleton';
import { PaddingLayout } from '@/components/layout/PaddingLayout';
import { getCanonicalUrl, buildPageMetadata } from '@/lib/site-config';
import { ROUTES } from '@/lib/routes';
import type { BreadcrumbList, CollectionPage, WithContext } from 'schema-dts';
import { JSON_LD_CONSTANTS } from '@/lib/constants';

interface CategoryPageProps {
	params: Promise<{ locale: Locale; categoryKey: string }>;
}

// Generate static params for all categories × locales
export function generateStaticParams() {
	const categories = getCategories();
	return locales.flatMap((locale) =>
		categories.map((categoryKey) => ({
			locale,
			categoryKey,
		}))
	);
}

// Generate SEO metadata
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
	const { locale, categoryKey } = await params;

	if (!isCategoryKey(categoryKey)) {
		return {};
	}

	const tCategorySeo = await getTranslations({
		locale,
		namespace: 'categorySeo',
	});

	return buildPageMetadata({
		title: tCategorySeo(`${categoryKey}.title`),
		description: tCategorySeo(`${categoryKey}.description`),
		keywords: tCategorySeo(`${categoryKey}.keywords`),
		route: `${ROUTES.products}/${categoryKey}`,
		locale,
	});
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { locale, categoryKey } = await params;

	// Validate category key
	if (!isCategoryKey(categoryKey)) {
		notFound();
	}

	setRequestLocale(locale);

	const tCategories = await getTranslations('categories');
	const tCategorySeo = await getTranslations('categorySeo');
	const tBreadcrumb = await getTranslations('breadcrumb');

	const categoryName = tCategories(categoryKey);
	const products = getProductsByCategory(categoryKey);
	const categoryKeys = getCategories();

	const categories = categoryKeys.map((key) => ({
		key,
		label: tCategories(key),
	}));

	// Get category description if available
	const categoryDescription = tCategorySeo(`${categoryKey}.pageDescription`);
	const productsCategoryUrl = getCanonicalUrl(locale, `${ROUTES.products}/${categoryKey}`);

	// JSON-LD structured data with absolute URLs
	const categoryJsonLd: WithContext<CollectionPage> = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: categoryName,
		description: categoryDescription,
		url: productsCategoryUrl,
		isPartOf: {
			'@id': JSON_LD_CONSTANTS.WEBSITE,
		},
		mainEntity: {
			'@type': 'ItemList',
			numberOfItems: products.length,
			itemListElement: products.map((product, index) => ({
				'@type': 'ListItem',
				url: `${productsCategoryUrl}/${product.slug}`,
				position: index + 1,
				item: {
					'@id': JSON_LD_CONSTANTS.PRODUCT(product.categoryKey, product.slug),
				},
			})),
		},
	};

	const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: tBreadcrumb('products'),
				item: getCanonicalUrl(locale, ROUTES.products),
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: categoryName,
				item: getCanonicalUrl(locale, `${ROUTES.products}/${categoryKey}`),
			},
		],
	};

	return (
		<PaddingLayout>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
				dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
			/>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>

			<div className="flex flex-col gap-8">
				{/* Header */}
				<div>
					<h1 className="text-3xl md:text-4xl font-semibold mb-2">{categoryName}</h1>
					<p className="text-muted-foreground max-w-2xl">{categoryDescription}</p>
				</div>

				<Suspense fallback={<ProductCatalogSkeleton />}>
					<ProductCatalog
						selectedCategory={categoryKey}
						products={products}
						categories={categories}
					/>
				</Suspense>
			</div>
		</PaddingLayout>
	);
}
