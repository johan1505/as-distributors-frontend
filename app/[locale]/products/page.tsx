import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from 'next-intl';
import { getAllProductsBase, getCategories, getCategoryImage } from '@/lib/products';
import { ProductCatalog } from '@/components/products/ProductCatalog';
import { ProductCatalogSkeleton } from '@/components/products/ProductCatalogSkeleton';
import { PaddingLayout } from '@/components/layout/PaddingLayout';
import { QuoteSuccessBanner } from '@/components/quote/QuoteSuccessBanner';
import { locales } from '@/i18n/config';
import { getCanonicalUrl, getAlternateLanguages, SITE_NAME, BASE_URL } from '@/lib/site-config';
import { ROUTES } from '@/lib/routes';
import { JSON_LD_CONSTANTS } from '@/lib/constants';
import type { CollectionPage, WithContext } from 'schema-dts';

interface CatalogPageProps {
	params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: CatalogPageProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'catalog' });

	const title = t('seoTitle');
	const description = t('seoDescription');
	const keywords = t('seoKeywords');
	const canonicalUrl = getCanonicalUrl(locale, ROUTES.products);

	return {
		title,
		description,
		keywords: keywords.split(', '),
		alternates: {
			canonical: canonicalUrl,
			languages: getAlternateLanguages(ROUTES.products, locales),
		},
		openGraph: {
			title,
			description,
			url: canonicalUrl,
			siteName: SITE_NAME,
			locale,
			type: 'website',
			images: [
				{
					url: `${BASE_URL}/og-products.jpg`,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [`${BASE_URL}/og-products.jpg`],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
	};
}

export default async function CatalogPage({ params }: CatalogPageProps) {
	const { locale } = await params;
	setRequestLocale(locale);

	const tCatalog = await getTranslations('catalog');
	const tCategories = await getTranslations('categories');

	const allProductsBase = getAllProductsBase();
	const categoryKeys = getCategories();

	const categories = categoryKeys.map((key) => ({
		key,
		label: tCategories(key),
		imageUrl: getCategoryImage(key),
	}));

	// JSON-LD structured data for the product catalog
	const catalogJsonLd: WithContext<CollectionPage> = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: tCatalog('title'),
		description: tCatalog('description'),
		url: getCanonicalUrl(locale, ROUTES.products),
		isPartOf: {
			'@id': JSON_LD_CONSTANTS.WEBSITE,
		},
		mainEntity: {
			'@type': 'ItemList',
			numberOfItems: categories.length,
			itemListElement: categories.map((category, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				item: {
					'@type': 'ProductGroup',
					name: category.label,
					url: getCanonicalUrl(locale, `${ROUTES.products}/${category.key}`),
				},
			})),
		},
	};

	return (
		<PaddingLayout>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
				dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
			/>

			<div className="flex flex-col gap-6 w-full">
				<Suspense fallback={null}>
					<QuoteSuccessBanner />
				</Suspense>

				<div>
					<h1 className="text-3xl md:text-4xl font-semibold mb-2">{tCatalog('title')}</h1>
					<p className="text-muted-foreground">{tCatalog('description')}</p>
				</div>

				<Suspense fallback={<ProductCatalogSkeleton />}>
					<ProductCatalog
						products={allProductsBase}
						categories={categories}
						selectedCategory="all"
					/>
				</Suspense>
			</div>
		</PaddingLayout>
	);
}
