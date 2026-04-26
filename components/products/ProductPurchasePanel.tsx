"use client";

import { useState } from "react";
import { AddToQuoteButton } from "@/components/quote/AddToQuoteButton";
import { ProductBadges } from "@/components/products/ProductBadges";
import {
  getProductDisplaySpecs,
  getProductSubtypeConfig,
  type ProductBase,
} from "@/lib/products";

interface ProductPurchasePanelProps {
  product: ProductBase;
  overallSizeLabel: string;
  unitPerPackLabel: string;
}

export function ProductPurchasePanel({
  product,
  overallSizeLabel,
  unitPerPackLabel,
}: ProductPurchasePanelProps) {
  const subtypeConfig = getProductSubtypeConfig(product);
  const [selectedSubtypeValue, setSelectedSubtypeValue] = useState(
    subtypeConfig?.defaultOptionValue
  );
  const displaySpecs = getProductDisplaySpecs(product, selectedSubtypeValue);

  return (
    <div className="space-y-8">
      <ProductBadges
        overallSize={displaySpecs.overallSize}
        unitPerPack={displaySpecs.unitPerPack}
        showUnitPerPack={displaySpecs.showUnitPerPack}
        overallSizeLabel={overallSizeLabel}
        unitPerPackLabel={unitPerPackLabel}
        variant="large"
      />
      <AddToQuoteButton
        product={product}
        selectedSubtypeValue={selectedSubtypeValue}
        onSelectedSubtypeValueChange={setSelectedSubtypeValue}
        size="lg"
        className="w-full sm:w-auto"
      />
    </div>
  );
}
