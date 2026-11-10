import { cn } from "@/lib/cn";

/** A statement about who performs the work: licensing, independence or member delivery. */
export function Notice({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside className={cn("border-l-2 border-claret bg-paper px-6 py-6 sm:px-8", className)}>
      <p className="text-xs font-semibold tracking-[0.14em] text-claret uppercase">{title}</p>
      <div className="mt-3 max-w-3xl leading-relaxed text-ink">{children}</div>
    </aside>
  );
}
