import { shownLocations, type Member } from "@/content/members";
import { site } from "@/content/site";
import type { Faq } from "@/content/types";
import { absoluteUrl } from "./seo";

/** schema.org structured data builders. Rendered with <JsonLd />. */

const ORG_ID = absoluteUrl("/#organization");

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/brand/vantremont-mark.png"),
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    email: site.email.general,
    ...(site.phone.show ? { telephone: site.phone.tel } : {}),
    areaServed: { "@type": "Country", name: "United States" },
    knowsAbout: [
      "Certification readiness",
      "ISO/IEC 27001",
      "SOC 2",
      "CMMC",
      "HIPAA",
      "PCI DSS",
      "Financial statement audits",
      "Tax",
    ],
    ...(site.social.linkedin ? { sameAs: [site.social.linkedin] } : {}),
  };
}

function memberId(m: Member) {
  return absoluteUrl(`/member-firms/${m.slug}#organization`);
}

/** A member firm as its own Organization that is a member of Vantremont. */
export function memberSchema(m: Member) {
  const locations = shownLocations(m);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": memberId(m),
    name: m.name,
    legalName: m.legalName,
    description: m.summary,
    ...(m.website ? { url: m.website, sameAs: [m.website] } : {}),
    ...(m.email ? { email: m.email } : {}),
    memberOf: { "@id": ORG_ID, "@type": "Organization", name: site.name, url: site.url },
    ...(locations.length
      ? {
          address: locations.map((l) => ({
            "@type": "PostalAddress",
            ...(l.city ? { addressLocality: l.city } : {}),
            ...(l.region ? { addressRegion: l.region } : {}),
            addressCountry: l.country,
          })),
        }
      : {}),
    ...(m.accreditations.length
      ? {
          hasCredential: m.accreditations.map((a) => ({
            "@type": "EducationalOccupationalCredential",
            name: a.name,
            recognizedBy: { "@type": "Organization", name: a.body },
          })),
        }
      : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United States" },
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function jobPostingSchema(opts: {
  title: string;
  description: string;
  path: string;
  employmentType: string;
  datePosted: string;
  pay: { min: number; max: number } | null;
  remote: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: opts.title,
    description: opts.description,
    url: absoluteUrl(opts.path),
    datePosted: opts.datePosted,
    employmentType: "FULL_TIME",
    hiringOrganization: { "@id": ORG_ID, "@type": "Organization", name: site.name, sameAs: site.url },
    applicantLocationRequirements: { "@type": "Country", name: "United States" },
    ...(opts.remote ? { jobLocationType: "TELECOMMUTE" } : {}),
    ...(opts.pay
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "USD",
            value: { "@type": "QuantitativeValue", minValue: opts.pay.min, maxValue: opts.pay.max, unitText: "YEAR" },
          },
        }
      : {}),
  };
}
