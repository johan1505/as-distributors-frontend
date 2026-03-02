"use client"

import ExportedImage from "next-image-export-optimizer"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ProductImageLightboxProps {
  src: string
  alt: string
  open: boolean
  onClose: () => void
}

export function ProductImageLightbox({ src, alt, open, onClose }: ProductImageLightboxProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent
        showCloseButton={true}
        className="max-w-[90vw] sm:max-w-2xl p-0 gap-0 overflow-hidden"
      >
        <ExportedImage
          src={src}
          alt={alt}
          width={900}
          height={900}
          sizes="(max-width: 640px) 90vw, 640px"
          className="w-full h-auto max-h-[80vh] object-contain"
          placeholder="empty"
          loading="lazy"
        />
      </DialogContent>
    </Dialog>
  )
}
