import { create } from "zustand"

import { AuthResponse } from "@/lib/validations/auth"

type Auth = AuthResponse

type AuthStore = {
  auth: Auth | null
  setAuth: (auth: Auth) => void
  destroy: () => void
}

const useAuthStore = create<AuthStore>((set) => ({
  auth: null,
  setAuth: (auth: Auth) => set({ auth }),
  destroy: () => set({ auth: null }),
}))

export default useAuthStore
