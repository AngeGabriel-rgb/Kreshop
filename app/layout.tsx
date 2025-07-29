import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"

export const metadata: Metadata = {
  title: "Kre Shop",
  description: "KRE SHOP - Your one-stop shop for all things KRE",
}

// On sépare la partie client dans un composant dédié
function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      {/* CartSidebar sera rendu à l'intérieur des enfants qui ont accès au contexte */}
    </CartProvider>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
