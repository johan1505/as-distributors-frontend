"use client";

import { usePathname, Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  isProductSlug,
  isCategoryKey,
} from "@/lib/products";
import { useMemo } from "react";
import type { BreadcrumbItemData } from "@/components/layout/Breadcrumbs";
import { ArrowLeft } from "lucide-react";

const PRODUCTS_PATH = "products";

export function BreadcrumbWrapper({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const tBreadcrumb = useTranslations("breadcrumb");
  const tNav = useTranslations("nav");
  const tCategories = useTranslations("categories");
  const tProducts = useTranslations("products");

  const breadcrumbItems = useMemo((): BreadcrumbItemData[] => {
    // Remove leading/trailing slashes and split
    const normalizedPath = pathname.replace(/^\/|\/$/g, "");
    const segments = normalizedPath ? normalizedPath.split("/") : [];

    // Home page
    if (segments.length === 0 || segments[0] === "home") {
      return [{ label: tNav("home"), href: "/home" }];
    }

    // Contact page
    if (segments[0] === "contact") {
      return [{ label: tNav("contact"), href: "/contact" }];
    }

    // Submit quote page
    if (segments[0] === "submit-quote") {
      return [{ label: tNav("quote"), href: "/submit-quote" }];
    }

    // Products pages
    const items: BreadcrumbItemData[] = [
     ...(segments[0] === "products" ? [{ label: tBreadcrumb("products"), href: `/${PRODUCTS_PATH}` }] : [] ),
     ...(segments[1] && isCategoryKey(segments[1]) ? [{ label: tCategories(segments[1]), href: `/${PRODUCTS_PATH}/${segments[1]}` }] : [] ),
     ...(segments[2] && isCategoryKey(segments[1]) && isProductSlug(segments[2]) ? [{ label: tProducts(`${segments[2]}.name`), href: `/${PRODUCTS_PATH}/${segments[1]}/${segments[2]}` }] : [] ),
    ];
    return items;
  }, [pathname, tBreadcrumb, tNav, tCategories, tProducts]);

  if (mobile) {
    if (breadcrumbItems.length > 1) {
      const parentItem = breadcrumbItems[breadcrumbItems.length - 2];
      return (
        <Link
          href={parentItem.href || "#"}
          className="flex items-center gap-1 text-sm underline"
        >
          <ArrowLeft className="size-4 shrink-0" />
          {tNav("back")}
        </Link>
      );
    }
    const currentItem = breadcrumbItems[breadcrumbItems.length - 1];
    return (
      <span className="text-sm font-medium truncate">
        {currentItem?.label}
      </span>
    );
  }

  return <Breadcrumbs items={breadcrumbItems} />;
}

