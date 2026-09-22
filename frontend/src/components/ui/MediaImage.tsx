/**
 * MediaImage — a drop-in replacement for next/image that automatically skips
 * the Next.js image optimizer for URLs served by our Django Drive proxy.
 *
 * WHY: Drive proxy URLs are already compressed JPEGs / PNGs. If you pass them
 * through next/image optimisation, Next.js downloads the image from Django,
 * re-encodes it to AVIF/WebP, caches the result, and only THEN delivers it to
 * the browser.  That adds 200–800 ms on every cache miss with zero visible
 * quality improvement.  Setting `unoptimized` lets the browser fetch the proxy
 * URL directly — one fewer network hop, instant LCP.
 *
 * For every other URL (Unsplash, Django /media/, bare paths) the optimizer
 * runs normally and you still get AVIF/WebP conversion + 30-day CDN caching.
 */

import Image, { ImageProps } from "next/image";
import { isDriveProxyUrl } from "@/lib/api";

type MediaImageProps = ImageProps;

export function MediaImage({ src, unoptimized, ...rest }: MediaImageProps) {
  const srcString = typeof src === "string" ? src : undefined;
  const shouldSkipOptimization = unoptimized ?? isDriveProxyUrl(srcString);
  return <Image src={src} unoptimized={shouldSkipOptimization} {...rest} />;
}
