import { z } from "zod"

export const timestamp = z.string().transform((val) => new Date(val))

export type Timestamp = z.infer<typeof timestamp>
