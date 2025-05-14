import React from "react"
import { Metadata } from "next"

import ProfileForm from "@/components/profile-form"

export const metadata: Metadata = {
  title: "Profile",
  description: "Update your profile",
}

const Page: React.FC = () => {
  return (
    <div className="p-4">
      <ProfileForm />
    </div>
  )
}
export default Page
