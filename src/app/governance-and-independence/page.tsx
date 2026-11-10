import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { licensing, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Governance and Independence",
  description:
    "How Vantremont and its member firms are structured, how attest work is licensed, and how advisory and certification for the same client are kept separate.",
  path: "/governance-and-independence",
});

// LAUNCH-CONFIRM: annual member reviews, conflict checks and the concern process are in place
const SECTIONS = [
  {
    id: "structure",
    title: "How the network is structured",
    body: [licensing.networkDisclaimer],
    points: [
      "Every engagement letter names the firm that performs the work and is responsible for it.",
      "Member firms contract with their own clients and carry their own professional liability insurance.",
      "Vantremont admits member firms against written criteria and reviews them each year.",
    ],
  },
  {
    id: "attest",
    title: "Audit and attest work",
    body: [
      "In the United States, only a licensed CPA firm can perform and sign a financial statement audit, a review or a SOC examination. Large firms often split into a licensed CPA firm for attest work and a separate company for advisory and tax, and disclose that structure. We do the same.",
      licensing.vantremontIsCpaFirm
        ? "Vantremont is a licensed CPA firm for attest work in the states where it holds a license."
        : licensing.attestDisclosure,
    ],
    points: [
      "Before an audit or SOC examination is accepted, the CPA firm checks its independence from the client under AICPA rules, including any advisory or tax work done by other firms in the network.",
      "A CPA firm will not examine controls that it, or another member firm, designed or implemented for the same client.",
    ],
  },
  {
    id: "certification",
    title: "Certification independence",
    body: [
      "ISO/IEC 17021-1 sets the requirements for bodies that certify management systems. Among them: a certification body must not certify a management system on which it, or a body related to it, has provided consultancy.",
      licensing.certificationIndependence,
    ],
    points: [
      "When a client asks a member certification body for an audit, the body checks whether any firm in the network has advised that client on the system to be certified.",
      "If one has, the member body declines, and we help the client find another accredited body.",
      "Advisory teams do not take part in audits, certification decisions or the work of certification committees.",
    ],
  },
  {
    id: "tax-and-legal",
    title: "Tax services and legal advice",
    body: [
      "Vantremont is not a law firm and does not provide legal services. Our tax professionals, including those with law degrees, provide tax advisory services. When a matter needs legal advice, we work with the client's own legal counsel.",
    ],
    points: [],
  },
  {
    id: "concerns",
    title: "Raising a concern",
    body: [
      `If you believe a member firm has acted outside these rules, or that its profile is inaccurate, email ${site.email.general}. We look into every report and tell you what we found.`,
    ],
    points: [],
  },
];

export default function GovernancePage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "About Vantremont", path: "/about" },
          { name: "Governance and independence", path: "/governance-and-independence" },
        ]}
        label="Governance and independence"
        title="Who is responsible for what, and how we keep advice and assurance apart."
        intro={[
          "Clients, regulators and accreditation bodies need to know who stands behind each report and certificate. This page sets out how the network is structured and the independence rules every member firm follows.",
        ]}
      />
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <nav aria-label="On this page" className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold tracking-[0.14em] text-slate uppercase">On this page</p>
            <ol className="mt-4 space-y-1 border-l border-stone-dark">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px flex min-h-10 items-center gap-3 border-l border-transparent pl-4 text-[0.95rem] text-body transition-colors hover:border-claret hover:text-claret"
                  >
                    <span className="tabular text-slate">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <div className="space-y-16 lg:col-span-9">
          {SECTIONS.map((s, i) => (
            <section key={s.id} aria-labelledby={s.id} className="rule pt-8">
              <SectionHeader num={String(i + 1).padStart(2, "0")} label="Governance" id={s.id} title={s.title} />
              <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed">
                {s.body.map((b) => (
                  <p key={b.slice(0, 30)}>{b}</p>
                ))}
              </div>
              {s.points.length > 0 && (
                <ul className="prose-body mt-6 max-w-3xl">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <p className="text-slate">
            Full legal terms are in our{" "}
            <Link href="/legal" className="text-link">
              legal disclosures
            </Link>
            .
          </p>
        </div>
      </div>
      <CtaBand
        title="Questions about independence?"
        body="Ask before you engage us. We would rather answer the question than lose your trust later."
      />
    </>
  );
}
