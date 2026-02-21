/**
 * Site configuration for SEO and metadata
 * Replace BASE_URL with the production URL when deploying
 */

import type { Metadata } from 'next';
import { locales } from '@/i18n/config';

// TODO: Placeholder base URL - replace with production URL when known
export const BASE_URL = 'https://asdistributors.com';

// Site metadata constants
export const SITE_NAME = 'A & S Distributors';

/**
 * Generate an absolute URL from a path
 * @param path - The path to append to the base URL (should start with /)
 * @returns The absolute URL
 */
export function getAbsoluteUrl(path: string): string {
	// Ensure path starts with /
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return `${BASE_URL}${normalizedPath}`;
}

/**
 * Generate alternate language URLs for a given path
 * @param path - The path without locale prefix
 * @param locales - Array of supported locales
 * @returns Object with locale codes as keys and absolute URLs as values
 */
export function getAlternateLanguages(
	path: string,
	locales: readonly string[]
): Record<string, string> {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return locales.reduce<Record<string, string>>((acc, locale) => {
		acc[locale] = `${BASE_URL}/${locale}${normalizedPath}`;
		return acc;
	}, {});
}

/**
 * Generate canonical URL for a given locale and path
 * @param locale - The current locale
 * @param path - The path without locale prefix
 * @returns The canonical absolute URL
 */
export function getCanonicalUrl(locale: string, path: string): string {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return `${BASE_URL}/${locale}${normalizedPath}`;
}

const OG_TITLE_MAX_LENGTH = 60;
const OG_DESCRIPTION_MAX_LENGTH = 160;

function truncateAtWordBoundary(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	const truncated = text.slice(0, maxLength - 1);
	const lastSpace = truncated.lastIndexOf(' ');
	if (lastSpace > maxLength * 0.5) {
		return `${truncated.slice(0, lastSpace)}…`;
	}
	return `${truncated}…`;
}

export function truncateOgTitle(title: string): string {
	return truncateAtWordBoundary(title, OG_TITLE_MAX_LENGTH);
}

export function truncateOgDescription(description: string): string {
	return truncateAtWordBoundary(description, OG_DESCRIPTION_MAX_LENGTH);
}

export interface PageMetadataOptions {
	title: string;
	description: string;
	keywords: string;
	route: string;
	locale: string;
	ogImagePath?: string;
	ogImageAlt?: string;
	ogType?: 'website' | 'article';
}

const DEFAULT_OG_IMAGE_PATH = '/images/as-distributors-og.webp';

export function buildPageMetadata({
	title,
	description,
	keywords,
	route,
	locale,
	ogImagePath = DEFAULT_OG_IMAGE_PATH,
	ogImageAlt,
	ogType = 'website',
}: PageMetadataOptions): Metadata {
	const canonicalUrl = getCanonicalUrl(locale, route);
	const truncatedTitle = truncateOgTitle(title);
	const truncatedDescription = truncateOgDescription(description);
	const ogImageUrl = `${BASE_URL}${ogImagePath.startsWith('/') ? '' : '/'}${ogImagePath}`;

	return {
		title,
		description,
		keywords: keywords.split(', '),
		alternates: {
			canonical: canonicalUrl,
			languages: getAlternateLanguages(route, locales),
		},
		openGraph: {
			title: truncatedTitle,
			description: truncatedDescription,
			url: canonicalUrl,
			siteName: SITE_NAME,
			locale,
			type: ogType,
			images: [
				{
					url: ogImageUrl,
					width: 1200,
					height: 630,
					alt: ogImageAlt ?? title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: truncatedTitle,
			description: truncatedDescription,
			images: [ogImageUrl],
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
