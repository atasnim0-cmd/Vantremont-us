"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { borderFor } from "./Field";

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

const fmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

/**
 * PDF or DOCX upload, 4 MB at most. The size is checked in the browser as soon as a
 * file is chosen, so nobody waits for an upload that the server would refuse.
 */
export function FileField({
  name,
  label,
  required,
  error,
  onValidity,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  onValidity?: (ok: boolean) => void;
}) {
  const [picked, setPicked] = useState<{ name: string; size: number } | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const shown = localError ?? error;

  return (
    <div>
      <label htmlFor={name} className="text-[0.95rem] font-semibold text-ink">
        {label}
        {!required && <span className="ml-1 font-normal text-slate">(optional)</span>}
      </label>
      <div
        className={`relative mt-2 flex min-h-20 items-center gap-4 rounded-[3px] border border-dashed bg-paper px-4 py-4 focus-within:border-claret focus-within:shadow-[0_0_0_3px_rgba(122,31,43,0.15)] ${borderFor(shown)}`}
      >
        <FileText aria-hidden="true" className="h-6 w-6 shrink-0 text-claret" strokeWidth={1.5} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base text-ink">{picked ? picked.name : "Choose a PDF or Word (.docx) file"}</p>
          <p className="text-sm text-slate">
            {picked ? `${fmt.format(picked.size / 1024 / 1024)} MB` : "4 MB maximum"}
          </p>
        </div>
        <span className="pointer-events-none shrink-0 rounded-[3px] border border-ink/25 px-3 py-2 text-sm font-semibold text-ink">
          Browse
        </span>
        <input
          id={name}
          name={name}
          type="file"
          required={required}
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          aria-invalid={Boolean(shown)}
          aria-describedby={shown ? `${name}-error` : undefined}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          onChange={(e) => {
            const f = e.currentTarget.files?.[0];
            if (!f) {
              setPicked(null);
              setLocalError(null);
              onValidity?.(!required);
              return;
            }
            setPicked({ name: f.name, size: f.size });
            const ext = f.name.toLowerCase().split(".").pop();
            let problem: string | null = null;
            if (ext !== "pdf" && ext !== "docx") problem = "Please choose a PDF or Word (.docx) file.";
            else if (f.size > MAX_UPLOAD_BYTES)
              problem = "This file is larger than 4 MB. Please choose a smaller file.";
            setLocalError(problem);
            onValidity?.(!problem);
          }}
        />
      </div>
      {shown && (
        <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-claret">
          {shown}
        </p>
      )}
    </div>
  );
}
