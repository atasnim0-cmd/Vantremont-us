import { cn } from "@/lib/cn";

/** Base input style. 16px text keeps iOS from zooming; 48px height meets touch target guidance. */
export const inputBase =
  "mt-2 block w-full min-w-0 min-h-12 rounded-[3px] border bg-paper px-3.5 py-3 text-base text-ink transition-[border-color,box-shadow] placeholder:text-slate/80 focus:border-claret focus:shadow-[0_0_0_3px_rgba(122,31,43,0.15)] focus:outline-none";

export function borderFor(error?: string) {
  return error ? "border-claret" : "border-stone-dark";
}

export function Field({
  id,
  label,
  error,
  optional,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[0.95rem] font-semibold text-ink">
        {label}
        {optional ? <span className="ml-1 font-normal text-slate">(optional)</span> : null}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-slate">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-claret">
          {error}
        </p>
      )}
    </div>
  );
}

/** Two or more radio options sharing one question. Each label and control share one hit target. */
export function RadioGroup({
  name,
  legend,
  options,
  error,
  defaultValue,
  className,
}: {
  name: string;
  legend: string;
  options: { value: string; label: string }[];
  error?: string;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <fieldset className={className} aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="text-[0.95rem] font-semibold text-ink">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-3">
        {options.map((o) => (
          <label
            key={o.value}
            className={cn(
              "flex min-h-12 cursor-pointer items-center gap-3 rounded-[3px] border bg-paper px-4 text-base text-ink has-[:checked]:border-claret has-[:checked]:bg-claret/[0.04]",
              borderFor(error),
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              defaultChecked={defaultValue === o.value}
              className="h-4 w-4 accent-claret"
            />
            {o.label}
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-claret">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/** Hidden from people and assistive technology. Bots that fill it are ignored. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="company_fax">Leave this field empty</label>
      <input id="company_fax" name="company_fax" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function FormMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p aria-live="polite" className="mt-5 border-l-2 border-claret bg-paper px-4 py-3 text-[0.95rem] text-ink">
      {message}
    </p>
  );
}
