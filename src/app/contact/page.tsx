import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageHero } from "@/components/sections/PageHero";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Contact Vantremont: request a meeting, submit an RFP or send a general question.",
  path: "/contact",
});

const PATHS = [
  {
    title: "Request a meeting",
    body: "Talk to us about a deadline, a framework or a transaction. We will bring the right people.",
    href: "/contact/request-a-meeting",
  },
  {
    title: "Submit an RFP",
    body: "Send a request for proposal, with the document attached, and tell us when the response is due.",
    href: "/contact/submit-an-rfp",
  },
  {
    title: "Join the network",
    body: "For independent firms that want to become members of the Vantremont network.",
    href: "/join-the-network",
  },
];

const EMAILS = [
  { label: "General questions", email: site.email.general },
  { label: "Requests for proposal", email: site.email.rfp },
  { label: "Careers", email: site.email.careers },
  { label: "Privacy requests", email: site.email.privacy },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        label="Contact"
        title="How can we help?"
        intro={["Choose the route that fits, or send a general message below. Every message is read by a person."]}
      />
      <section aria-label="Ways to contact us" className="container-page pt-14">
        <ul className="grid gap-4 md:grid-cols-3">
          {PATHS.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="card-link group flex h-full flex-col justify-between gap-8 border border-stone bg-paper p-7"
              >
                <span>
                  <span className="block font-serif text-[1.625rem] leading-tight text-ink group-hover:text-claret">
                    {p.title}
                  </span>
                  <span className="mt-2 block leading-relaxed text-slate">{p.body}</span>
                </span>
                <ArrowRight aria-hidden="true" className="arrow-nudge h-5 w-5 text-claret" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section aria-label="General message" className="container-page py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-serif text-[1.75rem] leading-tight text-ink">Email us directly</h2>
            <dl className="mt-6 border-t border-stone">
              {EMAILS.map((e) => (
                <div key={e.email} className="border-b border-stone py-4">
                  <dt className="text-sm text-slate">{e.label}</dt>
                  <dd>
                    <a href={`mailto:${e.email}`} className="text-link font-semibold break-all">
                      {e.email}
                    </a>
                  </dd>
                </div>
              ))}
              {site.phone.show && (
                <div className="border-b border-stone py-4">
                  <dt className="text-sm text-slate">Phone</dt>
                  <dd>
                    <a href={`tel:${site.phone.tel}`} className="tabular text-link font-semibold">
                      {site.phone.display}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            {site.office.city && (
              <p className="mt-6 text-slate">
                Headquarters: {site.office.city}, {site.office.region}
              </p>
            )}
            <p className="mt-6 text-sm leading-relaxed text-slate">Hours: {site.hours}</p>
          </div>
          <div className="lg:col-span-8">
            <InquiryForm kind="general" />
          </div>
        </div>
      </section>
    </>
  );
}
