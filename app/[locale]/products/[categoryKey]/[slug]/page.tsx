import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
	getAllProductsBase,
	getProductImage,
	getProductBySlug,
	getProductImageSource,
	isProductSlug,
	isCategoryKey,
} from '@/lib/products';
import { locales } from '@/i18n/config';
import { Badge } from '@/components/ui/badge';
import { ProductDetailImage } from '@/components/products/ProductDetailImage';
import { ProductPurchasePanel } from '@/components/products/ProductPurchasePanel';
import { ProductStatusPill } from '@/components/products/ProductStatusPill';
import { hasLocale } from 'next-intl';
import { getCanonicalUrl, BASE_URL, buildPageMetadata } from '@/lib/site-config';
import { ROUTES } from '@/lib/routes';
import type { BreadcrumbList, Product, WithContext } from 'schema-dts';
import { JSON_LD_CONSTANTS } from '@/lib/constants';

interface ProductPageProps {
	params: Promise<{ locale: string; categoryKey: string; slug: string }>;
}

export function generateStaticParams() {
	const products = getAllProductsBase();
	return locales.flatMap((locale) =>
		products.map((product) => ({
			locale,
			categoryKey: product.categoryKey,
			slug: product.slug,
		}))
	);
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
	const { locale, categoryKey, slug } = await params;

	if (!hasLocale(locales, locale)) {
		return { title: 'Language Not Found' };
	}
	if (!isProductSlug(slug) || !isCategoryKey(categoryKey)) {
		return { title: 'Product Not Found' };
	}

	const productBase = getProductBySlug(slug);

	if (!productBase) {
		return { title: 'Product Not Found' };
	}

	const tProducts = await getTranslations({ locale, namespace: 'products' });

	return buildPageMetadata({
		title: tProducts(`${slug}.seoTitle`),
		description: tProducts(`${slug}.seoDescription`),
		keywords: tProducts(`${slug}.seoKeywords`),
		route: `${ROUTES.products}/${categoryKey}/${slug}`,
		locale,
		ogImagePath: getProductImageSource(slug),
		ogImageAlt: tProducts(`${slug}.imageAlt`),
		ogType: 'article',
	});
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { locale, categoryKey, slug } = await params;

	if (!hasLocale(locales, locale)) {
		return notFound();
	}

	setRequestLocale(locale);

	if (!isProductSlug(slug) || !isCategoryKey(categoryKey)) {
		notFound();
	}

	const productBase = getProductBySlug(slug);

	if (!productBase) {
		notFound();
	}

	// Validate that the categoryKey in URL matches the product's actual category
	// With static export, we can't use redirect(), so we just ensure the category matches
	// generateStaticParams should only generate valid combinations, so this is a safety check
	if (productBase.categoryKey !== categoryKey) {
		notFound();
	}

	const t = await getTranslations('product');
	const tProducts = await getTranslations('products');
	const tCategories = await getTranslations('categories');
	const tBreadcrumb = await getTranslations('breadcrumb');

	const name = tProducts(`${slug}.name`);
	const description = tProducts(`${slug}.description`);
	const category = tCategories(productBase.categoryKey);
	const itemNumber = productBase.itemNumber.trim();
	const hasItemNumber = itemNumber.length > 0 && itemNumber.toLowerCase() !== 'tbd';

	const productUrl = getCanonicalUrl(locale, `${ROUTES.products}/${categoryKey}/${slug}`);
	// JSON-LD structured data for SEO with absolute URLs
	const productJsonLd: WithContext<Product> = {
		'@id': JSON_LD_CONSTANTS.PRODUCT(productBase.categoryKey, slug),
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: name,
		description: description,
		image: {
			'@type': 'ImageObject',
			url: `${BASE_URL}${getProductImageSource(slug)}`,
			width: '1200',
			height: '1200',
		},
		sku: productBase.itemNumber,
		category,
		url: productUrl,
		brand: {
			'@type': 'Brand',
			name,
		},
		offers: {
			'@type': 'Offer',
			availability: 'https://schema.org/InStock',
			seller: {
				'@id': JSON_LD_CONSTANTS.ORGANIZATION,
			},
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
				name: category,
				item: getCanonicalUrl(locale, `${ROUTES.products}/${productBase.categoryKey}`),
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: name,
				item: getCanonicalUrl(
					locale,
					`${ROUTES.products}/${productBase.categoryKey}/${productBase.slug}`
				),
			},
		],
	};

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
				dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
			/>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>

			<article className="max-w-7xl m-auto h-full flex justify-center">
				<div className="grid md:gap-8 gap-0 lg:grid-cols-2 md:p-8">
					{/* Product Image */}
					<div className="h-full flex items-center justify-center">
						<ProductDetailImage
							src={getProductImage(slug)}
							alt={tProducts(`${slug}.imageAlt`)}
							ariaLabel={`${t('viewLargerImage')} ${name}`}
						/>
					</div>

					{/* Product Details */}
					<div className="flex flex-col justify-center md:p-0 p-6">
						<h1 className="text-3xl md:text-4xl font-semibold mb-4">{name}</h1>

						<p className="text-lg text-muted-foreground mb-8 leading-relaxed">{description}</p>

						{/* Product specs */}
						<div className="flex flex-wrap gap-2 mb-8">
							{hasItemNumber ? (
								<Badge variant={'secondary'} className="text-sm p-5">
									<span className="text-muted-foreground">{t('itemNumber')}:</span>
									<span className="font-medium">{itemNumber}</span>
								</Badge>
							) : null}
							{productBase.comingSoon ? <ProductStatusPill label={t('comingSoon')} /> : null}
						</div>
						<ProductPurchasePanel
							product={productBase}
							overallSizeLabel={t('overallSize')}
							unitPerPackLabel={t('unitPerPack')}
						/>
					</div>
				</div>
			</article>
		</>
	);
}
