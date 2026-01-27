"use client";

import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  isProductSlug,
  isCategoryKey,
} from "@/lib/products";
import { useMemo } from "react";
import type { BreadcrumbItemData } from "@/components/layout/Breadcrumbs";

const PRODUCTS_PATH = "products";

export function BreadcrumbWrapper() {
  const pathname = usePathname();
  const tBreadcrumb = useTranslations("breadcrumb");
  const tCategories = useTranslations("categories");
  const tProducts = useTranslations("products");

  const breadcrumbItems = useMemo((): BreadcrumbItemData[] => {
    // Remove leading/trailing slashes and split
    const normalizedPath = pathname.replace(/^\/|\/$/g, "");
    const segments = normalizedPath ? normalizedPath.split("/") : [];

    // Home page - no breadcrumbs
    if (segments.length === 0) {
      return [];
    }

    const items: BreadcrumbItemData[] = [
     ...(segments[0] === "products" ? [{ label: tBreadcrumb("products"), href: `/${PRODUCTS_PATH}` }] : [] ),
     ...(segments[1] && isCategoryKey(segments[1]) ? [{ label: tCategories(segments[1]), href: `/${PRODUCTS_PATH}/${segments[1]}` }] : [] ),
     ...(segments[2] && isCategoryKey(segments[1]) && isProductSlug(segments[2]) ? [{ label: tProducts(`${segments[2]}.name`), href: `/${PRODUCTS_PATH}/${segments[1]}/${segments[2]}` }] : [] ),
    ];
    return items;
  }, [pathname, tBreadcrumb, tCategories, tProducts]);

  return <Breadcrumbs items={breadcrumbItems} />;
}

