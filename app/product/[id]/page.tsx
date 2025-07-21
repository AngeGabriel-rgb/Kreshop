"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetailView } from "@/components/product-detail-view"
import { CartSidebar } from "@/components/cart-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"
import type { Product } from "@/types/product"

export default function ProductDetailPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<Array<Product & { quantity: number }>>([])

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  // Simuler l'absence de produit
  const product = null

  return (
    <div className="min-h-screen bg-white">
      <Header cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />

      <main>
        {product ? (
          <ProductDetailView product={product} onAddToCart={addToCart} />
        ) : (
          <div className="container mx-auto px-4 py-16">
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="w-24 h-24 text-taupe-rose mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-brun-chocolat mb-4">Produit non trouvé</h1>
                <p className="text-taupe-fonce mb-8 max-w-md mx-auto">
                  Le produit que vous recherchez n'existe pas ou n'est plus disponible.
                </p>
                <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">Retour à la boutique</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        total={cartTotal}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  )
}
