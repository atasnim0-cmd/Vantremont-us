"use client";

import { useEffect, useId, useState } from "react";
import { Search, X } from "lucide-react";
import { shownLocations, type Member } from "@/content/members";
import { inputBase } from "@/components/forms/Field";
import { MemberCard } from "./MemberCard";

/** Characters a visitor has to type before any firm is shown. */
const MIN_QUERY = 2;

function searchText(m: Member): string {
  return [
    m.name,
    m.legalName,
    m.kind,
    m.summary,
    ...m.services,
    ...m.areas,
    ...shownLocations(m).flatMap((l) => [l.city, l.regionName, l.countryName]),
    ...m.accreditations.map((a) => `${a.name} ${a.body}`),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

/**
 * Member firm lookup. The directory is not browsable: no firm is listed until the
 * visitor searches by name, city, state or service. The query is mirrored in the URL
 * (?q=) so a search can be linked to, and so the home page search box can hand off here.
 */
export function MemberDirectory({ members }: { members: Member[] }) {
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);
  const uid = useId();

  // Read the query from the URL once after hydration.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL after hydration
    setQuery(new URLSearchParams(window.location.search).get("q") ?? "");
    setReady(true);
  }, []);

  // Write the query back to the URL.
  useEffect(() => {
    if (!ready) return;
    const q = query.trim();
    history.replaceState(null, "", `${window.location.pathname}${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  }, [query, ready]);

  const q = query.trim().toLowerCase();
  const searching = q.length >= MIN_QUERY;
  const results = searching ? members.filter((m) => !m.placeholder && searchText(m).includes(q)) : [];

  return (
    <div>
      <form
        role="search"
        aria-label="Search member firms"
        onSubmit={(e) => e.preventDefault()}
        className="max-w-2xl border-y border-stone-dark py-6"
      >
        <label htmlFor={`${uid}-q`} className="text-sm font-semibold text-ink">
          Search member firms
        </label>
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3.5 mt-1 h-4 w-4 -translate-y-1/2 text-slate"
          />
          <input
            id={`${uid}-q`}
            name="q"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Firm name, city, state or service"
            autoComplete="off"
            enterKeyHint="search"
            className={`${inputBase} border-stone-dark pl-10 [&::-webkit-search-cancel-button]:hidden`}
          />
        </div>
      </form>

      <div className="mt-6 flex min-h-11 flex-wrap items-center justify-between gap-4">
        <p aria-live="polite" className="text-[0.95rem] text-slate">
          {searching ? (
            <>
              <span className="tabular font-semibold text-ink">{results.length}</span> member{" "}
              {results.length === 1 ? "firm matches" : "firms match"} &quot;{query.trim()}&quot;
            </>
          ) : (
            "Type at least two characters to search. Firms are shown only in search results."
          )}
        </p>
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="press inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-ink/25 px-4 text-sm font-semibold text-ink hover:border-ink"
          >
            <X aria-hidden="true" className="h-4 w-4" />
            Clear search
          </button>
        )}
      </div>

      {searching &&
        (results.length > 0 ? (
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {results.map((m) => (
              <li key={m.slug}>
                <MemberCard member={m} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 border border-dashed border-stone-dark p-8">
            <p className="font-serif text-2xl text-ink">No member firm matches that search.</p>
            <p className="mt-2">
              Check the spelling, try a city or a service, or contact us and we will point you to the right firm.
            </p>
          </div>
        ))}
    </div>
  );
}
