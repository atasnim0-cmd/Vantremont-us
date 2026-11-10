import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Meeting",
  description:
    "Request a meeting with Vantremont about advisory, certification readiness, audit and assurance, or tax.",
  path: "/contact/request-a-meeting",
});

const EXPECT = [
  { title: "We reply by email", body: "With suggested times and the names of the people who will join." },
  { title: "A first conversation", body: "About your deadline, your scope and who is asking for what." },
  { title: "A written proposal", body: "If there is work to do, a proposal with scope, team, timeline and fee." },
];

export default function MeetingPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Contact", path: "/contact" },
          { name: "Request a meeting", path: "/contact/request-a-meeting" },
        ]}
        label="Request a meeting"
        title="Tell us what you need to discuss."
        intro={[
          "A first meeting carries no fee and no commitment. It helps both sides decide whether we are the right fit.",
        ]}
      />
      <section aria-label="Meeting request" className="container-page py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-serif text-[1.75rem] leading-tight text-ink">What happens next</h2>
            {/* LAUNCH-CONFIRM: first meetings are free and proposals include scope, team, timeline and fee */}
            <ol className="mt-6 border-t border-stone">
              {EXPECT.map((e, i) => (
                <li key={e.title} className="grid grid-cols-[2.5rem_1fr] border-b border-stone py-5">
                  <span className="tabular font-serif text-2xl text-claret">{i + 1}</span>
                  <span>
                    <span className="block font-semibold text-ink">{e.title}</span>
                    <span className="mt-1 block leading-relaxed text-slate">{e.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-8">
            <InquiryForm kind="meeting" />
          </div>
        </div>
      </section>
    </>
  );
}
