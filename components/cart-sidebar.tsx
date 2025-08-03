"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MinusCircle, PlusCircle, ShoppingCart, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"
import {
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
  getTotalItems,
  getSubtotal,
  getShippingCost,
  getTotal,
  type CartItem,
} from "@/lib/cart"

export function CartSidebar() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [totalItems, setTotalItems] = React.useState(0)
  const { toast } = useToast()

  const updateCartState = () => {
    setCartItems(getCartItems())
    setTotalItems(getTotalItems())
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
    toast({
      title: "Quantité mise à jour",
      description: "La quantité du produit a été ajustée dans votre panier.",
    })
  }

  const handleRemoveItem = (id: number, color?: string, size?: string) => {
    removeCartItem(id, color, size)
    updateCartState()
    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de votre panier.",
    })
  }

  const subtotal = getSubtotal()
  const shippingCost = getShippingCost()
  const total = getTotal()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-corail-intensifie text-xs text-primary-foreground">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Panier</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col" aria-description="Contenu de votre panier d'achat">
        <SheetHeader>
          <SheetTitle>Votre Panier ({totalItems})</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-muted-foreground">Votre panier est vide.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.color || ""}-${item.size || ""}`} className="flex items-center gap-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.color && `Couleur: ${item.color}`}
                      {item.color && item.size && ", "}
                      {item.size && `Taille: ${item.size}`}
                      {!item.color && !item.size && "Standard"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.price.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleUpdateQuantity(item.id, -1, item.color, item.size)}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleUpdateQuantity(item.id, 1, item.color, item.size)}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive hover:text-destructive"
                        onClick={() => handleRemoveItem(item.id, item.color, item.size)}
                      >
                        <XCircle className="h-4 w-4" />
                        <span className="sr-only">Retirer</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <SheetFooter className="flex flex-col gap-2 pt-4">
            <Separator />
            <div className="flex justify-between text-sm font-medium">
              <span>Sous-total:</span>
              <span>{subtotal.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span>Livraison (Libreville):</span>
              <span>{shippingCost.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold text-primary">
              <span>Total:</span>
              <span>{total.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}</span>
            </div>
            <Button asChild className="w-full bg-corail-doux hover:bg-corail-intensifie">
              <Link href="/panier">Passer la commande</Link>
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
