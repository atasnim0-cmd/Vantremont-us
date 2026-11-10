import { cn } from "@/lib/cn";

/** Section label, h2 and optional intro. The label is numbered like the running head of a printed report. */
export function SectionHeader({
  num,
  label,
  title,
  intro,
  id,
  className,
  wide,
}: {
  num?: string;
  label: string;
  title: string;
  intro?: string;
  id?: string;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div className={cn(wide ? "max-w-4xl" : "max-w-3xl", className)}>
      <p className="index-label">
        {num && <span className="num">{num}</span>}
        {label}
      </p>
      <h2 id={id} className="display mt-5 text-[2.125rem] sm:text-[2.75rem] lg:text-[3.25rem]">
        {title}
      </h2>
      {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed">{intro}</p>}
    </div>
  );
}
