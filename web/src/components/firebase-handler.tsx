"use client"

import React, { useEffect } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { useTheme } from "next-themes"

import client from "@/lib/client"
import { auth } from "@/lib/firebase/auth"
import { getPreferences } from "@/lib/user"
import { authResponseSchema } from "@/lib/validations/auth"
import { useAuthStore } from "@/hooks/use-auth-store"

const FirebaseHandler: React.FC = () => {
  const { setTheme } = useTheme()
  const { setAuth, setLoading, destroy } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      setLoading(true)
      try {
        if (user) {
          const idToken = await user.getIdToken()

          const response = await client.post("/auth/login", {
            id_token: idToken,
          })

          if (response.status === 200) {
            const authResponse = authResponseSchema.parse(response.data)
            setAuth(authResponse)

            // Set the theme based on the user's preference
            const preferences = await getPreferences()
            setTheme(preferences.dark_mode ? "dark" : "light")
          }
        } else {
          destroy()
        }
      } catch {
        // Do nothing
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return null
}

export default FirebaseHandler
