/**
 * Normalizes a pathname for comparison by ensuring consistent trailing slash behavior.
 * With trailingSlash: true in next.config.ts, all paths should have trailing slashes
 * except the root path "/". This function ensures consistent comparison.
 * 
 * @param pathname - The pathname to normalize
 * @returns Normalized pathname (root stays "/", others get trailing slash removed for comparison)
 */
export function normalizePathname(pathname: string): string {
  // Root path stays as "/"
  if (pathname === "/" || pathname === "") {
    return "/";
  }
  // Remove trailing slashes from all other paths for consistent comparison
  // This handles cases where usePathname might return paths with or without trailing slashes
  return pathname.replace(/\/+$/, "");
}

/**
 * Checks if two paths are the same, handling trailing slash variations
 */
export function isActivePath(currentPath: string, targetPath: string): boolean {
  return normalizePathname(currentPath) === normalizePathname(targetPath);
}

