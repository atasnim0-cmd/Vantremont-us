/** The domain the site is launched on. */
export const LIVE_DOMAIN = "vantremont.com";

/**
 * True only when this is a Vercel production deployment served on the live domain.
 *
 * Before the domain is attached, production deployments run on a vercel.app address.
 * Those builds behave like previews: kept out of search engines, the launch check is
 * not enforced, and the forms log submissions instead of failing without email keys.
 * Vercel sets VERCEL_PROJECT_PRODUCTION_URL to the custom domain once it is added.
 */
export const isLive =
  process.env.VERCEL_ENV === "production" &&
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "").replace(/^www\./, "") === LIVE_DOMAIN;
