import "@/styles/globals.css"

import { site } from "@/config/site"
import { Toaster } from "@/components/ui/sonner"
import FirebaseHandler from "@/components/firebase-handler"
import Providers from "@/components/providers"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: "/favicon.ico",
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
            <div className="bg-background text-foreground min-h-screen font-sans antialiased">
              <Providers>{children}</Providers>
              <Toaster />
            </div>
            <FirebaseHandler />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
