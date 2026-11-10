import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { industries } from "@/content/industries";
import { photos } from "@/content/photos";
import { practices, servicePath, servicesFor } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "What We Do",
  description:
    "Advisory, audit and assurance, and tax services from Vantremont and its member firms, including certification and compliance readiness for ISO 27001, SOC 2, CMMC, HIPAA and PCI DSS.",
  path: "/what-we-do",
});

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "What we do", path: "/what-we-do" }]}
        label="What we do"
        title="Advisory, audit and assurance, and tax."
        intro={[
          "Three practices, and a network of member firms that hold the licenses and accreditations some of the work requires. Most clients start with one practice and add another when a deadline, a customer or a transaction calls for it.",
        ]}
      />

      {practices.map((p, i) => {
        const photo = photos[p.hero.photo];
        return (
          <section
            key={p.id}
            aria-labelledby={`practice-${p.id}`}
            className={i % 2 === 1 ? "border-y border-stone bg-paper" : undefined}
          >
            <div className="container-page grid gap-10 py-20 lg:grid-cols-12 lg:gap-12 lg:py-24">
              <div className={i % 2 === 1 ? "lg:order-2 lg:col-span-7" : "lg:col-span-7"}>
                <SectionHeader
                  num={String(i + 1).padStart(2, "0")}
                  label="Practice"
                  id={`practice-${p.id}`}
                  title={p.name}
                  intro={p.summary}
                />
                <ul className="mt-10 border-t border-stone-dark">
                  {servicesFor(p.id).map((s) => (
                    <li key={s.slug} className="border-b border-stone-dark">
                      <Link href={servicePath(s)} className="group flex items-start justify-between gap-6 py-5">
                        <span>
                          <span className="block font-serif text-[1.5rem] leading-tight text-ink transition-colors group-hover:text-claret">
                            {s.name}
                          </span>
                          <span className="mt-1 block max-w-xl text-[0.95rem] leading-relaxed text-slate">
                            {s.summary}
                          </span>
                        </span>
                        <ArrowRight aria-hidden="true" className="arrow-nudge mt-2 h-5 w-5 shrink-0 text-claret" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <ArrowLink href={p.path} className="mt-8">
                  {`${p.name} overview`}
                </ArrowLink>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1 lg:col-span-5" : "lg:col-span-5"}>
                <div className="relative aspect-[4/3] overflow-hidden bg-sand lg:sticky lg:top-28 lg:aspect-[4/5]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1344px) 520px, (min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="industries" className="container-page py-20 lg:py-24">
        <SectionHeader num="04" label="Industries" id="industries" title="Industries we serve" />
        <ul className="mt-10 grid gap-x-10 border-t border-stone-dark sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind) => (
            <li key={ind.slug} className="border-b border-stone-dark">
              <Link
                href={`/industries/${ind.slug}`}
                className="group flex min-h-16 items-center justify-between gap-4 py-4 font-serif text-xl text-ink transition-colors hover:text-claret"
              >
                {ind.name}
                <ArrowRight aria-hidden="true" className="arrow-nudge h-4 w-4 shrink-0 text-claret" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title="Not sure which practice you need?"
        body="Tell us what is being asked of you. We will route it to the right people."
      />
    </>
  );
}
