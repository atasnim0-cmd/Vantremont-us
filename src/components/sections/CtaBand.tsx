import { ButtonLink } from "@/components/ui/ButtonLink";

/** Closing call to action on a flat claret band. */
export function CtaBand({
  title,
  body,
  primary = { label: "Request a meeting", href: "/contact/request-a-meeting" },
  secondary = { label: "Submit an RFP", href: "/contact/submit-an-rfp" },
}: {
  title: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section className="on-dark bg-claret text-ivory">
      <div className="container-page grid gap-10 py-20 lg:grid-cols-12 lg:items-end lg:py-24">
        <div className="lg:col-span-8">
          <h2 className="display text-[2.25rem] text-ivory sm:text-[3rem] lg:text-[3.5rem]">{title}</h2>
          {body && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/90">{body}</p>}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
          <ButtonLink href={primary.href} variant="light">
            {primary.label}
          </ButtonLink>
          {secondary && (
            <ButtonLink href={secondary.href} variant="outline-light" arrow={false}>
              {secondary.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
