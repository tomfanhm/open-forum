import { z } from "zod"

export const profileResponseSchema = z.object({
  display_name: z
    .string()
    .nullable()
    .transform((val) => (val === null ? undefined : val)),
  avatar_url: z
    .string()
    .url()
    .nullable()
    .transform((val) => (val === null ? undefined : val)),
  bio: z
    .string()
    .nullable()
    .transform((val) => (val === null ? undefined : val)),
  location: z
    .string()
    .nullable()
    .transform((val) => (val === null ? undefined : val)),
  website: z
    .string()
    .url()
    .nullable()
    .transform((val) => (val === null ? undefined : val)),
})

export type ProfileResponseSchema = z.infer<typeof profileResponseSchema>

export const updateProfileSchema = z.object({
  display_name: z.string().optional(),
  avatar_url: z.string().url().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional(),
})

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>

export const preferences = z.object({
  dark_mode: z.boolean(),
  notification_emails: z.boolean(),
  show_avatars: z.boolean(),
})

export const preferencesResponseSchema = preferences

export type PreferencesResponseSchema = z.infer<
  typeof preferencesResponseSchema
>

export const updatePreferencesSchema = preferences

export type UpdatePreferencesSchema = z.infer<typeof updatePreferencesSchema>
