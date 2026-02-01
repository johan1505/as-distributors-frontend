import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight, Heart, Shield, Handshake, Clock, Fish, Beef, Leaf } from 'lucide-react';
import { getFeaturedProducts } from '@/lib/products';
import type { Locale } from 'next-intl';
import { ProductCard } from '@/components/products/ProductCard';
import { locales } from '@/i18n/config';
import { getCanonicalUrl, getAlternateLanguages, SITE_NAME, BASE_URL } from '@/lib/site-config';
import { ROUTES } from '@/lib/routes';

interface HomePageProps {
	params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'site' });

	const title = t('title');
	const description = t('description');
	const keywords = t('keywords');
	const canonicalUrl = getCanonicalUrl(locale, ROUTES.home);

	return {
		title,
		description,
		keywords: keywords.split(', '),
		alternates: {
			canonical: canonicalUrl,
			languages: getAlternateLanguages(ROUTES.home, locales),
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
					url: `${BASE_URL}/og-home.jpg`,
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
			images: [`${BASE_URL}/og-home.jpg`],
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

export default async function HomePage({ params }: HomePageProps) {
	const { locale } = await params;
	setRequestLocale(locale);

	const t = await getTranslations('home');
	const tNav = await getTranslations('nav');
	const featuredProductsBase = getFeaturedProducts();

	const values = [
		{
			icon: Heart,
			title: t('values.concern.title'),
			description: t('values.concern.description'),
			color: 'primary' as const,
		},
		{
			icon: Shield,
			title: t('values.confidence.title'),
			description: t('values.confidence.description'),
			color: 'ocean' as const,
		},
		{
			icon: Handshake,
			title: t('values.commitment.title'),
			description: t('values.commitment.description'),
			color: 'primary' as const,
		},
		{
			icon: Clock,
			title: t('values.convenience.title'),
			description: t('values.convenience.description'),
			color: 'ocean' as const,
		},
	];

	return (
		<>
			{/* Hero Section */}
			<section className="relative overflow-hidden">
				{/* Ocean gradient background */}
				<div className="absolute inset-0 bg-gradient-to-br from-ocean-muted via-background to-primary/5" />

				{/* Decorative wave layers */}
				<div className="absolute inset-0 pointer-events-none overflow-hidden">
					{/* biome-ignore lint/a11y/noSvgWithoutTitle : decorative */}
					<svg
						className="absolute bottom-0 w-full h-32 md:h-48"
						viewBox="0 0 1440 320"
						preserveAspectRatio="none"
					>
						<path
							className="fill-ocean/10"
							d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L0,320Z"
						/>
						<path
							className="fill-primary/5"
							d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L0,320Z"
						/>
					</svg>
				</div>

				<div className="container mx-auto px-4 py-20 md:py-32 relative">
					<div className="max-w-4xl mx-auto text-center">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 text-foreground">
							{t('hero.title')}
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
							{t('hero.description')}
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								href={ROUTES.products}
								className={buttonVariants({ size: 'lg', className: 'gap-2' })}
							>
								{t('hero.cta')}
								<ArrowRight className="size-4" />
							</Link>
							<Link
								href={ROUTES.contact}
								className={buttonVariants({
									variant: 'outline',
									size: 'lg',
									className: 'border-ocean/30 hover:bg-ocean-muted',
								})}
							>
								{tNav('contact')}
							</Link>
						</div>
					</div>
				</div>

				{/* Bottom wave transition */}
				<div className="absolute bottom-0 left-0 right-0 pointer-events-none">
					{/* biome-ignore lint/a11y/noSvgWithoutTitle : decorative */}
					<svg
						viewBox="0 0 1440 80"
						className="w-full h-auto fill-background"
						preserveAspectRatio="none"
					>
						<path d="M0,40 C360,80 1080,0 1440,50 L1440,80 L0,80 Z" />
					</svg>
				</div>
			</section>

			{/* Intro Section - Two Column */}
			<section className="container mx-auto px-4 py-16 md:py-24">
				<div className="grid md:grid-cols-5 gap-12 items-center max-w-6xl mx-auto">
					{/* Left: Visual element */}
					<div className="md:col-span-2 flex justify-center">
						<div className="relative">
							{/* Main decorative circle */}
							<div className="size-48 md:size-56 rounded-full bg-gradient-to-br from-ocean-muted to-primary/10 flex items-center justify-center">
								<div className="size-32 md:size-40 rounded-full bg-gradient-to-br from-ocean/20 to-primary/20 flex items-center justify-center">
									<Fish className="size-16 md:size-20 text-ocean" />
								</div>
							</div>
							{/* Floating accent icons */}
							<div className="absolute -top-2 -right-2 size-14 rounded-full bg-primary/15 flex items-center justify-center shadow-sm">
								<Beef className="size-7 text-primary" />
							</div>
							<div className="absolute -bottom-1 -left-3 size-12 rounded-full bg-ocean/15 flex items-center justify-center shadow-sm">
								<Leaf className="size-6 text-ocean" />
							</div>
						</div>
					</div>

					{/* Right: Text content */}
					<div className="md:col-span-3">
						<h2 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">
							{t('intro.title')}
						</h2>
						<div className="space-y-4 text-muted-foreground">
							<p className="text-base leading-relaxed">{t('intro.p1')}</p>
							<p className="text-base leading-relaxed">{t('intro.p2')}</p>
							<p className="text-base leading-relaxed">{t('intro.p3')}</p>
						</div>
						<div className="mt-8 pt-6 border-t border-border/50">
							<p className="text-lg font-medium text-foreground">{t('intro.owners')}</p>
							<p className="text-sm text-muted-foreground">{t('intro.ownersTitle')}</p>
						</div>
					</div>
				</div>
			</section>

			{/* Values Section - Alternating Styles */}
			<section className="bg-gradient-to-b from-ocean-muted/40 via-ocean-muted/20 to-background py-16 md:py-24">
				<div className="container mx-auto px-4">
					<h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">
						{t('values.title')}
					</h2>
					<p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
						{t('values.subtitle')}
					</p>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
						{values.map((value) => (
							<div
								key={value.title}
								className={
									'p-6 rounded-2xl transition-all duration-300 hover:shadow-md bg-white border border-border /50 shadow - sm hover:border-primary/30'
								}
							>
								<div
									className={`size-12 rounded-xl flex items-center justify-center mb-4 bg-primary/10`}
								>
									<value.icon className={`size-6 text-primary`} />
								</div>
								<h3 className="text-lg font-semibold mb-2">{value.title}</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Featured Products Section */}
			<section className="container mx-auto px-4 py-8 md:py-16">
				<div className="flex items-center justify-between mb-8">
					<h2 className="text-2xl md:text-3xl font-semibold">{t('featured.title')}</h2>
					<Link
						href={ROUTES.products}
						className={buttonVariants({
							variant: 'ghost',
							className: 'gap-2 text-ocean hover:text-ocean hover:bg-ocean-muted',
						})}
					>
						{t('featured.viewAll')}
						<ArrowRight className="size-4" />
					</Link>
				</div>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{featuredProductsBase.slice(0, 8).map((product) => {
						return <ProductCard key={product.slug} product={product} hideQuoteCart />;
					})}
				</div>
			</section>
		</>
	);
}
