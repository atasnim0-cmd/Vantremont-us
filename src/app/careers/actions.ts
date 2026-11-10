"use server";

import { z } from "zod";
import { roles } from "@/content/roles";
import {
  checkDocument,
  deliver,
  isHoneypotFilled,
  textValues,
  verifyTurnstile,
  zodErrors,
  type FormState,
} from "@/lib/forms";

const ROLE_SLUGS = roles.map((r) => r.slug) as [string, ...string[]];

/**
 * Application fields. We ask only what is needed to assess the application, plus the
 * two work authorization questions employers may lawfully ask. No questions about age,
 * race, religion or any other protected characteristic.
 */
const schema = z.object({
  name: z.string().min(2, "Please enter your full name.").max(100, "That name is too long."),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .min(7, "Please enter a phone number.")
    .max(40, "That phone number is too long.")
    .regex(/^[0-9+().\-\s]*$/, "Please use digits and standard phone characters only."),
  location: z.string().min(2, "Please enter your city and state.").max(120, "That is too long."),
  linkedin: z.union([
    z.literal(""),
    z
      .url("Please enter a full web address, starting with https://")
      .max(200)
      .refine((v) => /^https:\/\/([a-z]+\.)?linkedin\.com\//i.test(v), "Please enter a LinkedIn profile address."),
  ]),
  role: z.enum(ROLE_SLUGS, { error: "Please choose the role you are applying for." }),
  coverNote: z.string().max(4000, "Please keep the note under 4,000 characters."),
  workAuthorized: z.enum(["yes", "no"], { error: "Please answer this question." }),
  needsSponsorship: z.enum(["yes", "no"], { error: "Please answer this question." }),
  consent: z.literal("on", { error: "Please confirm you have read the applicant privacy notice." }),
});

const FIELDS = [
  "name",
  "email",
  "phone",
  "location",
  "linkedin",
  "role",
  "coverNote",
  "workAuthorized",
  "needsSponsorship",
  "consent",
];

export async function submitApplication(prev: FormState, formData: FormData): Promise<FormState> {
  const result = await handle(formData);
  return { ...result, attempt: (prev.attempt ?? 0) + 1 };
}

async function handle(formData: FormData): Promise<FormState> {
  const raw = textValues(formData, FIELDS);
  if (isHoneypotFilled(formData)) return { status: "success" };

  const parsed = schema.safeParse({ ...raw, consent: raw.consent || undefined });
  const errors: Record<string, string> = parsed.success ? {} : zodErrors(parsed.error);

  const checked = await checkDocument(formData.get("resume"), { required: true, label: "resume" });
  if ("error" in checked) errors.resume = checked.error;

  if (Object.keys(errors).length > 0 || "error" in checked || !checked.file) {
    return {
      status: "error",
      message: "Please check the highlighted fields. For your security, attach your resume again before resending.",
      errors,
      values: raw,
    };
  }

  if (!(await verifyTurnstile(formData))) {
    return {
      status: "error",
      message: "We could not verify the form. Please complete the check, attach your resume again and resend.",
      values: raw,
    };
  }

  const role = roles.find((r) => r.slug === raw.role);
  const text = [
    `Role: ${role?.title ?? raw.role}`,
    `Name: ${raw.name}`,
    `Email: ${raw.email}`,
    `Phone: ${raw.phone}`,
    `City and state: ${raw.location}`,
    `LinkedIn: ${raw.linkedin || "Not provided"}`,
    `Authorized to work in the US: ${raw.workAuthorized}`,
    `Needs visa sponsorship now or in future: ${raw.needsSponsorship}`,
    "",
    "Cover note:",
    raw.coverNote || "None provided",
  ].join("\n");

  const sent = await deliver({
    toEnv: "CAREERS_TO_EMAIL",
    subject: `Application: ${role?.title ?? raw.role}, ${raw.name}`,
    text,
    replyTo: raw.email,
    attachments: [checked.file],
  });
  if (!sent.ok) return { status: "error", message: sent.message, values: raw };
  return { status: "success" };
}
