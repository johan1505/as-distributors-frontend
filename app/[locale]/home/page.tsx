import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Leaf, Award, Users } from "lucide-react";
import { getFeaturedProducts } from "@/lib/products";
import { Locale } from "next-intl";
import { ProductCard } from "@/components/products/ProductCard";
import { locales } from "@/i18n/config";
import {
  getCanonicalUrl,
  getAlternateLanguages,
  SITE_NAME,
  BASE_URL,
} from "@/lib/site-config";
import { ROUTES } from "@/lib/routes";

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });

  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");
  const canonicalUrl = getCanonicalUrl(locale, ROUTES.home);

  return {
    title,
    description,
    keywords: keywords.split(", "),
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
      type: "website",
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
      card: "summary_large_image",
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
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");

  const featuredProductsBase = getFeaturedProducts();

  const values = [
    {
      icon: Leaf,
      title: t("values.authenticity.title"),
      description: t("values.authenticity.description"),
    },
    {
      icon: Award,
      title: t("values.quality.title"),
      description: t("values.quality.description"),
    },
    {
      icon: Users,
      title: t("values.community.title"),
      description: t("values.community.description"),
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-primary/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDE0di0yaDE0ek0zNiAyNnYySDE0di0yaDE0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-6xl mb-6 block">🌺</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <Link
              href={ROUTES.products}
              className={buttonVariants({ size: "lg", className: "gap-2" })}
            >
              {t("hero.cta")}
            </Link>
          </div>
        </div>
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{t("intro.title")}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("intro.description")}
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("values.title")}
          </h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-8">
                  <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="size-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-8 py-16 md:py-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">{t("featured.title")}</h2>
          <Link
            href={ROUTES.products}
            className={buttonVariants({ variant: "ghost", className: "gap-2" })}
          >
            {t("featured.viewAll")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProductsBase.map((product) => {
            return (
              <ProductCard key={product.slug} product={product} hideQuoteCart />
            );
          })}
        </div>
      </section>
    </>
  );
}
