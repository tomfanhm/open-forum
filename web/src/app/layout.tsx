"use client"

import "@/styles/globals.css"

import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="bg-background text-foreground min-h-screen font-sans antialiased">
              {children}
              <Toaster />
            </main>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
