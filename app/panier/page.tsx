"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MinusCircle, PlusCircle, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  color?: string
  size?: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const { toast } = useToast()

  React.useEffect(() => {
    const storedCart = localStorage.getItem("kreshop_cart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  React.useEffect(() => {
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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = cartItems.length > 0 ? 2500 : 0 // Example fixed shipping cost for Libreville
  const total = subtotal + shippingCost

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
              <Card key={item.id} className="flex items-center p-4">
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
                    <p className="text-md font-medium text-primary">
                      {item.price.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.id)}
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
              <Button className="w-full bg-corail-doux hover:bg-corail-intensifie">Procéder au paiement</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
