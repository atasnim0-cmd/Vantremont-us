import type { MetadataRoute } from "next";
import { absoluteUrl, isProduction } from "@/lib/seo";

/** Only the live production site is open to search engines. Previews and the vercel.app address are blocked. */
export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
