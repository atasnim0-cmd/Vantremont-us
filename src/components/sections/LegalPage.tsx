import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { site } from "@/content/site";

/** Layout for long legal text: title, last-updated date and a readable measure. */
export function LegalPage({
  title,
  path,
  intro,
  children,
}: {
  title: string;
  path: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="border-b border-stone">
        <div className="container-page pt-8 pb-12 sm:pt-10 lg:pb-16">
          <Breadcrumbs items={[{ name: title, path }]} />
          <h1 className="display mt-10 text-[2.5rem] sm:text-[3.25rem] lg:mt-14 lg:text-[4rem]">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed">{intro}</p>}
          <p className="mt-6 text-sm text-slate">Last updated {site.legalLastUpdated}</p>
        </div>
      </section>
      <div className="container-page py-14 lg:py-20">
        <div className="prose-body max-w-3xl text-[1.0625rem] leading-relaxed">{children}</div>
      </div>
    </>
  );
}
