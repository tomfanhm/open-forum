import Template from "@/components/template"

export default function Forbidden() {
  return (
    <Template
      status={403}
      title="Forbidden"
      description="You are not authorized to access this resource."
    />
  )
}
