import { Plus } from "lucide-react";
import type { Faq } from "@/content/types";

/** Questions and answers as native disclosure widgets: keyboard accessible and searchable. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-stone border-y border-stone">
      {faqs.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-claret transition-transform duration-300 group-open:rotate-45"
            />
          </summary>
          <p className="max-w-3xl pb-6 leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
