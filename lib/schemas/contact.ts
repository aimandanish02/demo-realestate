import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120, "Name is too long"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().trim().max(40, "Phone number is too long").optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(4000, "Message is too long"),
  turnstileToken: z.string().min(1, "Verification token is missing"),
  // Honeypot: real visitors never fill this in. Bots that autofill every field do.
  referenceId: z.string().optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
