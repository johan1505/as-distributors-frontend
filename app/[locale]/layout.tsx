import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import { QuoteProvider } from '@/components/quote/QuoteProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AppSidebar, SidebarProvider, SidebarInset } from '@/components/layout/Sidebar';
import { SalesWidget } from '@/components/sales/SalesWidget';
import { getCategories } from '@/lib/products';
import { OrganizationSchema } from '@/components/seo/OrganizationSchema';

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
	const { locale } = await params;

	if (!hasLocale(locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);

	const messages = await getMessages();
	const categories = getCategories();

	return (
		<NextIntlClientProvider messages={messages}>
			<QuoteProvider>
				<SidebarProvider>
					<AppSidebar locale={locale} locales={locales} categories={categories} />
					<SidebarInset>
						<Header />
						<main className="flex-1">
							<OrganizationSchema
								name={messages.site.name}
								description={messages.site.description}
							/>
							{children}
						</main>
						<Footer />
					</SidebarInset>
				</SidebarProvider>
				<SalesWidget />
			</QuoteProvider>
		</NextIntlClientProvider>
	);
}
