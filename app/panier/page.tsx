"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"
import { Trash2 } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()

  const handleQuantityChange = (productId: number, variantId: number | undefined, quantity: string) => {
    const newQuantity = Number.parseInt(quantity)
    if (!isNaN(newQuantity)) {
      updateQuantity(productId, newQuantity, variantId)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-brun-chocolat">Votre Panier</h1>

      {items.length === 0 ? (
        <div className="text-center text-brun-chocolat">
          <p className="mb-4 text-lg">Votre panier est vide.</p>
          <Button asChild className="bg-corail-intensifie text-white hover:bg-corail-doux">
            <Link href="/products">Commencer vos achats</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Articles du panier</CardTitle>
              </CardHeader>
              <CardContent>
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex items-center gap-4 py-4">
                    <Image
                      src={item.image || "/placeholder.svg?height=100&width=100&query=product"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-brun-chocolat">{item.name}</h3>
                      {item.color && item.size && (
                        <p className="text-sm text-gray-600">
                          {item.color}, {item.size}
                        </p>
                      )}
                      <p className="text-corail-intensifie">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.productId, item.variantId, e.target.value)}
                        className="w-20"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-red-500 hover:bg-red-100"
                      >
                        <Trash2 className="h-5 w-5" />
                        <span className="sr-only">Supprimer l&apos;article</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Sous-total:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison:</span>
                  <span>{formatPrice(0)}</span> {/* Simulated */}
                </div>
                <div className="flex justify-between">
                  <span>Taxes:</span>
                  <span>{formatPrice(0)}</span> {/* Simulated */}
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-corail-intensifie text-white hover:bg-corail-doux">
                  <Link href="/checkout">Passer à la caisse</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
