import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { WhatsAppFloat } from "@/components/integrations/whatsapp-float"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "kreshop - Mode & Accessoires",
  description:
    "Boutique en ligne moderne pour vêtements et accessoires au Gabon. Livraison à Libreville, paiement Mobile Money.",
  keywords: "mode, vêtements, accessoires, Gabon, Libreville, boutique en ligne, FCFA",
  authors: [{ name: "kreshop" }],
  openGraph: {
    title: "kreshop - Mode & Accessoires",
    description: "Découvrez notre collection de vêtements et accessoires tendance au Gabon",
    type: "website",
    locale: "fr_FR",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${workSans.variable} ${openSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased">
        <AuthProvider>
          <main>{children}</main>
          <WhatsAppFloat />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
