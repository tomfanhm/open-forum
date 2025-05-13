import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="mx-auto flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <p className="text-muted-foreground">Loading ...</p>
      </div>
    </div>
  )
}
