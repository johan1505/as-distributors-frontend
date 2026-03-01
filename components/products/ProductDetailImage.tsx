"use client"

import { useState } from "react"
import ExportedImage from "next-image-export-optimizer"
import { ZoomIn } from "lucide-react"
import { ProductImageLightbox } from "./ProductImageLightbox"

interface ProductDetailImageProps {
  src: string
  alt: string
  ariaLabel: string
}

export function ProductDetailImage({ src, alt, ariaLabel }: ProductDetailImageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="w-full cursor-zoom-in group/imgbtn overflow-hidden md:rounded-2xl bg-white aspect-4/3 p-4 relative"
        aria-label={ariaLabel}
      >
        <ExportedImage
          width={800}
          height={600}
          src={src}
          alt={alt}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-full object-contain"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/imgbtn:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-black/40 rounded-full p-2.5">
            <ZoomIn className="size-6 text-white" />
          </div>
        </div>
      </button>
      <ProductImageLightbox
        src={src}
        alt={alt}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}
