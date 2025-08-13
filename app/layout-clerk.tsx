import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkHeader } from "@/components/clerk-header"
import { Footer } from "@/components/footer"
import { ClerkProvider } from "@clerk/nextjs"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "KreShop - Votre Boutique en Ligne",
  description: "Découvrez une large gamme de produits de qualité chez KreShop.",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClerkProvider>
            <div className="flex min-h-screen flex-col">
              <ClerkHeader />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
