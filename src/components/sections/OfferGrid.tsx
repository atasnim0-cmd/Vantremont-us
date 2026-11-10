import type { Offer } from "@/content/types";
import { cn } from "@/lib/cn";

/** What we offer: columns separated by hairlines, each with a short list. */
export function OfferGrid({ offers }: { offers: Offer[] }) {
  return (
    <div className={cn("grid gap-x-12 gap-y-12 md:grid-cols-2", offers.length === 3 && "lg:grid-cols-3")}>
      {offers.map((o, i) => (
        <div key={o.title} className="rule pt-6">
          <p className="tabular text-sm font-semibold text-slate">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 font-serif text-[1.625rem] leading-tight text-ink">{o.title}</h3>
          <p className="mt-3 text-body">{o.body}</p>
          {o.items && (
            <ul className="mt-5 divide-y divide-stone border-y border-stone">
              {o.items.map((item) => (
                <li key={item} className="py-2.5 text-[0.98rem] text-ink">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
