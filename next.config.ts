import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy.
 *
 * Pages are statically generated and served from Vercel's CDN, so a per-request
 * nonce is not available. Inline scripts are therefore allowed ('unsafe-inline'),
 * which Next.js needs for its hydration payload. Everything else is locked to our
 * own origin plus the two third parties we actually use:
 *   - challenges.cloudflare.com  (Turnstile spam protection on every form)
 *   - va.vercel-scripts.com      (Vercel Web Analytics debug script in development)
 * See docs/SECURITY.md for the trade-off and the upgrade path to nonces.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://va.vercel-scripts.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://challenges.cloudflare.com https://va.vercel-scripts.com",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  env: {
    // Stamped at build time so the footer copyright year updates on every deploy.
    BUILD_YEAR: String(new Date().getFullYear()),
  },
  experimental: {
    serverActions: {
      // Resumes and RFP attachments are capped at 4 MB in the forms. Vercel rejects
      // request bodies over 4.5 MB, so the limit leaves room for multipart overhead
      // and the other form fields without exceeding what the platform accepts.
      bodySizeLimit: "4.4mb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/.well-known/security.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
    ];
  },
};

export default nextConfig;
