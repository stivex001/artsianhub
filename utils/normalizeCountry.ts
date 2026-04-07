/**
 * Maps ISO 2-letter codes and regional/alternate names to canonical full country names.
 * Handles cases like: "NG" → "Nigeria", "GB"/"England"/"Scotland" → "United Kingdom"
 */
const COUNTRY_ALIASES: Record<string, string> = {
  // ISO codes
  NG: "Nigeria",
  GB: "United Kingdom",
  US: "United States",
  GH: "Ghana",
  KE: "Kenya",
  ZA: "South Africa",
  EG: "Egypt",
  ET: "Ethiopia",
  TZ: "Tanzania",
  UG: "Uganda",
  CM: "Cameroon",
  CI: "Ivory Coast",
  SN: "Senegal",
  ZW: "Zimbabwe",
  RW: "Rwanda",
  CA: "Canada",
  AU: "Australia",
  IN: "India",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  NL: "Netherlands",
  BE: "Belgium",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  FI: "Finland",
  PL: "Poland",
  PT: "Portugal",
  IE: "Ireland",
  NZ: "New Zealand",
  SG: "Singapore",
  MY: "Malaysia",
  PH: "Philippines",
  PK: "Pakistan",
  BD: "Bangladesh",
  BR: "Brazil",
  MX: "Mexico",
  AR: "Argentina",
  CO: "Colombia",
  AE: "United Arab Emirates",
  SA: "Saudi Arabia",
  QA: "Qatar",
  KW: "Kuwait",
  BH: "Bahrain",
  OM: "Oman",
  JP: "Japan",
  CN: "China",
  KR: "South Korea",
  // Regional/constituent names → canonical country
  England: "United Kingdom",
  Scotland: "United Kingdom",
  Wales: "United Kingdom",
  "Northern Ireland": "United Kingdom",
  "Great Britain": "United Kingdom",
  "Ivory Coast": "Ivory Coast",
  "Côte d'Ivoire": "Ivory Coast",
  // Alternate spellings / common variants
  "United States of America": "United States",
  USA: "United States",
  "South Africa": "South Africa",
  "RSA": "South Africa",
};

/**
 * Normalizes a raw country string (full name, ISO code, or regional alias)
 * to a canonical full country name.
 *
 * Returns the input unchanged if no mapping is found, so unknown values
 * still render rather than becoming empty.
 */
export function normalizeCountry(raw: string | null | undefined): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  // Direct map lookup (handles ISO codes and known aliases)
  if (COUNTRY_ALIASES[trimmed]) return COUNTRY_ALIASES[trimmed];
  // Case-insensitive fallback
  const lower = trimmed.toLowerCase();
  const found = Object.entries(COUNTRY_ALIASES).find(
    ([key]) => key.toLowerCase() === lower
  );
  return found ? found[1] : trimmed;
}

/**
 * Returns all known aliases for a canonical country name.
 * Useful when you want to build a multi-value filter query.
 * e.g. aliasesFor("United Kingdom") → ["United Kingdom", "GB", "England", ...]
 */
export function aliasesFor(canonical: string): string[] {
  const normalized = normalizeCountry(canonical);
  const aliases = Object.entries(COUNTRY_ALIASES)
    .filter(([, v]) => v === normalized)
    .map(([k]) => k);
  return [normalized, ...aliases.filter((a) => a !== normalized)];
}
