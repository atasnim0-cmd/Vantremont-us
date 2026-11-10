"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { inputBase } from "@/components/forms/Field";
import type { Role } from "@/content/roles";

type Filters = { practice: string; location: string; level: string };
const EMPTY: Filters = { practice: "", location: "", level: "" };
const KEYS = Object.keys(EMPTY) as (keyof Filters)[];

type Item = Pick<Role, "slug" | "title" | "practice" | "level" | "location" | "workModel" | "summary"> & {
  pay: string;
};

/** Open roles with practice, location and level filters, mirrored in the URL. */
export function RoleList({ roles, practices, levels }: { roles: Item[]; practices: string[]; levels: string[] }) {
  const [f, setF] = useState<Filters>(EMPTY);
  const [ready, setReady] = useState(false);
  const uid = useId();
  const locations = [...new Set(roles.map((r) => r.location))].sort();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setF(Object.fromEntries(KEYS.map((k) => [k, params.get(k) ?? ""])) as Filters);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const params = new URLSearchParams();
    for (const k of KEYS) if (f[k]) params.set(k, f[k]);
    const qs = params.toString();
    history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  }, [f, ready]);

  const results = roles.filter(
    (r) =>
      (!f.practice || r.practice === f.practice) &&
      (!f.location || r.location === f.location) &&
      (!f.level || r.level === f.level),
  );
  const active = KEYS.some((k) => f[k]);
  const select = (k: keyof Filters, label: string, all: string, options: string[]) => (
    <div>
      <label htmlFor={`${uid}-${k}`} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <select
        id={`${uid}-${k}`}
        value={f[k]}
        onChange={(e) => setF((prev) => ({ ...prev, [k]: e.target.value }))}
        className={`${inputBase} border-stone-dark`}
      >
        <option value="">{all}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      <form
        aria-label="Filter open roles"
        onSubmit={(e) => e.preventDefault()}
        className="grid gap-4 border-y border-stone-dark py-6 sm:grid-cols-3"
      >
        {select("practice", "Practice", "All practices", practices)}
        {select("location", "Location", "All locations", locations)}
        {select("level", "Level", "All levels", levels)}
      </form>
      <div className="mt-6 flex min-h-11 flex-wrap items-center justify-between gap-4">
        <p aria-live="polite" className="text-[0.95rem] text-slate">
          <span className="tabular font-semibold text-ink">{results.length}</span>{" "}
          {results.length === 1 ? "role" : "roles"}
          {active ? " match your filters" : " listed"}
        </p>
        {active && (
          <button
            type="button"
            onClick={() => setF(EMPTY)}
            className="press inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-ink/25 px-4 text-sm font-semibold text-ink hover:border-ink"
          >
            <X aria-hidden="true" className="h-4 w-4" />
            Clear filters
          </button>
        )}
      </div>
      {results.length > 0 ? (
        <ul className="mt-4 border-t border-stone-dark">
          {results.map((r) => (
            <li key={r.slug} className="border-b border-stone-dark">
              <Link
                href={`/careers/${r.slug}`}
                className="group grid gap-x-8 gap-y-2 py-6 md:grid-cols-[1fr_14rem_auto] md:items-center"
              >
                <span>
                  <span className="block font-serif text-[1.625rem] leading-tight text-ink transition-colors group-hover:text-claret">
                    {r.title}
                  </span>
                  <span className="mt-1 block max-w-2xl text-[0.95rem] leading-relaxed text-slate">{r.summary}</span>
                </span>
                <span className="text-[0.95rem] text-body">
                  <span className="block font-semibold text-ink">{r.practice}</span>
                  <span className="block">
                    {r.location}, {r.workModel.toLowerCase()}
                  </span>
                  <span className="block text-slate">{r.pay}</span>
                </span>
                <ArrowRight aria-hidden="true" className="arrow-nudge hidden h-5 w-5 text-claret md:block" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 border border-dashed border-stone-dark p-8">
          <p className="font-serif text-2xl text-ink">No roles match these filters.</p>
          <p className="mt-2">Clear a filter to see more roles.</p>
        </div>
      )}
    </div>
  );
}
