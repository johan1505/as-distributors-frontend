import type { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

// Oil bottle icon
export function OilBottleIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Bottle body */}
      <path d="M8 10h8v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10z" />
      {/* Bottle neck */}
      <path d="M10 10V6h4v4" />
      {/* Bottle cap */}
      <rect x="9" y="3" width="6" height="3" rx="1" />
      {/* Oil level */}
      <path d="M10 14h4" />
    </svg>
  );
}

// Jar icon for pickles/spices
export function JarIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Jar body */}
      <path d="M6 8h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8z" />
      {/* Jar lid */}
      <rect x="5" y="4" width="14" height="4" rx="1" />
      {/* Contents indication */}
      <circle cx="9" cy="14" r="1.5" />
      <circle cx="15" cy="16" r="1" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

// Cracker/biscuit icon
export function CrackerIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Rounded rectangle cracker */}
      <rect x="4" y="6" width="16" height="12" rx="2" />
      {/* Cracker holes/dots pattern */}
      <circle cx="8" cy="10" r="1" />
      <circle cx="12" cy="10" r="1" />
      <circle cx="16" cy="10" r="1" />
      <circle cx="8" cy="14" r="1" />
      <circle cx="12" cy="14" r="1" />
      <circle cx="16" cy="14" r="1" />
    </svg>
  );
}
