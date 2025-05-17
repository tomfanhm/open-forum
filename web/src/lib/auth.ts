import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"
import { toast } from "sonner"

import client from "@/lib/client"
import { auth } from "@/lib/firebase/auth"
import { errorToast } from "@/lib/utils"
import {
  AuthResponse,
  authResponseSchema,
  LoginSchema,
  RegisterSchema,
} from "@/lib/validations/auth"

export const register = async (request: RegisterSchema): Promise<boolean> => {
  try {
    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      request.email,
      request.password
    )
    // Send the ID token to backend for verification and user creation
    const idToken = await userCredential.user.getIdToken()

    const response = await client.post("/auth/register", {
      id_token: idToken,
    })

    if (response.status === 200) {
      return true
    }
  } catch (error: unknown) {
    errorToast(error, "Failed to register.")
  }
  return false
}

export const login = async (
  request: LoginSchema
): Promise<AuthResponse | null> => {
  try {
    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(
      auth,
      request.email,
      request.password
    )
    // Send the ID token to backend for verification
    const idToken = await userCredential.user.getIdToken()

    const response = await client.post("/auth/login", {
      id_token: idToken,
    })

    if (response.status === 200) {
      const data = response.data
      return authResponseSchema.parse(data)
    }
  } catch (error: unknown) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to login. Please check your credentials."
    )
  }
  return null
}

export const loginWithGoogle = async (): Promise<AuthResponse | null> => {
  try {
    // Sign in with Google
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const idToken = await result.user.getIdToken()
    // Send the ID token to backend for verification and user creation if needed
    const response = await client.post("/auth/login", {
      id_token: idToken,
    })

    if (response.status === 200) {
      const data = response.data
      return authResponseSchema.parse(data)
    }
  } catch (error: unknown) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to login with Google. Please try again."
    )
  }
  return null
}

export const logout = async (): Promise<void> => {
  try {
    await auth.signOut()
  } catch (error: unknown) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to logout. Please try again."
    )
  }
}
