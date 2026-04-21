/**
 * Region / location formatting utilities
 *
 * Uses the built-in Intl.DisplayNames API — no extra packages needed.
 * Covers any ISO 3166-1 alpha-2 country code and ISO 3166-2 subdivision codes.
 *
 * The OVERRIDES map handles edge-cases where the backend stores aliases or
 * non-standard values that Intl.DisplayNames won't recognise.
 */

// ── One shared formatter instance ─────────────────────────────────────────────
const regionFmt =
  typeof Intl !== "undefined"
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

// ── Manual overrides for backend quirks / aliases ────────────────────────────
const COUNTRY_OVERRIDES: Record<string, string> = {
  // Constituent nation aliases → canonical country
  England:           "United Kingdom",
  Scotland:          "United Kingdom",
  Wales:             "United Kingdom",
  "Northern Ireland":"United Kingdom",
  "Great Britain":   "United Kingdom",
  // Common alternate spellings
  USA:                       "United States",
  "United States of America": "United States",
  RSA:                       "South Africa",
  "Ivory Coast":             "Côte d'Ivoire",
  "Côte d'Ivoire":           "Côte d'Ivoire",
};

// ── Country ───────────────────────────────────────────────────────────────────

/**
 * Converts an ISO 3166-1 alpha-2 code or common alias to a full English country name.
 * "GB" → "United Kingdom", "NG" → "Nigeria", "US" → "United States"
 * Falls back to the raw value if unresolvable.
 */
export function normalizeCountry(raw: string | null | undefined): string {
  if (!raw?.trim()) return "";
  const trimmed = raw.trim();

  // Manual override first (aliases, constituent nations, etc.)
  if (COUNTRY_OVERRIDES[trimmed]) return COUNTRY_OVERRIDES[trimmed];

  // Intl.DisplayNames — handles all ISO 3166-1 alpha-2 codes
  try {
    const name = regionFmt?.of(trimmed);
    // Intl returns the raw code unchanged when it can't resolve — detect that
    if (name && name.toUpperCase() !== trimmed.toUpperCase()) return name;
  } catch {
    // ignore
  }

  // Last resort: return as-is
  return trimmed;
}

// ── State / Subdivision ────────────────────────────────────────────────────────

/**
 * Converts an ISO 3166-2 subdivision code to a readable region name.
 * Requires the country code to build the full subdivision tag.
 *
 * "DBY" + "GB" → "Derbyshire"
 * "LA"  + "US" → "Louisiana"
 * "FC"  + "NG" → "FCT" (falls back when unresolvable)
 */
export function formatStateCode(
  stateCode: string | null | undefined,
  countryCode: string | null | undefined
): string {
  if (!stateCode?.trim()) return "";
  const state   = stateCode.trim();
  const country = countryCode?.trim();

  try {
    if (country && regionFmt) {
      // ISO 3166-2 format: "GB-DBY", "US-LA", "NG-FC"
      const subdivisionTag = `${country}-${state}`;
      const name = regionFmt.of(subdivisionTag);
      // Intl returns the tag unchanged when it can't resolve — detect that
      if (name && name !== subdivisionTag) return name;
    }
  } catch {
    // ignore — fall through to raw value
  }

  return state;
}

// ── Combined location string ───────────────────────────────────────────────────

/**
 * Builds a human-readable location string from city / state / country codes.
 * Empty strings and null/undefined values are skipped.
 *
 * formatLocation("", "DBY", "GB") → "Derbyshire, United Kingdom"
 * formatLocation("Lagos", "LA",  "NG") → "Lagos, Lagos, Nigeria"
 */
export function formatLocation(
  city?: string | null,
  stateCode?: string | null,
  countryCode?: string | null
): string {
  const parts: string[] = [];

  if (city?.trim()) parts.push(city.trim());
  if (stateCode?.trim()) parts.push(formatStateCode(stateCode, countryCode));
  if (countryCode?.trim()) parts.push(normalizeCountry(countryCode));

  return parts.filter(Boolean).join(", ");
}

// ── Kept for backward-compat ──────────────────────────────────────────────────

export function aliasesFor(canonical: string): string[] {
  const normalized = normalizeCountry(canonical);
  const aliases = Object.entries(COUNTRY_OVERRIDES)
    .filter(([, v]) => v === normalized)
    .map(([k]) => k);
  return [normalized, ...aliases.filter((a) => a !== normalized)];
}

const CANONICAL_TO_DB: Record<string, string> = {
  "United Kingdom": "GB",
};

export function toApiCountry(canonical: string): string {
  return CANONICAL_TO_DB[canonical] ?? canonical;
}
