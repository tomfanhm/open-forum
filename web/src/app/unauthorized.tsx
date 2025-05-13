import Template from "@/components/template"

export default function Unauthorized() {
  return (
    <Template
      status={401}
      title="Unauthorized"
      description="You are not authorized to access this resource."
    />
  )
}
