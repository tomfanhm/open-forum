import { Fragment } from "react"

import Navbar from "@/components/navbar/navbar"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Fragment>
      <Navbar />
      <div className="mx-auto max-w-7xl p-6 lg:px-8">{children}</div>
    </Fragment>
  )
}
