"use client"

import React, { useEffect } from "react"
import { onAuthStateChanged, User } from "firebase/auth"

import client from "@/lib/client"
import { auth } from "@/lib/firebase/auth"
import { authResponseSchema } from "@/lib/validations/auth"
import useAuthStore from "@/hooks/use-auth-store"

const FirebaseHandler: React.FC = () => {
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
          }
        } else {
          destroy()
        }
      } catch (error: unknown) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [setAuth, setLoading, destroy])

  return null
}

export default FirebaseHandler
