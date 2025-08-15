"use client"

import { useCartStore } from "@/lib/cart-store"
import { CartItems } from "./cart-items"
import { CartSummary } from "./cart-summary"
import { PromoCodeInput } from "./promo-code-input"
import { RecommendedProducts } from "./recommended-products"
import { Button } from "@/components/ui/button"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function CartPage() {
  const { items, getTotalItems } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground opacity-50" />
        <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Découvrez notre collection de vêtements et accessoires pour commencer vos achats.
        </p>
        <Button asChild size="lg" className="btn-primary">
          <Link href="/produits">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continuer mes achats
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mon Panier</h1>
        <p className="text-muted-foreground">
          {getTotalItems()} article{getTotalItems() !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <CartItems />
          <PromoCodeInput />
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>

      {/* Recommended Products */}
      <RecommendedProducts />
    </div>
  )
}
