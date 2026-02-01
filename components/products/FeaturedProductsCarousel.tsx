"use client";

import { ProductCard } from "./ProductCard";
import type { ProductBase } from "@/lib/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface FeaturedProductsCarouselProps {
  products: ProductBase[];
}

export function FeaturedProductsCarousel({
  products,
}: FeaturedProductsCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {products.map((product) => (
          <CarouselItem
            key={product.slug}
            className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <ProductCard product={product} hideQuoteCart />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-4 bg-white/80 hover:bg-white border-ocean/20 hover:border-ocean/40" />
      <CarouselNext className="hidden md:flex -right-4 bg-white/80 hover:bg-white border-ocean/20 hover:border-ocean/40" />
    </Carousel>
  );
}
