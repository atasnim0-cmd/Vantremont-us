"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { photos, type PhotoKey } from "@/content/photos";
import { cn } from "@/lib/cn";

type Item = { slug: string; name: string; summary: string; photo: PhotoKey };

/**
 * Industries as an index: a numbered list of links, with a photograph that follows the
 * row under the pointer or keyboard focus on wide screens. Every row is a plain link,
 * so the list works fully without JavaScript; the photograph is extra.
 */
export function IndustryIndex({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <ol className="border-t border-stone-dark lg:col-span-7">
        {items.map((it, i) => (
          <li key={it.slug} className="border-b border-stone-dark">
            <Link
              href={`/industries/${it.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-5 sm:py-6"
            >
              <span className="tabular text-sm font-semibold text-slate">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span
                  className={cn(
                    "block font-serif text-[1.625rem] leading-tight transition-colors sm:text-[2rem]",
                    active === i ? "lg:text-claret" : "",
                    "text-ink group-hover:text-claret",
                  )}
                >
                  {it.name}
                </span>
                <span className="mt-1.5 block max-w-xl text-[0.95rem] leading-relaxed text-slate">{it.summary}</span>
              </span>
              <ArrowRight
                aria-hidden="true"
                className="arrow-nudge h-5 w-5 self-center text-claret opacity-60 transition-opacity group-hover:opacity-100"
              />
            </Link>
          </li>
        ))}
      </ol>
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-sand">
          {items.map((it, i) => (
            <Image
              key={it.slug}
              src={photos[it.photo].src}
              alt=""
              fill
              sizes="(min-width: 1344px) 520px, 40vw"
              placeholder="blur"
              className={cn(
                "object-cover transition-[opacity,transform] duration-500 ease-out",
                active === i ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
