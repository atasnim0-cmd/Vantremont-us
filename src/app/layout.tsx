import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Hanken_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { getNavigation, navLinks } from "@/content/navigation";
import { site } from "@/content/site";
import { organizationSchema } from "@/lib/schema";
import { isProduction } from "@/lib/seo";
import "./globals.css";

// Every page on this site is static marketing content. Fail the build if a
// change ever makes a route render per request.
export const ensureStatic = "navigation";

/*
 * Newsreader, display optical size (72), regular weight: the only cut the headings use.
 * Self-hosted as a single static WOFF2 (37 KB) instead of the 145 KB variable font with
 * every optical size, which kept slowing the first load on phones.
 */
const newsreader = localFont({
  src: "../assets/fonts/Newsreader-Display-Regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Vantremont | Advisory, Audit and Assurance, and Tax",
    template: "%s | Vantremont",
  },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
  robots: isProduction ? undefined : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ec",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={`${newsreader.variable} ${hanken.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[100] bg-ink px-4 py-3 font-semibold text-ivory focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to main content
        </a>
        <Header groups={getNavigation()} links={navLinks} />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <JsonLd data={organizationSchema()} />
        {/* Vercel Web Analytics only exists on Vercel deployments. Enable it in the Vercel dashboard. */}
        {process.env.VERCEL && (
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
        )}
      </body>
    </html>
  );
}
