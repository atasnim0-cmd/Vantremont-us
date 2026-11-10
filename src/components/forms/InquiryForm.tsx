"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitInquiry } from "@/app/contact/actions";
import type { FormState } from "@/lib/forms";
import { TOPICS, resolveTopic } from "@/lib/topics";
import { Field, FormMessage, Honeypot, RadioGroup, borderFor, inputBase } from "./Field";
import { FileField } from "./FileField";
import { Turnstile } from "./Turnstile";

export type InquiryKind = "general" | "meeting" | "rfp" | "membership";

const initial: FormState = { status: "idle" };
const groups = Array.from(new Set(TOPICS.map((t) => t.group)));

const ORDER: Record<InquiryKind, string[]> = {
  general: ["name", "email", "organization", "phone", "topic", "message", "consent"],
  meeting: ["name", "email", "organization", "jobTitle", "phone", "topic", "format", "timing", "message", "consent"],
  rfp: ["name", "email", "organization", "phone", "topic", "dueDate", "attachment", "message", "consent"],
  membership: [
    "name",
    "email",
    "organization",
    "phone",
    "firmWebsite",
    "country",
    "firmType",
    "accreditations",
    "message",
    "consent",
  ],
};

const COPY: Record<InquiryKind, { heading: string; submit: string; done: string; doneBody: string; message: string }> =
  {
    general: {
      heading: "Send us a message",
      submit: "Send message",
      done: "Thank you. Your message is on its way.",
      doneBody: "Someone from our team will read it and reply by email, usually within two business days.", // LAUNCH-CONFIRM: response time
      message: "How can we help?",
    },
    meeting: {
      heading: "Request a meeting",
      submit: "Request meeting",
      done: "Thank you. We have your request.",
      doneBody: "We will reply by email to suggest times with the right people from our team.",
      message: "What would you like to discuss?",
    },
    rfp: {
      heading: "Submit an RFP",
      submit: "Submit RFP",
      done: "Thank you. We have received your RFP.",
      doneBody:
        "We will confirm receipt by email, tell you who will lead our response and ask any clarifying questions before the deadline.",
      message: "Summary of the scope",
    },
    membership: {
      heading: "Apply to join the network",
      submit: "Send application",
      done: "Thank you. We have your application.",
      doneBody: "We review every application against the membership criteria and will reply by email with next steps.",
      message: "Tell us about your firm and why you want to join",
    },
  };

