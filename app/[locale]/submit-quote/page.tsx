import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PaddingLayout } from '@/components/layout/PaddingLayout';
import { SubmitQuoteContent } from '@/components/quote/SubmitQuoteContent';
import { locales } from '@/i18n/config';
import { hasLocale, type Locale } from 'next-intl';
import { notFound } from 'next/navigation';
import { getCanonicalUrl, getAlternateLanguages, SITE_NAME, BASE_URL } from '@/lib/site-config';
import { ROUTES } from '@/lib/routes';
import type { WebPage, WithContext } from 'schema-dts';
import { JSON_LD_CONSTANTS } from '@/lib/constants';

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

	const title = t('seoTitle');
	const description = t('seoDescription');
	const keywords = t('seoKeywords');
	const canonicalUrl = getCanonicalUrl(locale, ROUTES.submitQuote);

	return {
		title,
		description,
		keywords: keywords.split(', '),
		alternates: {
			canonical: canonicalUrl,
			languages: getAlternateLanguages(ROUTES.submitQuote, locales),
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
					url: `${BASE_URL}/og-quote.jpg`,
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
			images: [`${BASE_URL}/og-quote.jpg`],
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

export default async function SubmitQuotePage({ params }: SubmitQuotePageProps) {
	const { locale } = await params;

	if (!hasLocale(locales, locale)) {
		return notFound();
	}

	setRequestLocale(locale);

	const tQuote = await getTranslations('quote.submitPage');

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

			<SubmitQuoteContent />
		</PaddingLayout>
	);
}
