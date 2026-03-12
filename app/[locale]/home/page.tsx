import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight, Heart, Shield, Handshake, Clock, Fish, Beef, Leaf } from 'lucide-react';
import { getFeaturedProducts } from '@/lib/products';
import type { Locale } from 'next-intl';
import { FeaturedProductsCarousel } from '@/components/products/FeaturedProductsCarousel';
import { buildPageMetadata } from '@/lib/site-config';
import { ROUTES } from '@/lib/routes';
import ExportedImage from 'next-image-export-optimizer';

interface HomePageProps {
	params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'site' });

	return buildPageMetadata({
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
		route: ROUTES.home,
		locale,
	});
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
				<div aria-hidden className="absolute inset-0">
					<ExportedImage
						src="/images/islands-background.png"
						alt=""
						fill
						priority
						sizes="100vw"
						className="object-cover object-center"
						placeholder="empty"
					/>
				</div>
				<div className="container relative mx-auto px-4 py-20 md:py-32">
					<div className="max-w-4xl mx-auto text-center">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
							<span className="inline box-decoration-clone rounded-lg bg-background/55 px-3 py-1 backdrop-blur-sm ring-1 ring-border/30">
								{t('hero.title')}
							</span>
						</h1>
						<p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-bold">
							<span className="inline box-decoration-clone rounded-md bg-background/45 px-2 py-1 backdrop-blur-sm ring-1 ring-border/30">
								{t('hero.description')}
							</span>
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
									className: 'bg-ocean-muted hover:bg-ocean-muted',
								})}
							>
								{tNav('contact')}
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Intro Section - Two Column */}
			<section className="container mx-auto px-4 py-16 md:py-24">
				<div className="grid md:grid-cols-5 gap-12 items-center max-w-6xl mx-auto">
					{/* Left: Visual element */}
					<div className="md:col-span-2 flex justify-center">
						<div className="relative">
							{/* Main decorative circle */}
							<div className="size-48 md:size-56 rounded-full bg-linear-to-br from-ocean-muted to-primary/10 flex items-center justify-center">
								<div className="size-32 md:size-40 rounded-full bg-linear-to-br from-ocean/20 to-primary/20 flex items-center justify-center">
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

			{/* Featured Products Section */}
			<section className="px-10 md:py-16">
				<div className="flex items-center justify-between mb-8">
					<h2 className="text-2xl md:text-3xl font-semibold">{t('featured.title')}</h2>
					<Link
						href={ROUTES.products}
						className={buttonVariants({
							variant: 'ghost',
							className: 'text-ocean hover:text-ocean hover:bg-ocean-muted',
						})}
					>
						{t('featured.viewAll')}
						<ArrowRight className="size-4" />
					</Link>
				</div>
				<FeaturedProductsCarousel products={featuredProductsBase.slice(0, 8)} />
			</section>

			{/* Wave transition to Values Section */}
			<div className="relative">
				{/* biome-ignore lint/a11y/noSvgWithoutTitle : decorative */}
				<svg className="w-full h-20 md:h-32" viewBox="0 0 1440 120" preserveAspectRatio="none">
					<path
						className="fill-ocean/10"
						d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
					/>
					<path
						className="fill-primary/5"
						d="M0,80 C240,20 480,100 720,40 C960,100 1200,20 1440,80 L1440,120 L0,120 Z"
					/>
				</svg>
			</div>

			{/* Values Section - Alternating Styles */}
			<section className="bg-linear-to-b from-ocean-muted/40 via-ocean-muted/20 to-background py-16 md:py-24">
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
		</>
	);
}
