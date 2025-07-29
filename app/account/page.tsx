"use client"

import { AccountDashboard } from "@/components/account-dashboard"
import { useCart } from "@/context/cart-context"
import { Header } from "@/components/header" // Import Header
import { Footer } from "@/components/footer" // Import Footer

export default function AccountPage() {
  const { addToCart } = useCart()

  return (
    <>
      <Header /> {/* Render Header */}
      <main className="flex-1 bg-background">
        {" "}
        {/* Add flex-1 to main content */}
        <AccountDashboard onAddToCart={addToCart} />
      </main>
      <Footer /> {/* Render Footer */}
    </>
  )
}
