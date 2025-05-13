"use client"

import Template from "@/components/template"

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <Template status={500} title={error.name} description={error.message} />
      </body>
    </html>
  )
}
