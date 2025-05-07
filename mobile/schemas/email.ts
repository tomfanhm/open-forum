import { z } from "zod";

export const email = z.string().email({
  message: "Invalid email address.",
});

export type Email = z.infer<typeof email>;
