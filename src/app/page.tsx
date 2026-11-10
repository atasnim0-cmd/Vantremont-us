import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CertificationPathway } from "@/components/home/CertificationPathway";
import { IndustryIndex } from "@/components/home/IndustryIndex";
import { MemberSearchBox } from "@/components/network/MemberSearchBox";
import { NetworkMap } from "@/components/network/NetworkMap";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ArrowLink, ButtonLink } from "@/components/ui/ButtonLink";
import { industries } from "@/content/industries";
import { photos } from "@/content/photos";
import { practices, servicePath, servicesFor } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vantremont | Advisory, Audit and Assurance, and Tax",
  description:
    "Vantremont helps companies in the United States and abroad prepare for certification and compliance audits, and provides advisory, audit and assurance, and tax services through a network of independent member firms.",
  path: "/",
  absoluteTitle: true,
});

const FACTS = [
  {
    title: "Certification readiness",
    body: "ISO/IEC 27001, SOC 2, CMMC, HIPAA and PCI DSS, from gap assessment to audit day.",
  },
  {
    title: "Licensed for the work",
    body: "Audits and SOC reports are performed by licensed CPA firms in our network.",
  },
  { title: "Kept independent", body: "If we advise you on a system, a member body will not certify it." },
];

export default function HomePage() {
  const hero = photos.workingSession;
  return (
    <>
      {/* 1. Hero */}
      <section className="border-b border-stone">
        <div className="container-page grid gap-10 pt-10 pb-14 lg:min-h-[calc(100svh-76px)] lg:grid-cols-12 lg:gap-12 lg:pt-12 lg:pb-12">
          <div className="flex flex-col justify-between gap-12 lg:col-span-7">
            <div>
              <p className="index-label">Professional services firm and member network</p>
              <h1 className="display mt-6 text-[2.75rem] sm:text-[3.75rem] lg:text-[4.25rem] xl:text-[4.75rem]">
                Advisory, audit and tax for companies that have to <span className="display-em">prove it</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed sm:text-[1.1875rem]">
                Vantremont is a professional services firm and a network of independent member firms. We prepare
                companies in the United States and abroad for certification and compliance audits, and deliver advisory,
                audit and tax work through the firm qualified to do it.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact/request-a-meeting">Request a meeting</ButtonLink>
                <ButtonLink href="/what-we-do" variant="secondary" arrow={false}>
                  See what we do
                </ButtonLink>
              </div>
            </div>
            <dl className="grid gap-6 border-t border-stone-dark pt-6 sm:grid-cols-3">
              {FACTS.map((f) => (
                <div key={f.title}>
                  <dt className="text-sm font-semibold text-ink">{f.title}</dt>
                  <dd className="mt-1 text-[0.95rem] leading-relaxed text-slate">{f.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative min-h-[22rem] overflow-hidden bg-sand sm:min-h-[28rem] lg:col-span-5 lg:min-h-0">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1344px) 520px, (min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. What we do */}
      <section aria-labelledby="what-we-do" className="bg-paper">
        <div className="container-page py-20 lg:py-28">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeader
              num="01"
              label="What we do"
              id="what-we-do"
              title="Three practices, held to one standard."
              intro="Each practice works on its own and with the others. A SOC 2 readiness project can sit next to a sales tax review and a diligence report, run by people who talk to each other."
            />
            <ArrowLink href="/what-we-do" className="shrink-0">
              All services
            </ArrowLink>
          </div>
          <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-10">
            {practices.map((p, i) => (
              <div key={p.id} className="border-t-2 border-ink pt-6">
                <p className="tabular text-sm font-semibold text-slate">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-serif text-[2rem] leading-tight text-ink">
                  <Link href={p.path} className="transition-colors hover:text-claret">
                    {p.name}
                  </Link>
                </h3>
                <p className="mt-3 leading-relaxed">{p.summary}</p>
                <ul className="mt-6 border-t border-stone">
                  {servicesFor(p.id).map((s) => (
                    <li key={s.slug} className="border-b border-stone">
                      <Link
                        href={servicePath(s)}
                        className="group flex min-h-12 items-center justify-between gap-4 py-2 text-ink transition-colors hover:text-claret"
                      >
                        {s.name}
                        <ArrowRight aria-hidden="true" className="arrow-nudge h-4 w-4 shrink-0 text-claret" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Certification pathway */}
      <section aria-labelledby="pathway" className="border-y border-stone">
        <div className="container-page py-20 lg:py-28">
          <SectionHeader
            num="02"
            label="Certification pathway"
            id="pathway"
            wide
            title="From gap assessment to certificate, with a clear line between advisor and auditor."
            intro="We prepare you for the audit. An accredited body that had no part in that preparation performs it. That separation is what makes the certificate worth having."
          />
          <div className="mt-20">
            <CertificationPathway />
          </div>
          <p className="mt-12 max-w-3xl border-t border-stone pt-5 text-sm leading-relaxed text-slate">
            Shown for an ISO management system such as ISO/IEC 27001. For SOC 2, the last three steps are an examination
            by a licensed CPA firm, which issues a report rather than a certificate. For CMMC Level 2, they are an
            assessment by an authorized C3PAO.{" "}
            <Link href="/governance-and-independence" className="text-link">
              How we keep advisory and certification separate
            </Link>
          </p>
        </div>
      </section>

      {/* 4. Member network */}
      <section aria-labelledby="network" className="on-dark bg-ink text-fog">
        <div className="container-page py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="index-label">
                <span className="num">03</span>Member network
              </p>
              <h2 id="network" className="display mt-5 text-[2.125rem] text-ivory sm:text-[2.75rem] lg:text-[3.25rem]">
                Independent firms, each responsible for its own work.
              </h2>
              <p className="mt-6 text-lg leading-relaxed">
                Vantremont works with registered member firms: cybersecurity consultancies, security testing specialists
                and compliance assessors. Each one is a separate company. Its profile lists only the services, locations
                and accreditations it has confirmed.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-8">
                <ArrowLink href="/member-firms" tone="light">
                  Search member firms
                </ArrowLink>
                <ArrowLink href="/join-the-network" tone="light">
                  Join the network
                </ArrowLink>
              </div>
            </div>
            <div className="lg:col-span-7">
              <NetworkMap />
            </div>
          </div>
          <div className="mt-14 border-t border-line-dark pt-10">
            <MemberSearchBox />
          </div>
        </div>
      </section>

      {/* 5. Industries */}
      <section aria-labelledby="industries">
        <div className="container-page py-20 lg:py-28">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeader
              num="04"
              label="Industries"
              id="industries"
              title="Where our work concentrates."
              intro="Most of our clients answer to someone outside the company: a customer's security team, a federal contracting officer, a regulator, a buyer or a grantor."
            />
            <ArrowLink href="/industries" className="shrink-0">
              All industries
            </ArrowLink>
          </div>
          <div className="mt-14">
            <IndustryIndex
              items={industries.map((i) => ({ slug: i.slug, name: i.name, summary: i.summary, photo: i.photo }))}
            />
          </div>
        </div>
      </section>

      {/* 6. Careers */}
      <section aria-labelledby="careers" className="border-t border-stone bg-sand">
        <div className="grid lg:grid-cols-2">
          <div className="group relative min-h-[20rem] overflow-hidden sm:min-h-[26rem] lg:min-h-[36rem]">
            <Image
              src={photos.officeTeam.src}
              alt={photos.officeTeam.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="photo-zoom object-cover"
            />
          </div>
          <div className="flex items-center px-5 py-16 sm:px-8 lg:px-16 xl:px-24">
            <div className="max-w-xl">
              <p className="index-label">
                <span className="num">05</span>Careers
              </p>
              <h2 id="careers" className="display mt-5 text-[2.125rem] sm:text-[2.75rem] lg:text-[3.25rem]">
                Careers in audit, tax, advisory and cybersecurity.
              </h2>
              {/* LAUNCH-CONFIRM: HR commits to listing pay ranges and replying to every applicant */}
              <p className="mt-6 text-lg leading-relaxed">
                We hire people who like getting the details right and explaining them plainly. Every role lists its pay
                range, location and work model, and every applicant hears back from us.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/careers#open-roles">See open roles</ButtonLink>
                <ButtonLink href="/careers" variant="secondary" arrow={false}>
                  Working at Vantremont
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Closing call to action */}
      <CtaBand
        title="Tell us what you need to prove, and to whom."
        body="A first meeting is a conversation about your deadline, your scope and the people asking. You will leave it knowing what the work involves and who would do it."
      />
    </>
  );
}
