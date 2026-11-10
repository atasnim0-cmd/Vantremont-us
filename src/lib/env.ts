/** The domain the site is launched on. */
export const LIVE_DOMAIN = "vantremont.com";

/**
 * True only for a Vercel production deployment on the live domain with the launch
 * switch on (environment variable SITE_LAUNCHED=true).
 *
 * Anything else behaves like a preview: kept out of search engines, the launch check
 * is not enforced, and forms log submissions instead of failing without email keys.
 * That covers the vercel.app address and the soft launch, when vantremont.com already
 * points at the site but SITE_LAUNCHED is not set yet. Vercel sets
 * VERCEL_PROJECT_PRODUCTION_URL to the custom domain once it is added.
 */
export const isLive =
  process.env.VERCEL_ENV === "production" &&
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "").replace(/^www\./, "") === LIVE_DOMAIN &&
  process.env.SITE_LAUNCHED === "true";
