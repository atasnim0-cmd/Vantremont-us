import { Search } from "lucide-react";
import { inputBase } from "@/components/forms/Field";

/**
 * Search box for the dark member network band on the home page. A plain GET form that
 * opens the directory with the query (/member-firms?q=), so it works without JavaScript
 * and never lists firms on the home page itself.
 */
export function MemberSearchBox() {
  return (
    <form role="search" aria-label="Search member firms" action="/member-firms" method="get">
      <label htmlFor="home-member-search" className="font-serif text-2xl text-ivory sm:text-[1.75rem]">
        Looking for a specific member firm?
      </label>
      <p className="mt-2 text-[0.95rem]">Search by firm name, city, state or service.</p>
      <div className="mt-5 flex max-w-2xl flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate"
          />
          <input
            id="home-member-search"
            name="q"
            type="search"
            required
            minLength={2}
            placeholder="Firm name, city, state or service"
            autoComplete="off"
            enterKeyHint="search"
            className={`${inputBase} mt-0! border-transparent pl-10`}
          />
        </div>
        <button
          type="submit"
          className="press inline-flex min-h-12 items-center justify-center rounded-[3px] bg-ivory px-6 font-semibold text-ink hover:bg-paper"
        >
          Search
        </button>
      </div>
    </form>
  );
}
