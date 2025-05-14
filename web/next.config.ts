import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true, // Enable the experimental features, including unauthorized and forbidden functions
  },
}

export default nextConfig
