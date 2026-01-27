import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en"],

  // Used when no locale matches
  defaultLocale: "en",
});

// Export types from routing configuration
export type Locale = (typeof routing.locales)[number];

// Export for backward compatibility
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;

