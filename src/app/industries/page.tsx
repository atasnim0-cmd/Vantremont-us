import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { industries } from "@/content/industries";
import { photos } from "@/content/photos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "Vantremont serves technology, financial services, healthcare, manufacturing, energy, government contractors, private equity and nonprofit organizations.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "What we do", path: "/what-we-do" },
          { name: "Industries", path: "/industries" },
        ]}
        label="Industries"
        title="Industries where outside scrutiny is part of the job."
        intro={[
          "Our clients answer to someone outside the company: a customer's security team, a contracting officer, an examiner, a buyer or a grantor. These are the industries where we do most of that work.",
        ]}
      />
      <section aria-label="Industries" className="container-page py-16 lg:py-20">
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind) => {
            const p = photos[ind.photo];
            return (
              <li key={ind.slug}>
                <Link href={`/industries/${ind.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1344px) 300px, (min-width: 1024px) 23vw, (min-width: 640px) 48vw, 100vw"
                      className="photo-zoom object-cover"
                    />
                  </div>
                  <h2 className="mt-5 font-serif text-[1.625rem] leading-tight text-ink transition-colors group-hover:text-claret">
                    <span className="link-underline">{ind.name}</span>
                  </h2>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-slate">{ind.summary}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <CtaBand
        title="Your industry is not listed?"
        body="The frameworks and the tax rules are often the same across sectors. Tell us what you need."
      />
    </>
  );
}
