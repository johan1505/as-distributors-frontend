import type { MetadataRoute } from 'next';
import { getCanonicalUrl } from '@/lib/site-config';
import { locales } from '@/i18n/config';
import { ROUTES } from '@/lib/routes';
import { getAllProductsBase, getCategories } from '@/lib/products';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();
	const sitemapEntries: MetadataRoute.Sitemap = [];

	// Get all products and categories dynamically
	const allProducts = getAllProductsBase();
	const allCategories = getCategories();

	// Generate entries for each locale
	for (const locale of locales) {
		// Home page
		sitemapEntries.push({
			url: getCanonicalUrl(locale, ROUTES.home),
			lastModified: now,
			changeFrequency: 'yearly',
			priority: 1.0,
		});

		// Products catalog page
		sitemapEntries.push({
			url: getCanonicalUrl(locale, ROUTES.products),
			lastModified: now,
			changeFrequency: 'yearly',
			priority: 0.9,
		});

		// Category pages - iterate through all categories dynamically
		for (const categoryKey of allCategories) {
			sitemapEntries.push({
				url: getCanonicalUrl(locale, `${ROUTES.products}/${categoryKey}`),
				lastModified: now,
				changeFrequency: 'yearly',
				priority: 0.8,
			});
		}

		// Product pages - iterate through all products dynamically
		for (const product of allProducts) {
			sitemapEntries.push({
				url: getCanonicalUrl(locale, `${ROUTES.products}/${product.categoryKey}/${product.slug}`),
				lastModified: now,
				changeFrequency: 'yearly',
				priority: 0.7,
			});
		}

		// Contact page
		sitemapEntries.push({
			url: getCanonicalUrl(locale, ROUTES.contact),
			lastModified: now,
			changeFrequency: 'yearly',
			priority: 0.6,
		});

		// Submit quote page
		sitemapEntries.push({
			url: getCanonicalUrl(locale, ROUTES.submitQuote),
			lastModified: now,
			changeFrequency: 'yearly',
			priority: 0.5,
		});
	}

	return sitemapEntries;
}
