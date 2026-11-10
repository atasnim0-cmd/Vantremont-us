import Image from "next/image";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { focalPoint, photos, type PhotoKey } from "@/content/photos";
import { cn } from "@/lib/cn";

/**
 * Hero for interior pages: breadcrumbs, a section label, the h1, an intro and up to
 * two actions, with an optional photograph or panel beside the text.
 */
export function PageHero({
  crumbs,
  label,
  title,
  intro = [],
  actions,
  photo,
  aside,
}: {
  crumbs: Crumb[];
  label?: string;
  title: string;
  intro?: string[];
  actions?: React.ReactNode;
  photo?: PhotoKey;
  /** Content for the right column when there is no photograph. */
  aside?: React.ReactNode;
}) {
  const p = photo ? photos[photo] : null;
  const twoCol = Boolean(p || aside);
  return (
    <section className="border-b border-stone">
      <div className="container-page pt-8 pb-14 sm:pt-10 lg:pb-20">
        <Breadcrumbs items={crumbs} />
        <div className={cn("mt-10 grid gap-10 lg:mt-14", twoCol && "lg:grid-cols-12 lg:gap-12")}>
          <div className={cn(twoCol ? "lg:col-span-7" : "max-w-4xl")}>
            {label && <p className="index-label">{label}</p>}
            <h1 className="display mt-5 text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem]">{title}</h1>
            {intro.length > 0 && (
              <div className="mt-7 max-w-2xl space-y-4 text-lg leading-relaxed text-body sm:text-[1.1875rem]">
                {intro.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>
            )}
            {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
          </div>
          {p && (
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden bg-sand lg:aspect-[4/5]">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  preload
                  placeholder="blur"
                  sizes="(min-width: 1344px) 520px, (min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: photo ? focalPoint(photo) : undefined }}
                />
              </div>
            </div>
          )}
          {!p && aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
