import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { practices } from "@/content/services";
import { licensing, site } from "@/content/site";

const columns = [
  {
    title: "What we do",
    links: [...practices.map((p) => ({ label: p.name, href: p.path })), { label: "Industries", href: "/industries" }],
  },
  {
    title: "Who we are",
    links: [
      { label: "About Vantremont", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Member firms", href: "/member-firms" },
      { label: "Join the network", href: "/join-the-network" },
      { label: "Governance and independence", href: "/governance-and-independence" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { label: "Request a meeting", href: "/contact/request-a-meeting" },
      { label: "Submit an RFP", href: "/contact/submit-an-rfp" },
      { label: "Contact us", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Legal and disclosures", href: "/legal" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of use", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

export function Footer() {
  const year = process.env.BUILD_YEAR ?? String(site.copyrightStartYear);
  const years = year === String(site.copyrightStartYear) ? year : `${site.copyrightStartYear} to ${year}`;

  return (
    <footer className="on-dark bg-ink text-fog">
      <div className="container-page">
        <div className="grid gap-10 border-b border-line-dark py-14 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-xl">
            <Logo tone="light" />
            <p className="mt-6 font-serif text-2xl leading-snug text-ivory sm:text-[1.75rem]">
              Advisory, audit and assurance, and tax, delivered by firms qualified to do the work.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact/request-a-meeting" variant="light">
              Request a meeting
            </ButtonLink>
            <ButtonLink href="/contact/submit-an-rfp" variant="outline-light" arrow={false}>
              Submit an RFP
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-xs font-semibold tracking-[0.14em] text-rose uppercase">{col.title}</h2>
              <ul className="mt-4 space-y-1">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-flex min-h-10 items-center text-[0.95rem] text-fog transition-colors hover:text-ivory md:min-h-8"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-6 border-t border-line-dark py-10 text-sm leading-relaxed lg:grid-cols-2 lg:gap-12">
          <p>{licensing.networkDisclaimer}</p>
          <div className="space-y-4">
            {!licensing.vantremontIsCpaFirm && <p>{licensing.attestDisclosure}</p>}
            <p>{licensing.certificationIndependence}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line-dark py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="tabular">&copy; {years}</span> {site.legalName}. All rights reserved.
          </p>
          <p>
            <a href={`mailto:${site.email.general}`} className="transition-colors hover:text-ivory">
              {site.email.general}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
