import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Vantremont",
  description:
    "Vantremont is a professional services firm and a network of independent member firms providing advisory, audit and assurance, and tax services in the United States and abroad.",
  path: "/about",
});

const PRINCIPLES = [
  {
    title: "The right firm signs the work",
    body: "An audit opinion, a SOC report or a certificate is only as good as the license or accreditation behind it. We match each piece of work to a firm that holds what the work requires, and we name that firm in writing before the engagement starts.",
  },
  {
    title: "Advice and assurance stay apart",
    body: "The people who help you build a control or a management system do not also certify or attest to it. That rule is older than our firm and it is the reason certificates and reports are trusted.",
  },
  {
    title: "Plain answers",
    body: "If you are not ready for an audit, we say so. If a framework does not apply to you, we say that too. Reports are written for the people who have to act on them.",
  },
  {
    title: "Only confirmed facts",
    body: "Member profiles list only the locations, services and accreditations each firm has confirmed. We do not publish client names, testimonials or statistics we cannot stand behind.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About Vantremont", path: "/about" }]}
        label="About Vantremont"
        title="A professional services firm built around who is qualified to do the work."
        intro={[
          "Vantremont provides advisory, audit and assurance, and tax services to companies in the United States and abroad. Much of our advisory work helps companies prepare for certification and compliance audits.",
          "We work with a network of registered member firms. Some are cybersecurity specialists, some are licensed audit firms and some are accredited certification bodies. Each is an independent company, and each does the work it is qualified to do.",
        ]}
        photo="partnersMeeting"
        actions={
          <>
            <ButtonLink href="/member-firms">Meet the member firms</ButtonLink>
            <ButtonLink href="/governance-and-independence" variant="secondary" arrow={false}>
              How the network is governed
            </ButtonLink>
          </>
        }
      />

      <section aria-labelledby="how" className="container-page py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              num="01"
              label="How we work"
              id="how"
              title="One point of contact, and the right firm for each piece."
            />
          </div>
          <div className="space-y-5 text-lg leading-relaxed lg:col-span-7 lg:pt-12">
            <p>
              A client usually comes to us with a deadline: a customer asking for a SOC 2 report, a contract that needs
              CMMC, a tax question that crosses state or national lines, or a transaction that needs diligence.
            </p>
            <p>
              We scope the work, put the right people on it and coordinate across practices. When part of the work has
              to be performed by a licensed CPA firm or an accredited certification body, it is performed by a member
              firm that holds that license or accreditation, under its own engagement letter.
            </p>
            <p>
              Each member firm is a separate legal entity and responsible only for its own work. Our{" "}
              <a href="/legal" className="text-link">
                legal disclosures
              </a>{" "}
              explain the structure in full.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles" className="border-y border-stone bg-paper">
        <div className="container-page py-20 lg:py-24">
          <SectionHeader num="02" label="Principles" id="principles" title="What we hold ourselves to" />
          <ol className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title} className="rule pt-6">
                <span className="tabular font-serif text-3xl text-claret">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-serif text-[1.625rem] leading-tight text-ink">{p.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="more" className="container-page py-20 lg:py-24">
        <SectionHeader num="03" label="Who we are" id="more" title="More about Vantremont" />
        <div className="mt-10">
          <RelatedLinks
            items={[
              { title: "Leadership", href: "/leadership", summary: "The people accountable for the firm." },
              {
                title: "Member firms",
                href: "/member-firms",
                summary: "Independent firms in the network and what each one does.",
              },
              { title: "Careers", href: "/careers", summary: "Open roles in audit, tax, advisory and cybersecurity." },
            ]}
          />
        </div>
      </section>

      <CtaBand title="Start with a conversation." />
    </>
  );
}
