import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PaddingLayout } from '@/components/layout/PaddingLayout';
import { locales } from '@/i18n/config';
import { hasLocale, type Locale } from 'next-intl';
import { notFound } from 'next/navigation';
import { Phone, Mail, MapPin } from 'lucide-react';
import { getCanonicalUrl, getAlternateLanguages, SITE_NAME, BASE_URL } from '@/lib/site-config';
import { ROUTES } from '@/lib/routes';
import type { WebPage, WithContext } from 'schema-dts';
import { JSON_LD_CONSTANTS } from '@/lib/constants';
import { CONTANCT } from '@/lib/constants';

interface ContactPageProps {
	params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
	const { locale } = await params;

	if (!hasLocale(locales, locale)) {
		const tSite = await getTranslations({ locale: 'en', namespace: 'site' });
		return { title: tSite('pageNotFound') };
	}

	const t = await getTranslations({ locale, namespace: 'contact' });

	const title = t('seoTitle');
	const description = t('seoDescription');
	const keywords = t('seoKeywords');
	const canonicalUrl = getCanonicalUrl(locale, ROUTES.contact);

	return {
		title,
		description,
		keywords: keywords.split(', '),
		alternates: {
			canonical: canonicalUrl,
			languages: getAlternateLanguages(ROUTES.contact, locales),
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
					url: `${BASE_URL}/og-contact.jpg`,
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
			images: [`${BASE_URL}/og-contact.jpg`],
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

export default async function ContactPage({ params }: ContactPageProps) {
	const { locale } = await params;

	if (!hasLocale(locales, locale)) {
		return notFound();
	}

	setRequestLocale(locale);

	const t = await getTranslations('contact');
	const contactUrl = getCanonicalUrl(locale, ROUTES.contact);
	const address = CONTANCT.ADDRESS;
	const phoneNumber = CONTANCT.TELEPHONE;
	const emailAddress = CONTANCT.EMAIL;

	// Create Google Maps URL
	const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;
	const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
		fullAddress
	)}`;

	// JSON-LD for contact page
	const contactPageJsonLd: WithContext<WebPage> = {
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		name: t('title'),
		description: t('seoDescription'),
		url: contactUrl,
		mainEntity: {
			'@id': JSON_LD_CONSTANTS.ORGANIZATION,
		},
	};

	return (
		<PaddingLayout>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
				dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
			/>

			<div className="max-w-2xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl md:text-4xl font-semibold mb-2">{t('title')}</h1>
					<p className="text-lg text-muted-foreground">{t('description')}</p>
				</div>

				{/* Contact Information List */}
				<dl className="space-y-6 bg-ocean-muted/30 rounded-2xl p-6 border border-ocean/10">
					{/* Phone */}
					<div>
						<dt className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
							{t('phone.label')}
						</dt>
						<dd>
							<a
								href={`tel:${phoneNumber}`}
								className="font-medium text-ocean hover:text-ocean-light underline inline-flex items-center gap-2 transition-colors"
								aria-label={t('phone.ariaLabel', { phone: phoneNumber })}
							>
								<Phone className="size-4" />
								{phoneNumber}
							</a>
						</dd>
					</div>

					{/* Email */}
					<div>
						<dt className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
							{t('email.label')}
						</dt>
						<dd>
							<a
								href={`mailto:${emailAddress}`}
								className="font-medium text-ocean hover:text-ocean-light underline inline-flex items-center gap-2 transition-colors"
								aria-label={t('email.ariaLabel', { email: emailAddress })}
							>
								<Mail className="size-4" />
								{emailAddress}
							</a>
						</dd>
					</div>

					{/* Address */}
					<div>
						<dt className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
							{t('address.label')}
						</dt>
						<dd>
							<a
								href={googleMapsUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium text-ocean hover:text-ocean-light underline inline-flex items-center gap-2 transition-colors"
								aria-label={t('address.ariaLabel', { address: fullAddress })}
							>
								<MapPin className="size-4" />
								<address className="not-italic">
									{address.street} {address.city}, {address.state} {address.zipCode}
								</address>
							</a>
						</dd>
					</div>
				</dl>
			</div>
		</PaddingLayout>
	);
}
