import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type RelatedItem = { title: string; href: string; summary?: string };

/** A short list of linked cards to related pages. */
export function RelatedLinks({ items }: { items: RelatedItem[] }) {
  return (
    <ul className={cn("grid gap-4 md:grid-cols-2", items.length % 3 === 0 && "lg:grid-cols-3")}>
      {items.map((it) => (
        <li key={it.href}>
          <Link
            href={it.href}
            className="card-link group flex h-full flex-col justify-between gap-6 border border-stone bg-paper p-6"
          >
            <span>
              <span className="block font-serif text-xl leading-snug text-ink group-hover:text-claret">{it.title}</span>
              {it.summary && <span className="mt-2 block text-[0.95rem] leading-relaxed text-slate">{it.summary}</span>}
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-5 w-5 text-claret transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
