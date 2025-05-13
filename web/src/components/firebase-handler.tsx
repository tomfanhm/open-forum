"use client"

import React, { useEffect } from "react"
import { User } from "firebase/auth"

import client from "@/lib/client"
import { auth } from "@/lib/firebase/auth"
import { authResponseSchema } from "@/lib/validations/auth"
import useAuthStore from "@/hooks/use-auth-store"

const FirebaseHandler: React.FC = () => {
  const { setAuth } = useAuthStore()

  useEffect(() => {
    const user: User | null = auth.currentUser

    const login = async () => {
      if (user) {
        try {
          const idToken = await user.getIdToken()

          const response = await client.post("/auth/login", {
            id_token: idToken,
          })

          if (response.status === 200) {
            const authResponse = authResponseSchema.parse(response.data)
            setAuth(authResponse)
          }
        } catch {
          // Do nothing
        }
      }
    }

    login()
  }, [setAuth])

  return null
}

export default FirebaseHandler
