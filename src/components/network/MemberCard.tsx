import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { shownLocations, type Member } from "@/content/members";
import { cn } from "@/lib/cn";

export function locationLine(m: Member): string {
  const locs = shownLocations(m);
  if (!locs.length) return "Location to be confirmed";
  return locs
    .map((l) => [l.city, l.regionName, l.country === "US" ? "United States" : l.countryName].filter(Boolean).join(", "))
    .join("; ");
}

/** A member firm as a linked card. Placeholder slots render as an outlined frame with no claims. */
export function MemberCard({ member, tone = "light" }: { member: Member; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  if (member.placeholder) {
    return (
      <Link
        href={`/member-firms/${member.slug}`}
        className={cn(
          "group flex h-full flex-col justify-between gap-8 border border-dashed p-7",
          dark ? "border-line-dark text-fog hover:border-fog" : "border-stone-dark text-slate hover:border-slate",
        )}
      >
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] uppercase">Member firm</p>
          <p className={cn("mt-3 font-serif text-2xl", dark ? "text-ivory" : "text-ink")}>Profile to be announced</p>
          <p className="mt-3 text-[0.95rem] leading-relaxed">
            A member firm will be listed here once its details are confirmed.
          </p>
        </div>
      </Link>
    );
  }
  return (
    <Link
      href={`/member-firms/${member.slug}`}
      className={cn(
        "card-link group flex h-full flex-col justify-between gap-8 border p-7",
        dark ? "border-line-dark bg-ink-soft hover:border-fog" : "border-stone bg-paper",
      )}
    >
      <div>
        <p className={cn("text-xs font-semibold tracking-[0.14em] uppercase", dark ? "text-rose" : "text-claret")}>
          {member.kind}
        </p>
        <p
          className={cn("mt-3 font-serif text-[1.75rem] leading-tight", dark ? "text-ivory" : "text-ink")}
          translate="no"
        >
          {member.name}
        </p>
        <p className={cn("mt-1 text-sm", dark ? "text-fog" : "text-slate")}>{locationLine(member)}</p>
        <p className={cn("mt-4 text-[0.95rem] leading-relaxed", dark ? "text-fog" : "text-body")}>{member.summary}</p>
      </div>
      <span className={cn("inline-flex items-center gap-2 font-semibold", dark ? "text-rose" : "text-claret")}>
        <span className="link-underline">View profile</span>
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
