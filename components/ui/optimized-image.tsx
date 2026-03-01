"use client"

import { useLayoutEffect, useRef, useCallback } from "react"
import ExportedImage from "next-image-export-optimizer"
import type { ExportedImageProps } from "next-image-export-optimizer"

const loadedImages = new Set<string>()

function getSrcKey(src: ExportedImageProps["src"]): string {
  return typeof src === "object" ? src.src : src
}

export function OptimizedImage({
  src,
  onLoad,
  placeholder,
  ...rest
}: ExportedImageProps) {
  const srcKey = getSrcKey(src)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // For cached images on hard refresh: strip blur styles directly from the DOM
  // before the browser paints. No React re-render, no prop change, no flash.
  useLayoutEffect(() => {
    if (loadedImages.has(srcKey)) return
    const img = wrapperRef.current?.querySelector("img")
    if (img?.complete && img.naturalWidth > 0) {
      img.style.backgroundImage = ""
      img.style.backgroundSize = ""
      img.style.backgroundPosition = ""
      img.style.backgroundRepeat = ""
      loadedImages.add(srcKey)
    }
  }, [srcKey])

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      loadedImages.add(srcKey)
      onLoad?.(e)
    },
    [srcKey, onLoad],
  )

  const resolvedPlaceholder =
    placeholder ?? (loadedImages.has(srcKey) ? "empty" : "blur")

  return (
    <div ref={wrapperRef} style={{ display: "contents" }}>
      <ExportedImage
        src={src}
        placeholder={resolvedPlaceholder}
        onLoad={handleLoad}
        {...rest}
      />
    </div>
  )
}
