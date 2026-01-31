/**
 * Site configuration for SEO and metadata
 * Replace BASE_URL with the production URL when deploying
 */

// Placeholder base URL - replace with production URL when known
export const BASE_URL = 'https://pacificislanderfoods.com';

// Site metadata constants
export const SITE_NAME = 'Pacific Islander Foods';

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
