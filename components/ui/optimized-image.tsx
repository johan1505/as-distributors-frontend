"use client"

import { useLayoutEffect, useRef, useState, useCallback } from "react"
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
  const alreadyLoaded = loadedImages.has(srcKey)
  const [skipBlur, setSkipBlur] = useState(alreadyLoaded)

  useLayoutEffect(() => {
    if (skipBlur) return
    const img = wrapperRef.current?.querySelector("img")
    if (img?.complete && img.naturalWidth > 0) {
      loadedImages.add(srcKey)
      setSkipBlur(true)
    }
  }, [srcKey, skipBlur])

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      loadedImages.add(srcKey)
      onLoad?.(e)
    },
    [srcKey, onLoad],
  )

  const resolvedPlaceholder = placeholder ?? (skipBlur ? "empty" : "blur")

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
