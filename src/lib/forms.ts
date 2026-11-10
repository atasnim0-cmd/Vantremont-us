import "server-only";
import { headers } from "next/headers";
import { Resend } from "resend";
import type { ZodError } from "zod";
import { isLive } from "./env";

/** Shared state shape for every form on the site. */
export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<string, string>>;
  /** Echo of submitted text values so the form keeps them after a validation error. */
  values?: Record<string, string>;
  /** Increments on every submission so the client can issue a fresh spam-check token. */
  attempt?: number;
};

/** 4 MB. Vercel rejects request bodies over 4.5 MB, so uploads stay under that with room for the other fields. */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export function textValues(formData: FormData, keys: string[]): Record<string, string> {
  return Object.fromEntries(keys.map((k) => [k, String(formData.get(k) ?? "").trim()]));
}

export function isHoneypotFilled(formData: FormData): boolean {
  return String(formData.get("company_fax") ?? "").length > 0;
}

export function zodErrors(error: ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    errors[key] ??= issue.message;
  }
  return errors;
}

export async function verifyTurnstile(formData: FormData): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return !isLive; // Allowed only outside the live site.
  const token = formData.get("cf-turnstile-response");
  if (typeof token !== "string" || !token) return false;
  const h = await headers();
  const ip = h.get("x-real-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export type CheckedFile = { filename: string; content: Buffer };

const ALLOWED = {
  pdf: { mime: ["application/pdf"], magic: [0x25, 0x50, 0x44, 0x46] }, // %PDF
  docx: {
    mime: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/octet-stream", ""],
    magic: [0x50, 0x4b, 0x03, 0x04], // ZIP container
  },
} as const;

/**
 * Validates an uploaded PDF or DOCX: present (if required), at most 4 MB, with a
 * matching extension and file signature. Returns an error message or the file.
 */
export async function checkDocument(
  value: FormDataEntryValue | null,
  { required, label }: { required: boolean; label: string },
): Promise<{ error: string } | { file: CheckedFile | null }> {
  if (!(value instanceof File) || value.size === 0) {
    return required ? { error: `Please attach your ${label} as a PDF or Word (.docx) file.` } : { file: null };
  }
  if (value.size > MAX_UPLOAD_BYTES)
    return { error: `Your ${label} is larger than 4 MB. Please attach a smaller file.` };
  const ext = value.name.toLowerCase().split(".").pop();
  if (ext !== "pdf" && ext !== "docx") return { error: `Please attach your ${label} as a PDF or Word (.docx) file.` };
  const spec = ALLOWED[ext];
  const bytes = Buffer.from(await value.arrayBuffer());
  const signatureOk = spec.magic.every((b, i) => bytes[i] === b);
  const mimeOk = (spec.mime as readonly string[]).includes(value.type);
  if (!signatureOk || !mimeOk) return { error: `That file does not look like a valid ${ext.toUpperCase()} document.` };
  // Keep only safe characters in the attachment name.
  const filename = value.name.replace(/[^\w.\- ]+/g, "_").slice(0, 120);
  return { file: { filename, content: bytes } };
}

/**
 * Sends a form submission by email through Resend. Outside the live site, when email
 * is not configured, the submission is logged instead so previews keep working.
 */
export async function deliver(opts: {
  toEnv: string;
  subject: string;
  text: string;
  replyTo: string;
  attachments?: CheckedFile[];
}): Promise<{ ok: true } | { ok: false; message: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FORMS_FROM_EMAIL;
  const to = process.env[opts.toEnv];

  if (!apiKey || !from || !to) {
    if (isLive) {
      console.error(`Form email is not configured: RESEND_API_KEY, FORMS_FROM_EMAIL or ${opts.toEnv} missing.`);
      return { ok: false, message: "Sorry, the form is temporarily unavailable. Please email us instead." };
    }
    const files = opts.attachments?.map((a) => `${a.filename} (${a.content.length} bytes)`).join(", ");
    console.info(
      `[form not sent: email not configured]\n${opts.subject}\n${opts.text}${files ? `\nAttachments: ${files}` : ""}`,
    );
    return { ok: true };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      replyTo: opts.replyTo,
      subject: opts.subject,
      text: opts.text,
      attachments: opts.attachments?.map((a) => ({ filename: a.filename, content: a.content })),
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  } catch (err) {
    console.error("Form delivery failed:", err instanceof Error ? err.message : "unknown error");
    return { ok: false, message: "Sorry, something went wrong sending the form. Please email us instead." };
  }
}
