"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  getProductSubtypeConfig,
  type ProductBase,
} from "@/lib/products";

export interface QuoteItem {
  product: ProductBase;
  quantity?: number;
  selectedSubtypeValue?: string;
  subtypeQuantities?: Record<string, number>;
}

interface QuoteContextValue {
  items: QuoteItem[];
  addItem: (product: ProductBase, subtypeValue?: string) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (
    productOrSlug: ProductBase | string,
    quantity: number,
    subtypeValue?: string
  ) => void;
  getQuantity: (productOrSlug: ProductBase | string, subtypeValue?: string) => number;
  getTotalQuantityForProduct: (slug: string) => number;
  getSelectedSubtypeValue: (slug: string) => string | undefined;
  setSelectedSubtypeValue: (productOrSlug: ProductBase | string, subtypeValue: string) => void;
  clearCart: () => void;
  isInCart: (slug: string) => boolean;
  totalItems: number;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

const STORAGE_KEY = "pacific-foods-quote-cart";
export const MAX_QUANTITY_PER_PRODUCT = 999;
export const MAX_PACKS_PER_QUOTE_ITEM = 100;

const getSlug = (productOrSlug: ProductBase | string): string =>
  typeof productOrSlug === "string" ? productOrSlug : productOrSlug.slug;

const getItemTotalQuantity = (item: QuoteItem): number => {
  if (item.subtypeQuantities) {
    return Object.values(item.subtypeQuantities).reduce(
      (sum, quantity) => sum + quantity,
      0
    );
  }

  return item.quantity ?? 0;
};

const normalizeSubtypeSelection = (
  product: ProductBase,
  item?: QuoteItem
): QuoteItem | null => {
  const subtypeConfig = getProductSubtypeConfig(product);
  if (!subtypeConfig) {
    const quantity = item?.quantity ?? 0;
    return quantity > 0 ? { product, quantity } : null;
  }

  const selectedSubtypeValue =
    item?.selectedSubtypeValue ?? subtypeConfig.defaultOptionValue;

  if (item?.subtypeQuantities) {
    const subtypeQuantities = Object.fromEntries(
      Object.entries(item.subtypeQuantities)
        .filter(([, quantity]) => quantity > 0)
        .map(([value, quantity]) => [value, Math.min(quantity, MAX_QUANTITY_PER_PRODUCT)])
    );

    return Object.keys(subtypeQuantities).length > 0
      ? {
          product,
          selectedSubtypeValue,
          subtypeQuantities,
        }
      : null;
  }

  const legacyQuantity = Math.min(item?.quantity ?? 0, MAX_QUANTITY_PER_PRODUCT);
  return legacyQuantity > 0
    ? {
        product,
        selectedSubtypeValue,
        subtypeQuantities: {
          [selectedSubtypeValue]: legacyQuantity,
        },
      }
    : null;
};

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const normalizedItems = parsed
            .map((item) => {
              if (!item || typeof item !== "object" || !("product" in item)) {
                return null;
              }

              return normalizeSubtypeSelection(item.product as ProductBase, item as QuoteItem);
            })
            .filter((item): item is QuoteItem => item !== null);
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setItems(normalizedItems);
        }
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage:", e);
    }
    setIsHydrated(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to save cart to localStorage:", e);
      }
    }
  }, [items, isHydrated]);

  const addItem = useCallback((product: ProductBase, subtypeValue?: string) => {
    setItems((prev) => {
      const subtypeConfig = getProductSubtypeConfig(product);
      const slug = product.slug;
      const existing = prev.find((item) => item.product.slug === slug);

      if (!subtypeConfig) {
        if (existing) {
          const existingQuantity = existing.quantity ?? 0;
          if (existingQuantity >= MAX_QUANTITY_PER_PRODUCT) return prev;
          return prev.map((item) =>
            item.product.slug === slug
              ? { ...item, quantity: existingQuantity + 1 }
              : item
          );
        }

        return [...prev, { product, quantity: 1 }];
      }

      const nextSubtypeValue = subtypeValue ?? subtypeConfig.defaultOptionValue;
      const existingSubtypeQuantity =
        existing?.subtypeQuantities?.[nextSubtypeValue] ?? 0;

      if (existingSubtypeQuantity >= MAX_QUANTITY_PER_PRODUCT) {
        return prev;
      }

      if (!existing) {
        return [
          ...prev,
          {
            product,
            selectedSubtypeValue: nextSubtypeValue,
            subtypeQuantities: {
              [nextSubtypeValue]: 1,
            },
          },
        ];
      }

      return prev.map((item) =>
        item.product.slug === slug
          ? {
              ...item,
              selectedSubtypeValue: nextSubtypeValue,
              subtypeQuantities: {
                ...item.subtypeQuantities,
                [nextSubtypeValue]: existingSubtypeQuantity + 1,
              },
            }
          : item
      );
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((item) => item.product.slug !== slug));
  }, []);

  const updateQuantity = useCallback(
    (productOrSlug: ProductBase | string, quantity: number, subtypeValue?: string) => {
      const slug = getSlug(productOrSlug);
      const product = typeof productOrSlug === "string" ? null : productOrSlug;
      const subtypeConfig = product ? getProductSubtypeConfig(product) : undefined;
      const capped = Math.min(Math.max(0, quantity), MAX_QUANTITY_PER_PRODUCT);

      setItems((prev) => {
        const existing = prev.find((item) => item.product.slug === slug);

        if (!subtypeConfig) {
          if (capped <= 0) {
            return prev.filter((item) => item.product.slug !== slug);
          }

          if (!existing) {
            if (!product) return prev;
            return [...prev, { product, quantity: capped }];
          }

          return prev.map((item) =>
            item.product.slug === slug ? { ...item, quantity: capped } : item
          );
        }

        const nextSubtypeValue =
          subtypeValue ??
          existing?.selectedSubtypeValue ??
          subtypeConfig.defaultOptionValue;

        if (!existing) {
          if (!product || capped <= 0) return prev;
          return [
            ...prev,
            {
              product,
              selectedSubtypeValue: nextSubtypeValue,
              subtypeQuantities: {
                [nextSubtypeValue]: capped,
              },
            },
          ];
        }

        const currentSubtypeQuantities = {
          ...(existing.subtypeQuantities ?? {}),
        };

        if (capped <= 0) {
          delete currentSubtypeQuantities[nextSubtypeValue];
        } else {
          currentSubtypeQuantities[nextSubtypeValue] = capped;
        }

        if (Object.keys(currentSubtypeQuantities).length === 0) {
          return prev.filter((item) => item.product.slug !== slug);
        }

        return prev.map((item) =>
          item.product.slug === slug
            ? {
                ...item,
                selectedSubtypeValue: nextSubtypeValue,
                subtypeQuantities: currentSubtypeQuantities,
              }
            : item
        );
      });
    },
    []
  );

  const getQuantity = useCallback(
    (productOrSlug: ProductBase | string, subtypeValue?: string) => {
      const slug = getSlug(productOrSlug);
      const item = items.find((entry) => entry.product.slug === slug);
      if (!item) {
        return 0;
      }

      if (item.subtypeQuantities) {
        const resolvedSubtypeValue = subtypeValue ?? item.selectedSubtypeValue;
        return resolvedSubtypeValue
          ? item.subtypeQuantities[resolvedSubtypeValue] ?? 0
          : 0;
      }

      return item.quantity ?? 0;
    },
    [items]
  );

  const getTotalQuantityForProduct = useCallback(
    (slug: string) => {
      const item = items.find((entry) => entry.product.slug === slug);
      return item ? getItemTotalQuantity(item) : 0;
    },
    [items]
  );

  const getSelectedSubtypeValue = useCallback(
    (slug: string) =>
      items.find((entry) => entry.product.slug === slug)?.selectedSubtypeValue,
    [items]
  );

  const setSelectedSubtypeValue = useCallback(
    (productOrSlug: ProductBase | string, subtypeValue: string) => {
      const slug = getSlug(productOrSlug);
      setItems((prev) =>
        prev.map((item) =>
          item.product.slug === slug
            ? {
                ...item,
                selectedSubtypeValue: subtypeValue,
              }
            : item
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback(
    (slug: string) =>
      items.some(
        (item) => item.product.slug === slug && getItemTotalQuantity(item) > 0
      ),
    [items]
  );

  const totalItems = items.reduce(
    (sum, item) => sum + getItemTotalQuantity(item),
    0
  );

  return (
    <QuoteContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        getQuantity,
        getTotalQuantityForProduct,
        getSelectedSubtypeValue,
        setSelectedSubtypeValue,
        clearCart,
        isInCart,
        totalItems,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within a QuoteProvider");
  }
  return context;
}
