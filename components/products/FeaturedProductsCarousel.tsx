'use client';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductCard } from './ProductCard';
import type { ProductBase } from '@/lib/products';

interface FeaturedProductsCarouselProps {
	products: ProductBase[];
}

export function FeaturedProductsCarousel({ products }: FeaturedProductsCarouselProps) {
	return (
		<Carousel>
			<div className="flex items-center gap-2 md:gap-4">
				<CarouselPrevious className="static translate-x-0 translate-y-0 shrink-0" />
				<CarouselContent className="-ml-4 py-2">
					{products.map((product) => (
						<CarouselItem
							key={product.slug}
							className="lg:basis-1/2 xl:basis-1/5"
						>
							<ProductCard product={product} hideQuoteCart />
						</CarouselItem>
					))}
				</CarouselContent>

				<CarouselNext className="static translate-x-0 translate-y-0 shrink-0" />
			</div>
		</Carousel>
	);
}
