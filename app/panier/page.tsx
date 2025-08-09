"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MinusCircle, PlusCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import {
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
  getSubtotal,
  getShippingCost,
  getTotal,
  type CartItem,
} from "@/lib/cart"

export default function CartPage() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const { toast } = useToast()

  const updateCartState = () => {
    setCartItems(getCartItems())
  }

  React.useEffect(() => {
    updateCartState()
    // Listen for changes in localStorage from other tabs/windows
    const handleStorageChange = () => {
      updateCartState()
    }
    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const handleUpdateQuantity = (id: number, delta: number, color?: string, size?: string) => {
    updateCartItemQuantity(id, delta, color, size)
    updateCartState()
  }

  const handleRemoveItem = (id: number, color?: string, size?: string) => {
    removeCartItem(id, color, size)
    updateCartState()
  }

  const subtotal = getSubtotal()
  const shippingCost = getShippingCost()
  const total = getTotal()

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">Votre Panier</h1>
      {cartItems.length === 0 ? (
        <Card className="p-8 text-center">
          <CardTitle className="mb-4">Votre panier est vide</CardTitle>
          <CardContent>
            <p className="text-muted-foreground mb-6">Commencez à explorer nos produits pour trouver votre bonheur !</p>
            <Button asChild className="bg-corail-doux hover:bg-corail-intensifie">
              <Link href="/products">Découvrir les produits</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={`${item.id}-${item.color || ""}-${item.size || ""}`} className="flex items-center p-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover mr-4"
                />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    {item.color && item.size && (
                      <p className="text-sm text-muted-foreground">
                        Couleur: {item.color}, Taille: {item.size}
                      </p>
                    )}
                    {!item.color && !item.size && <p className="text-sm text-muted-foreground">Standard</p>}
                    <p className="text-md font-medium text-primary">
                      {item.price.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => handleUpdateQuantity(item.id, -1, item.color, item.size)}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => handleUpdateQuantity(item.id, 1, item.color, item.size)}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleRemoveItem(item.id, item.color, item.size)}
                    >
                      <XCircle className="h-4 w-4" />
                      <span className="sr-only">Retirer</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Card className="lg:col-span-1 h-fit">
            <CardHeader>
              <CardTitle>Résumé de la commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Sous-total:</span>
                <span>{subtotal.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Frais de livraison (Libreville):</span>
                <span>{shippingCost.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold text-primary">
                <span>Total:</span>
                <span>{total.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-corail-doux hover:bg-corail-intensifie">
                <Link href="/checkout">Procéder au paiement</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