export function InquiryForm({ kind, privacyNote }: { kind: InquiryKind; privacyNote?: string }) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const [file, setFile] = useState({ ok: true, attempt: 0 });
  const topicRef = useRef<HTMLSelectElement>(null);
  const copy = COPY[kind];
  // The optional RFP attachment: valid unless a bad file is chosen in this attempt.
  const attempt = state.attempt ?? 0;
  const fileOk = file.attempt !== attempt || file.ok;
  const setFileOk = (ok: boolean) => setFile({ ok, attempt });

  // Pre-select the topic from ?topic= links without making the page dynamic.
  useEffect(() => {
    if (!topicRef.current || topicRef.current.value) return;
    const resolved = resolveTopic(new URLSearchParams(window.location.search).get("topic"));
    if (resolved) topicRef.current.value = resolved;
  }, []);

  // Move focus to the first invalid field.
  useEffect(() => {
    if (state.status !== "error" || !state.errors) return;
    const first = ORDER[kind].find((k) => state.errors?.[k]);
    if (!first) return;
    const el = document.getElementById(first) ?? document.querySelector<HTMLInputElement>(`input[name="${first}"]`);
    el?.focus();
  }, [state, kind]);

  if (state.status === "success") {
    return (
      <div role="status" className="border border-stone bg-paper p-8 sm:p-10">
        <CheckCircle2 aria-hidden="true" className="h-10 w-10 text-claret" strokeWidth={1.5} />
        <h2 className="display mt-5 text-3xl">{copy.done}</h2>
        <p className="mt-4 text-lg leading-relaxed">{copy.doneBody}</p>
        <Link href="/" className="text-link mt-8 inline-block font-semibold">
          Back to the home page
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
  const orgLabel = kind === "membership" ? "Firm name" : "Organization";
  const needsOrg = kind !== "general";
  const showTopic = kind !== "membership";

  return (
    // Keyed by attempt: React applies a select's defaultValue only on mount, so the form
    // remounts after each submission to restore every submitted value.
    <form
      key={state.attempt ?? 0}
      action={action}
      noValidate
      onSubmit={(ev) => {
        if (!fileOk) ev.preventDefault();
      }}
      className="relative border border-stone bg-sand/60 p-6 sm:p-10"
    >
      <input type="hidden" name="kind" value={kind} />
      <h2 className="font-serif text-[1.75rem] leading-tight text-ink">{copy.heading}</h2>
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
        <Field id="email" label={kind === "membership" ? "Email" : "Work email"} error={e.email}>
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
        <Field id="organization" label={orgLabel} optional={!needsOrg} error={e.organization}>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            defaultValue={v.organization}
            {...aria("organization")}
            className={`${inputBase} ${borderFor(e.organization)}`}
          />
        </Field>
        {kind === "meeting" && (
          <Field id="jobTitle" label="Job title" optional error={e.jobTitle}>
            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              autoComplete="organization-title"
              defaultValue={v.jobTitle}
              {...aria("jobTitle")}
              className={`${inputBase} ${borderFor(e.jobTitle)}`}
            />
          </Field>
        )}
        <Field id="phone" label="Phone" optional error={e.phone}>
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
        {kind === "membership" && (
          <>
            <Field id="firmWebsite" label="Firm website" optional error={e.firmWebsite}>
              <input
                id="firmWebsite"
                name="firmWebsite"
                type="url"
                inputMode="url"
                autoComplete="url"
                spellCheck={false}
                placeholder="https://"
                defaultValue={v.firmWebsite}
                {...aria("firmWebsite")}
                className={`${inputBase} ${borderFor(e.firmWebsite)}`}
              />
            </Field>
            <Field id="country" label="Country where the firm is based" error={e.country}>
              <input
                id="country"
                name="country"
                type="text"
                autoComplete="country-name"
                defaultValue={v.country}
                {...aria("country")}
                className={`${inputBase} ${borderFor(e.country)}`}
              />
            </Field>
            <Field id="firmType" label="Kind of firm" error={e.firmType}>
              <select
                id="firmType"
                name="firmType"
                defaultValue={v.firmType ?? ""}
                {...aria("firmType")}
                className={`${inputBase} ${borderFor(e.firmType)}`}
              >
                <option value="" disabled>
                  Choose one
                </option>
                <option value="certification-body">Accredited certification body</option>
                <option value="cpa-firm">Licensed CPA firm</option>
                <option value="cybersecurity">Cybersecurity firm</option>
                <option value="advisory">Advisory or consulting firm</option>
                <option value="tax">Tax practice</option>
                <option value="other">Other</option>
              </select>
            </Field>
          </>
        )}
      </div>

      {showTopic && (
        <div className="mt-5">
          <Field id="topic" label={kind === "rfp" ? "Main service area" : "What can we help with?"} error={e.topic}>
            <select
              id="topic"
              name="topic"
              ref={topicRef}
              defaultValue={v.topic ?? ""}
              {...aria("topic")}
              className={`${inputBase} ${borderFor(e.topic)}`}
            >
              <option value="" disabled>
                Choose a topic
              </option>
              {groups.map((g) => (
                <optgroup key={g} label={g}>
                  {TOPICS.filter((t) => t.group === g).map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </Field>
        </div>
      )}

      {kind === "meeting" && (
        <div className="mt-6 grid gap-6">
          <RadioGroup
            name="format"
            legend="How would you like to meet?"
            error={e.format}
            defaultValue={v.format}
            options={[
              { value: "video", label: "Video call" },
              { value: "phone", label: "Phone" },
              { value: "in-person", label: "In person" },
            ]}
          />
          <RadioGroup
            name="timing"
            legend="When would suit you?"
            error={e.timing}
            defaultValue={v.timing}
            options={[
              { value: "this-week", label: "This week" },
              { value: "two-weeks", label: "Within two weeks" },
              { value: "this-month", label: "This month" },
              { value: "flexible", label: "I am flexible" },
            ]}
          />
        </div>
      )}

      {kind === "rfp" && (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id="dueDate" label="Response due date" optional error={e.dueDate}>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              defaultValue={v.dueDate}
              {...aria("dueDate")}
              className={`${inputBase} ${borderFor(e.dueDate)}`}
            />
          </Field>
          <div className="sm:col-span-2">
            <FileField name="attachment" label="RFP document" error={e.attachment} onValidity={setFileOk} />
          </div>
        </div>
      )}

      {kind === "membership" && (
        <div className="mt-5">
          <Field
            id="accreditations"
            label="Licenses and accreditations held"
            optional
            hint="For each, name the accreditation or licensing body and the scope, for example ANAB, ISO/IEC 27001 certification."
            error={e.accreditations}
          >
            <textarea
              id="accreditations"
              name="accreditations"
              rows={3}
              defaultValue={v.accreditations}
              {...aria("accreditations", true)}
              className={`${inputBase} ${borderFor(e.accreditations)} resize-y`}
            />
          </Field>
        </div>
      )}

      <div className="mt-5">
        <Field
          id="message"
          label={copy.message}
          hint="Please do not include passwords, account numbers or other confidential details."
          error={e.message}
        >
          <textarea
            id="message"
            name="message"
            rows={6}
            defaultValue={v.message}
            {...aria("message", true)}
            className={`${inputBase} ${borderFor(e.message)} resize-y`}
          />
        </Field>
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
            <Link href="/privacy" className="text-link">
              Privacy Policy
            </Link>{" "}
            and agree that Vantremont may use this information to respond. {privacyNote}
          </span>
        </label>
        {e.consent && (
          <p id="consent-error" className="mt-1.5 text-sm font-medium text-claret">
            {e.consent}
          </p>
        )}
      </div>

      <div className="mt-6">
        <Turnstile action={kind} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="press mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[3px] bg-claret px-6 font-semibold text-ivory hover:bg-claret-deep disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {pending && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
        {copy.submit}
      </button>
    </form>
  );
}
