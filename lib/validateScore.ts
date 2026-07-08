import { z } from "zod";

/** Safe display name — no HTML/script injection */
export const playerNameSchema = z
  .string()
  .trim()
  .min(1, "Name is required")
  .max(20, "Name must be 20 characters or less")
  .regex(
    /^[\p{L}\p{N} _.\-]+$/u,
    "Only letters, numbers, spaces, and . _ - allowed"
  )
  .transform((name) =>
    name
      .replace(/\s+/g, " ")
      .slice(0, 20)
  );

export const scoreSubmitSchema = z.object({
  name: playerNameSchema,
  elapsedMs: z
    .number()
    .int()
    .min(1000, "Time too fast to be valid")
    .max(300_000, "Time exceeds limit"),
  glassBroken: z.number().int().min(0).max(10),
  blockCount: z.literal(10),
  /** Honeypot — must be empty */
  website: z.literal("").optional(),
});

export type ScoreSubmit = z.infer<typeof scoreSubmitSchema>;
