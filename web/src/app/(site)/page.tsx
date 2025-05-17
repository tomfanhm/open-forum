import React from "react"

const Page: React.FC = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
      <main className="flex-1">Main</main>
      <aside className="sticky top-8 hidden w-96 shrink-0 xl:block">
        Sticky
      </aside>
    </div>
  )
}
export default Page
