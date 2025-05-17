import axios from "axios"

import { auth } from "@/lib/firebase/auth"

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

client.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default client
