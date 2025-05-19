import { z } from "zod"

export const id = z.preprocess((x) => Number(x), z.number())

export type ID = z.infer<typeof id>
