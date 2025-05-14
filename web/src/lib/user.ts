import client from "./client"
import {
  ProfileResponseSchema,
  profileResponseSchema,
  UpdateProfileSchema,
} from "./validations/user"

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
