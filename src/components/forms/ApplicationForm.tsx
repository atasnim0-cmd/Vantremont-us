"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitApplication } from "@/app/careers/actions";
import type { FormState } from "@/lib/forms";
import { Field, FormMessage, Honeypot, RadioGroup, borderFor, inputBase } from "./Field";
import { FileField } from "./FileField";
import { Turnstile } from "./Turnstile";

const initial: FormState = { status: "idle" };
const ORDER = [
  "name",
  "email",
  "phone",
  "location",
  "linkedin",
  "role",
  "resume",
  "coverNote",
  "workAuthorized",
  "needsSponsorship",
  "consent",
];

export function ApplicationForm({
  roles,
  defaultRole,
}: {
  roles: { slug: string; title: string }[];
  defaultRole?: string;
}) {
  const [state, action, pending] = useActionState(submitApplication, initial);
  // File state is tied to the attempt: the form remounts after each submission and the
  // browser clears the file input, so the resume has to be chosen again.
  const [file, setFile] = useState({ ok: false, tried: false, attempt: 0 });
  const attempt = state.attempt ?? 0;
  const fileOk = file.attempt === attempt && file.ok;
  const triedEmptyFile = file.attempt === attempt && file.tried;
  const setFileOk = (ok: boolean) => setFile({ ok, tried: false, attempt });
  const setTriedEmptyFile = (tried: boolean) =>
    setFile((f) => ({ ...(f.attempt === attempt ? f : { ok: false }), tried, attempt }));

  useEffect(() => {
    if (state.status !== "error" || !state.errors) return;
    const first = ORDER.find((k) => state.errors?.[k]);
    if (!first) return;
    const el = document.getElementById(first) ?? document.querySelector<HTMLInputElement>(`input[name="${first}"]`);
    el?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="border border-stone bg-paper p-8 sm:p-10">
        <CheckCircle2 aria-hidden="true" className="h-10 w-10 text-claret" strokeWidth={1.5} />
        {/* LAUNCH-CONFIRM: recruiting replies to every applicant */}
        <h2 className="display mt-5 text-3xl">Thank you. Your application is in.</h2>
        <p className="mt-4 text-lg leading-relaxed">
          A member of our recruiting team will read it. If your experience fits the role, we will email you to arrange a
          first conversation. We reply to every applicant, including when we decide not to move forward.
        </p>
        <Link href="/careers#open-roles" className="text-link mt-8 inline-block font-semibold">
          See other open roles
        </Link>
      </div>
    );
  }

  const e = state.errors ?? {};
  const v = state.values ?? {};
  const aria = (k: string, hint?: boolean) => ({
    "aria-invalid": Boolean(e[k]),
    "aria-describedby": e[k] ? `${k}-error` : hint ? `${k}-hint` : undefined,
  });
  const resumeError =
    e.resume ?? (triedEmptyFile && !fileOk ? "Please attach your resume as a PDF or Word (.docx) file." : undefined);

  return (
    <form
      key={state.attempt ?? 0}
      action={action}
      noValidate
      onSubmit={(ev) => {
        // A missing or oversized resume is caught here, before anything is uploaded.
        if (!fileOk) {
          ev.preventDefault();
          setTriedEmptyFile(true);
          document.getElementById("resume")?.focus();
        }
      }}
      className="relative border border-stone bg-sand/60 p-6 sm:p-10"
    >
      <h2 className="font-serif text-[1.75rem] leading-tight text-ink">Apply for this role</h2>
      <p className="mt-2 text-sm text-slate">All fields are required unless marked optional.</p>
      <FormMessage message={state.status === "error" ? state.message : undefined} />

      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={e.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            defaultValue={v.name}
            {...aria("name")}
            className={`${inputBase} ${borderFor(e.name)}`}
          />
        </Field>
        <Field id="email" label="Email" error={e.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            defaultValue={v.email}
            {...aria("email")}
            className={`${inputBase} ${borderFor(e.email)}`}
          />
        </Field>
        <Field id="phone" label="Phone" error={e.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            defaultValue={v.phone}
            {...aria("phone")}
            className={`${inputBase} ${borderFor(e.phone)}`}
          />
        </Field>
        <Field id="location" label="City and state" error={e.location}>
          <input
            id="location"
            name="location"
            type="text"
            autoComplete="address-level2"
            placeholder="Dallas, TX"
            defaultValue={v.location}
            {...aria("location")}
            className={`${inputBase} ${borderFor(e.location)}`}
          />
        </Field>
        <Field id="linkedin" label="LinkedIn profile" optional error={e.linkedin}>
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            inputMode="url"
            spellCheck={false}
            placeholder="https://www.linkedin.com/in/"
            defaultValue={v.linkedin}
            {...aria("linkedin")}
            className={`${inputBase} ${borderFor(e.linkedin)}`}
          />
        </Field>
        <Field id="role" label="Role" error={e.role}>
          <select
            id="role"
            name="role"
            defaultValue={v.role ?? defaultRole ?? ""}
            {...aria("role")}
            className={`${inputBase} ${borderFor(e.role)}`}
          >
            <option value="" disabled>
              Choose a role
            </option>
            {roles.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.title}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <FileField name="resume" label="Resume" required error={resumeError} onValidity={setFileOk} />
      </div>

      <div className="mt-5">
        <Field
          id="coverNote"
          label="Cover note"
          optional
          hint="A few lines on why this role interests you are enough."
          error={e.coverNote}
        >
          <textarea
            id="coverNote"
            name="coverNote"
            rows={5}
            defaultValue={v.coverNote}
            {...aria("coverNote", true)}
            className={`${inputBase} ${borderFor(e.coverNote)} resize-y`}
          />
        </Field>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <RadioGroup
          name="workAuthorized"
          legend="Are you legally authorized to work in the United States?"
          error={e.workAuthorized}
          defaultValue={v.workAuthorized}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        <RadioGroup
          name="needsSponsorship"
          legend="Will you now or in the future need visa sponsorship to work in the United States?"
          error={e.needsSponsorship}
          defaultValue={v.needsSponsorship}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      </div>

      <Honeypot />

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-[0.95rem]">
          <input
            type="checkbox"
            name="consent"
            defaultChecked={v.consent === "on"}
            aria-invalid={Boolean(e.consent)}
            aria-describedby={e.consent ? "consent-error" : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-claret"
          />
          <span>
            I have read the{" "}
            <Link href="/privacy#applicants" className="text-link">
              applicant privacy notice
            </Link>{" "}
            and agree that Vantremont may use this information to consider my application.
          </span>
        </label>
        {e.consent && (
          <p id="consent-error" className="mt-1.5 text-sm font-medium text-claret">
            {e.consent}
          </p>
        )}
      </div>

      <div className="mt-6">
        <Turnstile action="application" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="press mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[3px] bg-claret px-6 font-semibold text-ivory hover:bg-claret-deep disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {pending && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
        Submit application
      </button>
    </form>
  );
}
