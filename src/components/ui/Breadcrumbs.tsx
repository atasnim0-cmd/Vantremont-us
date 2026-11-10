import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/cn";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail plus its BreadcrumbList structured data. The home crumb is added automatically. */
export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  const light = tone === "light";
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-sm", light ? "text-fog" : "text-slate")}>
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.path} className="inline-flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={light ? "text-ivory" : "text-ink"}>
                  {c.name}
                </span>
              ) : (
                <>
                  <Link
                    href={c.path}
                    className={cn("transition-colors", light ? "hover:text-ivory" : "hover:text-ink")}
                  >
                    {c.name}
                  </Link>
                  <span aria-hidden="true" className="opacity-60">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbSchema(all)} />
    </nav>
  );
}
