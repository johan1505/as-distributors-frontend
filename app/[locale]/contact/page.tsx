import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PaddingLayout } from '@/components/layout/PaddingLayout';
import { locales } from '@/i18n/config';
import { hasLocale, type Locale } from 'next-intl';
import { notFound } from 'next/navigation';
import { Phone, Mail, Building2, ArrowUpRight } from 'lucide-react';
import { MailingAddressCard } from '@/components/contact/MailingAddressCard';
import { getCanonicalUrl, buildPageMetadata } from '@/lib/site-config';
import { ROUTES } from '@/lib/routes';
import type { WebPage, WithContext } from 'schema-dts';
import { JSON_LD_CONSTANTS, CONTACT, SALES_EMAIL } from '@/lib/constants';

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

	return buildPageMetadata({
		title: t('seoTitle'),
		description: t('seoDescription'),
		keywords: t('seoKeywords'),
		route: ROUTES.contact,
		locale,
	});
}

export default async function ContactPage({ params }: ContactPageProps) {
	const { locale } = await params;

	if (!hasLocale(locales, locale)) {
		return notFound();
	}

	setRequestLocale(locale);

	const t = await getTranslations('contact');
	const tSales = await getTranslations('sales');
	const contactUrl = getCanonicalUrl(locale, ROUTES.contact);
	const address = CONTACT.ADDRESS;
	const phoneNumber = CONTACT.TELEPHONE;
	const primaryEmail = SALES_EMAIL.PRIMARY;
	const alternateEmail = SALES_EMAIL.ALTERNATE;
	const mailingAddress = t('mailingAddress.value');

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

			<div className="max-w-xl mx-auto">
				{/* Header */}
				<div className="mb-12 text-center">
					<h1 className="text-3xl md:text-4xl font-semibold mb-3">{t('title')}</h1>
					<p className="text-muted-foreground">{t('description')}</p>
				</div>

				{/* Contact Information */}
				<div className="space-y-8">
					{/* Phone */}
					<div className="py-4 border-b border-border/50">
						<div className="flex items-center gap-4">
							<div className="size-10 rounded-full bg-muted flex items-center justify-center">
								<Phone className="size-4 text-muted-foreground" />
							</div>
							<div className="flex-1">
								<p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
									{t('phone.label')}
								</p>
								<div className="space-y-1">
									<a
										href={`tel:${phoneNumber}`}
										className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-ocean transition-colors"
										aria-label={t('phone.ariaLabel', { phone: phoneNumber })}
									>
										<span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
											{tSales('phoneMainLabel')}
										</span>
										<span className="font-normal">{phoneNumber}</span>
									</a>
									<a
										href={`tel:${CONTACT.ALTERNATE_TELEPHONE}`}
										className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-ocean transition-colors"
										aria-label={t('phone.ariaLabel', { phone: CONTACT.ALTERNATE_TELEPHONE })}
									>
										<span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
											{tSales('phoneAltLabel')}
										</span>
										<span className="font-normal">{CONTACT.ALTERNATE_TELEPHONE}</span>
									</a>
								</div>
							</div>
						</div>
					</div>

					{/* Email */}
					<div className="py-4 border-b border-border/50">
						<div className="flex items-center gap-4">
							<div className="size-10 rounded-full bg-muted flex items-center justify-center">
								<Mail className="size-4 text-muted-foreground" />
							</div>
							<div className="flex-1">
								<p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
									{t('email.label')}
								</p>
								<div className="space-y-1">
									<a
										href={`mailto:${primaryEmail}`}
										className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-ocean transition-colors"
										aria-label={t('email.ariaLabel', { email: primaryEmail })}
									>
										<span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
											{tSales('emailGeneralLabel')}
										</span>
										<span className="font-normal">{primaryEmail}</span>
									</a>
									<a
										href={`mailto:${alternateEmail}`}
										className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-ocean transition-colors"
										aria-label={t('email.ariaLabel', { email: alternateEmail })}
									>
										<span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
											{tSales('emailJudyLabel')}
										</span>
										<span className="font-normal">{alternateEmail}</span>
									</a>
								</div>
							</div>
						</div>
					</div>

					{/* Mailing Address */}
					<MailingAddressCard address={mailingAddress} />
					{/* Warehouse Address */}
					<a
						href={googleMapsUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-4 py-4 border-b border-border/50 hover:border-ocean/30 transition-colors"
						aria-label={t('address.ariaLabel', { address: fullAddress })}
					>
						<div className="size-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-ocean/10 transition-colors">
							<Building2 className="size-4 text-muted-foreground group-hover:text-ocean transition-colors" />
						</div>
						<div>
							<p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
								{t('address.label')}
							</p>
							<address className="not-italic font-medium group-hover:text-ocean transition-colors">
								{address.street}, {address.city}, {address.state} {address.zipCode}
							</address>
						</div>
						<ArrowUpRight className="size-4 text-muted-foreground group-hover:text-ocean transition-colors" />
					</a>
				</div>
			</div>
		</PaddingLayout>
	);
}
