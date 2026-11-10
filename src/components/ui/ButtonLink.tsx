import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light" | "outline-light";

const styles: Record<Variant, string> = {
  primary: "bg-claret text-ivory hover:bg-claret-deep",
  secondary: "border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.03]",
  light: "bg-ivory text-ink hover:bg-paper",
  "outline-light": "border border-ivory/35 text-ivory hover:border-ivory",
};

/** The site's one button style, as a link. Primary is claret; secondary is an ink outline. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "press group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[3px] px-5 text-[0.95rem] font-semibold whitespace-nowrap",
        styles[variant],
        className,
      )}
    >
      {children}
      {arrow && <ArrowRight aria-hidden="true" className="arrow-nudge h-4 w-4" strokeWidth={2} />}
    </Link>
  );
}

/** Text link with an arrow, for "read more" style links inside sections. */
export function ArrowLink({
  href,
  children,
  className,
  tone = "claret",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: "claret" | "ink" | "light";
}) {
  const color = tone === "claret" ? "text-claret" : tone === "ink" ? "text-ink" : "text-ivory";
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-2 font-semibold", color, className)}>
      <span className="link-underline">{children}</span>
      <ArrowRight aria-hidden="true" className="arrow-nudge h-4 w-4 shrink-0" strokeWidth={2} />
    </Link>
  );
}
