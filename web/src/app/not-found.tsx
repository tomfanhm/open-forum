import Template from "@/components/template"

export default function NotFound() {
  return (
    <Template
      status={404}
      title="Not Found"
      description="The requested resource was not found."
    />
  )
}
