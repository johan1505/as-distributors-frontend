import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/site-config';

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		host: BASE_URL,
		sitemap: `${BASE_URL}/sitemap.xml`,
	};
}
