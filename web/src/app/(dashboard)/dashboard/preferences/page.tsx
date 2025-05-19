import React from "react"
import { Metadata } from "next"

import PreferencesForm from "@/components/preferences-form"

export const metadata: Metadata = {
  title: "Preferences",
  description: "Update your preferences",
}

const Page: React.FC = () => {
  return (
    <div className="p-4">
      <PreferencesForm />
    </div>
  )
}

export default Page
