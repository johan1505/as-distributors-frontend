"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryGrid } from "@/components/products/CategoryGrid";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import type { CategoryKey, ProductBase } from "@/lib/products";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductCatalogProps {
  selectedCategory: CategoryKey | "all";
  products: ProductBase[];
  categories: { key: CategoryKey; label: string }[];
}

export function ProductCatalog({
  selectedCategory,
  products,
  categories,
}: ProductCatalogProps) {
  const tProducts = useTranslations("products");
  const tCatalog = useTranslations("catalog");
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const name = tProducts(`${product.slug}.name`);
      const description = tProducts(`${product.slug}.description`);

      const matchesSearch =
        search === "" ||
        name.toLowerCase().includes(search.toLowerCase()) ||
        description.toLowerCase().includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [products, search, tProducts]);

  // Group products by category, prioritizing categories with name matches
  const groupedProducts = useMemo(() => {
    const groups: Record<string, ProductBase[]> = {};
    const categoriesWithNameMatch = new Set<string>();

    filteredProducts.forEach((product) => {
      if (!groups[product.categoryKey]) {
        groups[product.categoryKey] = [];
      }
      groups[product.categoryKey].push(product);

      // Track if this category has a product with a name match
      if (search) {
        const name = tProducts(`${product.slug}.name`);
        if (name.toLowerCase().includes(search.toLowerCase())) {
          categoriesWithNameMatch.add(product.categoryKey);
        }
      }
    });

    return Object.entries(groups)
      .map(([categoryKey, categoryProducts]) => ({
        category: categoryKey,
        categoryLabel:
          categories.find((c) => c.key === categoryKey)?.label || categoryKey,
        products: search
          ? categoryProducts.slice().sort((a, b) => {
            const aName = tProducts(`${a.slug}.name`).toLowerCase();
            const bName = tProducts(`${b.slug}.name`).toLowerCase();
            const searchLower = search.toLowerCase();
            const aHasNameMatch = aName.includes(searchLower);
            const bHasNameMatch = bName.includes(searchLower);
            if (aHasNameMatch && !bHasNameMatch) return -1;
            if (!aHasNameMatch && bHasNameMatch) return 1;
            return 0;
          })
          : categoryProducts,
        hasNameMatch: categoriesWithNameMatch.has(categoryKey),
      }))
      .sort((a, b) => {
        // Categories with name matches come first
        if (a.hasNameMatch && !b.hasNameMatch) return -1;
        if (!a.hasNameMatch && b.hasNameMatch) return 1;
        return 0;
      });
  }, [filteredProducts, categories, search, tProducts]);

  const isMobile = useIsMobile();

  // If on main products page (not a category page) and no search query, show category grid
  if (selectedCategory === "all" && (!search || search.trim() === "")) {
    return <CategoryGrid categories={categories} />;
  }

  // If search query exists, show filtered products
  return (
    <div className="flex flex-col gap-8">
      {/* Filters - only show on mobile when search exists */}
      {isMobile && (
        <CategoryFilter
          selectedCategory={selectedCategory}
          categories={categories}
          allLabel={tCatalog("allProducts")}
          filterLabel={tCatalog("filter.label")}
        />
      )}

      {/* Results */}
      {groupedProducts.length === 0 ? (
        <p className="text-muted-foreground">{tCatalog("search.noResults")}</p>
      ) : (
        groupedProducts.map((group) => (
          <section key={group.category}>
            {groupedProducts.length > 1 ? (
              <h2 className="text-2xl font-semibold mb-6">
                {group.categoryLabel}
              </h2>
            ) : null}
            <ProductGrid products={group.products} />
          </section>
        ))
      )}
    </div>
  );
}
