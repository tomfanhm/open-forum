"use client"

import { useEffect } from "react"

import Template from "@/components/template"

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Template status={500} title={error.name} description={error.message} />
  )
}
