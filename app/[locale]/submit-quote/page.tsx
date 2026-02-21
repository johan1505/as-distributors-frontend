import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PaddingLayout } from '@/components/layout/PaddingLayout';
import { SubmitQuoteContent } from '@/components/quote/SubmitQuoteContent';
import { locales } from '@/i18n/config';
import { hasLocale, type Locale } from 'next-intl';
import { notFound } from 'next/navigation';
import { getCanonicalUrl, buildPageMetadata } from '@/lib/site-config';
import { ROUTES } from '@/lib/routes';
import type { WebPage, WithContext } from 'schema-dts';
import { JSON_LD_CONSTANTS } from '@/lib/constants';
import enMessages from '@/messages/en.json';
import { PRODUCT_SLUGS, type ProductSlug } from '@/lib/products';

interface SubmitQuotePageProps {
	params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: SubmitQuotePageProps): Promise<Metadata> {
	const { locale } = await params;

	if (!hasLocale(locales, locale)) {
		const tSite = await getTranslations({ locale: 'en', namespace: 'site' });
		return { title: tSite('pageNotFound') };
	}

	const t = await getTranslations({ locale, namespace: 'quote.submitPage' });

	return buildPageMetadata({
		title: t('seoTitle'),
		description: t('seoDescription'),
		keywords: t('seoKeywords'),
		route: ROUTES.submitQuote,
		locale,
	});
}

export default async function SubmitQuotePage({ params }: SubmitQuotePageProps) {
	const { locale } = await params;

	if (!hasLocale(locales, locale)) {
		return notFound();
	}

	setRequestLocale(locale);

	const tQuote = await getTranslations('quote.submitPage');

	const productSlugToNameMapInEnglish: Record<ProductSlug, string> = PRODUCT_SLUGS.reduce(
		(acc, slug) => {
			const product = enMessages.products[slug];
			acc[slug] = product?.name ?? slug;
			return acc;
		},
		{} as Record<ProductSlug, string>
	);

	const submitQuoteUrl = getCanonicalUrl(locale, ROUTES.submitQuote);

	// JSON-LD for contact/quote page
	const submitQuoteJsonLd: WithContext<WebPage> = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: tQuote('title'),
		description: tQuote('seoDescription'),
		url: getCanonicalUrl(locale, ROUTES.submitQuote),
		mainEntity: {
			'@type': 'Service',
			name: tQuote('title'),
			provider: {
				'@id': JSON_LD_CONSTANTS.ORGANIZATION,
			},
			potentialAction: {
				'@type': 'QuoteAction',
				target: submitQuoteUrl,
				result: {
					'@type': 'QuoteAction',
					name: tQuote('seoDescription'),
				},
			},
		},
	};

	return (
		<PaddingLayout>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
				dangerouslySetInnerHTML={{ __html: JSON.stringify(submitQuoteJsonLd) }}
			/>

			<SubmitQuoteContent productSlugToNameMapInEnglish={productSlugToNameMapInEnglish} />
		</PaddingLayout>
	);
}
