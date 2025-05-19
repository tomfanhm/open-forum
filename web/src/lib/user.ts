import client from "@/lib/client"
import {
  preferencesResponseSchema,
  PreferencesResponseSchema,
  ProfileResponseSchema,
  profileResponseSchema,
  UpdatePreferencesSchema,
  UpdateProfileSchema,
} from "@/lib/validations/user"

export const getProfile = async (): Promise<ProfileResponseSchema> => {
  const response = await client.get("/user/profile")
  if (response.status !== 200) throw new Error("Failed to fetch profile.")
  return profileResponseSchema.parse(response.data)
}

export const updateProfile = async (
  request: UpdateProfileSchema
): Promise<ProfileResponseSchema> => {
  const response = await client.put("/user/profile", request)
  if (response.status !== 200) throw new Error("Failed to update profile.")
  return profileResponseSchema.parse(response.data)
}

export const getPreferences = async (): Promise<PreferencesResponseSchema> => {
  const response = await client.get("/user/preferences")
  if (response.status !== 200) throw new Error("Failed to fetch preferences.")
  return preferencesResponseSchema.parse(response.data)
}

export const updatePreferences = async (
  request: UpdatePreferencesSchema
): Promise<UpdatePreferencesSchema> => {
  const response = await client.put("/user/preferences", request)
  if (response.status !== 200) throw new Error("Failed to update preferences.")
  return preferencesResponseSchema.parse(response.data)
}
