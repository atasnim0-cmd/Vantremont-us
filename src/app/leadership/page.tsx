import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ArrowLink } from "@/components/ui/ButtonLink";
import { leaders } from "@/content/leadership";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Leadership",
  description: "The leadership of Vantremont and how the firm and its network are governed.",
  path: "/leadership",
  noindex: leaders.length === 0,
});

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "About Vantremont", path: "/about" },
          { name: "Leadership", path: "/leadership" },
        ]}
        label="Leadership"
        title="The people accountable for Vantremont."
        intro={[
          "Our leaders are responsible for the quality of the work, for admitting and reviewing member firms, and for keeping advisory, audit and certification separate.",
        ]}
      />

      <section aria-labelledby="leaders" className="container-page py-20 lg:py-24">
        <SectionHeader num="01" label="Leadership" id="leaders" title="Leadership team" />
        {leaders.length === 0 ? (
          <div className="mt-10 max-w-2xl border border-dashed border-stone-dark p-8">
            <p className="font-serif text-2xl text-ink">Profiles will be published here.</p>
            <p className="mt-3 leading-relaxed">
              We are preparing profiles of our leadership team. In the meantime, you can read how the firm and its
              network are governed.
            </p>
            <ArrowLink href="/governance-and-independence" className="mt-6">
              Governance and independence
            </ArrowLink>
          </div>
        ) : (
          <ul className="mt-12 grid gap-x-12 gap-y-14 md:grid-cols-2">
            {leaders.map((l) => (
              <li key={l.name} className="rule pt-6">
                <h3 className="font-serif text-[1.75rem] leading-tight text-ink">{l.name}</h3>
                <p className="mt-1 font-semibold text-claret">{l.title}</p>
                {l.credentials && <p className="mt-1 text-sm text-slate">{l.credentials.join(", ")}</p>}
                <div className="mt-4 space-y-3 leading-relaxed">
                  {l.bio.map((b) => (
                    <p key={b.slice(0, 24)}>{b}</p>
                  ))}
                </div>
                {l.linkedin && (
                  <a
                    href={l.linkedin}
                    className="text-link mt-4 inline-block"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    LinkedIn profile
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <CtaBand
        title="Want to talk to our leadership?"
        body="Request a meeting and tell us what you would like to discuss."
        secondary={null}
      />
    </>
  );
}
