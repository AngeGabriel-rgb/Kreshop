"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MinusCircle, PlusCircle, ShoppingCart, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export function CartSidebar() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const { toast } = useToast()

  React.useEffect(() => {
    // Load cart from localStorage on mount
    const storedCart = localStorage.getItem("kreshop_cart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  React.useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("kreshop_cart", JSON.stringify(cartItems))
  }, [cartItems])

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id))
    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de votre panier.",
    })
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = totalItems > 0 ? 2500 : 0 // Example fixed shipping cost for Libreville
  const total = subtotal + shippingCost

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
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Votre Panier ({totalItems})</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-muted-foreground">Votre panier est vide.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
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
                      {item.price.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id)}
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
