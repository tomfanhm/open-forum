import "@/styles/globals.css"

import { site } from "@/config/site"
import { Toaster } from "@/components/ui/sonner"
import FirebaseHandler from "@/components/firebase-handler"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

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
          <FirebaseHandler />
        </body>
      </html>
    </>
  )
}
