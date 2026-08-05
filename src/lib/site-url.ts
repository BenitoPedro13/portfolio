/**
 * Resolves the canonical site URL.
 *
 * Precedence:
 *  1. NEXT_PUBLIC_SITE_URL          — explicit override (custom domain, any host)
 *  2. VERCEL_PROJECT_PRODUCTION_URL — Vercel's production domain, on production builds
 *  3. VERCEL_URL                    — the per-deployment URL, for previews
 *  4. http://localhost:$PORT        — local development
 *
 * Vercel injects 2 and 3 automatically, so a Vercel deploy needs no configuration.
 * Set NEXT_PUBLIC_SITE_URL only to pin a domain or when hosting elsewhere.
 */

function withProtocol(host: string): string {
  const trimmed = host.trim().replace(/\/+$/, "");
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function resolveSiteUrl(): string {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "";
  if (explicit) return withProtocol(explicit);

  const isProduction =
    (process.env.VERCEL_ENV ?? process.env.NEXT_PUBLIC_VERCEL_ENV) ===
    "production";

  const productionHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
    "";
  if (isProduction && productionHost) return withProtocol(productionHost);

  const deploymentHost =
    process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL ?? "";
  if (deploymentHost) return withProtocol(deploymentHost);

  // Fall back to the production host even outside a production build, so local
  // `next build` output still carries sane canonical URLs.
  if (productionHost) return withProtocol(productionHost);

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const siteUrl = resolveSiteUrl();

/** Bare hostname, for display in UI (e.g. "benitopedro.dev"). */
export const siteHost = siteUrl.replace(/^https?:\/\//i, "").replace(/\/+$/, "");

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}
