import type { Step } from "@/content/types";
import { cn } from "@/lib/cn";

/** Numbered steps in a row on wide screens, stacked on phones. */
export function StepList({ steps, tone = "light" }: { steps: Step[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ol
      className={cn(
        "grid gap-px border",
        steps.length >= 5 ? "md:grid-cols-3 lg:grid-cols-5" : "md:grid-cols-2 lg:grid-cols-4",
        dark ? "border-line-dark bg-line-dark" : "border-stone bg-stone",
      )}
    >
      {steps.map((s, i) => (
        <li key={s.title} className={cn("p-6 sm:p-7", dark ? "bg-ink" : "bg-ivory")}>
          <span className={cn("tabular font-serif text-3xl", dark ? "text-rose" : "text-claret")}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={cn("mt-4 text-lg font-semibold", dark ? "text-ivory" : "text-ink")}>{s.title}</h3>
          <p className={cn("mt-2 text-[0.98rem] leading-relaxed", dark ? "text-fog" : "text-body")}>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
