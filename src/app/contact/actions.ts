"use server";

import { z } from "zod";
import {
  checkDocument,
  deliver,
  isHoneypotFilled,
  textValues,
  verifyTurnstile,
  zodErrors,
  type CheckedFile,
  type FormState,
} from "@/lib/forms";
import { TOPIC_VALUES, topicLabel } from "@/lib/topics";

const KINDS = ["general", "meeting", "rfp", "membership"] as const;
type Kind = (typeof KINDS)[number];

const name = z.string().min(2, "Please enter your name.").max(100, "That name is too long.");
const email = z.email("Please enter a valid email address.").max(200);
const phone = z
  .string()
  .max(40, "That phone number is too long.")
  .regex(/^[0-9+().\-\s]*$/, "Please use digits and standard phone characters only.");
const consent = z.literal("on", { error: "Please confirm you have read the Privacy Policy." });
const message = (min: number, prompt: string) =>
  z.string().min(min, prompt).max(5000, "Please keep this under 5,000 characters.");

const schemas = {
  general: z.object({
    name,
    email,
    organization: z.string().max(150, "That name is too long."),
    phone,
    topic: z.enum(TOPIC_VALUES, { error: "Please choose a topic." }),
    message: message(10, "Please add a little more detail."),
    consent,
  }),
  meeting: z.object({
    name,
    email,
    organization: z.string().min(1, "Please enter your organization.").max(150, "That name is too long."),
    jobTitle: z.string().max(120, "That title is too long."),
    phone,
    topic: z.enum(TOPIC_VALUES, { error: "Please choose a topic." }),
    format: z.enum(["video", "phone", "in-person"], { error: "Please choose a meeting format." }),
    timing: z.enum(["this-week", "two-weeks", "this-month", "flexible"], { error: "Please choose a timeframe." }),
    message: message(10, "Please tell us briefly what you would like to discuss."),
    consent,
  }),
  rfp: z.object({
    name,
    email,
    organization: z.string().min(1, "Please enter your organization.").max(150, "That name is too long."),
    phone,
    topic: z.enum(TOPIC_VALUES, { error: "Please choose the main service area." }),
    dueDate: z
      .string()
      .regex(/^(\d{4}-\d{2}-\d{2})?$/, "Please enter a valid date.")
      .refine((v) => !v || new Date(`${v}T23:59:59`) >= new Date(), "The due date has already passed."),
    message: message(20, "Please summarize the scope in a few sentences."),
    consent,
  }),
  membership: z.object({
    name,
    email,
    organization: z.string().min(1, "Please enter your firm's name.").max(150, "That name is too long."),
    phone,
    firmWebsite: z.union([z.literal(""), z.url("Please enter a full web address, starting with https://").max(200)]),
    country: z.string().min(2, "Please enter the country where your firm is based.").max(80),
    firmType: z.enum(["certification-body", "cpa-firm", "cybersecurity", "advisory", "tax", "other"], {
      error: "Please choose the kind of firm.",
    }),
    accreditations: z.string().max(2000, "Please keep this under 2,000 characters."),
    message: message(20, "Please tell us a little about your firm and why you want to join."),
    consent,
  }),
} satisfies Record<Kind, z.ZodTypeAny>;

const FIELDS: Record<Kind, string[]> = {
  general: ["name", "email", "organization", "phone", "topic", "message", "consent"],
  meeting: ["name", "email", "organization", "jobTitle", "phone", "topic", "format", "timing", "message", "consent"],
  rfp: ["name", "email", "organization", "phone", "topic", "dueDate", "message", "consent"],
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

const LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  organization: "Organization",
  jobTitle: "Job title",
  phone: "Phone",
  topic: "Topic",
  format: "Meeting format",
  timing: "Timeframe",
  dueDate: "Response due",
  firmWebsite: "Firm website",
  country: "Country",
  firmType: "Kind of firm",
  accreditations: "Licenses and accreditations",
  message: "Message",
};

const ROUTES: Record<Kind, { toEnv: string; subject: (d: Record<string, string>) => string }> = {
  general: { toEnv: "CONTACT_TO_EMAIL", subject: (d) => `Website inquiry: ${topicLabel(d.topic)}` },
  meeting: {
    toEnv: "CONTACT_TO_EMAIL",
    subject: (d) => `Meeting request: ${topicLabel(d.topic)} from ${d.organization}`,
  },
  rfp: { toEnv: "RFP_TO_EMAIL", subject: (d) => `RFP: ${topicLabel(d.topic)} from ${d.organization}` },
  membership: { toEnv: "NETWORK_TO_EMAIL", subject: (d) => `Network membership application: ${d.organization}` },
};

export async function submitInquiry(prev: FormState, formData: FormData): Promise<FormState> {
  const result = await handle(formData);
  return { ...result, attempt: (prev.attempt ?? 0) + 1 };
}

async function handle(formData: FormData): Promise<FormState> {
  const kind = String(formData.get("kind") ?? "") as Kind;
  if (!KINDS.includes(kind)) return { status: "error", message: "Something went wrong. Please reload the page." };

  const raw = textValues(formData, FIELDS[kind]);

  // Honeypot: real people never fill this hidden field. Report success so bots learn nothing.
  if (isHoneypotFilled(formData)) return { status: "success" };

  const parsed = schemas[kind].safeParse({ ...raw, consent: raw.consent || undefined });
  const errors: Record<string, string> = parsed.success ? {} : zodErrors(parsed.error);

  let attachment: CheckedFile | null = null;
  if (kind === "rfp") {
    const checked = await checkDocument(formData.get("attachment"), { required: false, label: "RFP document" });
    if ("error" in checked) errors.attachment = checked.error;
    else attachment = checked.file;
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values: raw };
  }

  if (!(await verifyTurnstile(formData))) {
    return {
      status: "error",
      message: "We could not verify the form. Please complete the check and try again.",
      values: raw,
    };
  }

  const d = raw;
  const text = FIELDS[kind]
    .filter((k) => k !== "consent" && k !== "message")
    .map((k) => `${LABELS[k]}: ${k === "topic" ? topicLabel(d[k]) : d[k] || "Not provided"}`)
    .concat(["", d.message])
    .join("\n");

  const sent = await deliver({
    toEnv: ROUTES[kind].toEnv,
    subject: ROUTES[kind].subject(d),
    text,
    replyTo: d.email,
    attachments: attachment ? [attachment] : undefined,
  });
  if (!sent.ok) return { status: "error", message: sent.message, values: raw };
  return { status: "success" };
}
