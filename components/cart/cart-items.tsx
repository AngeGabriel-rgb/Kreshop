"use client"

import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, Heart } from "lucide-react"
import { toast } from "@/hooks/use-toast"

function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("fr-FR", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price) + " FCFA"
  )
}

export function CartItems() {
  const { items, updateQuantity, removeItem } = useCartStore()

  const handleQuantityChange = (id: number, color: string, size: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id, color, size)
      toast({
        title: "Produit retiré",
        description: "Le produit a été retiré de votre panier",
      })
    } else {
      updateQuantity(id, color, size, newQuantity)
    }
  }

  const handleRemoveItem = (id: number, color: string, size: string, name: string) => {
    removeItem(id, color, size)
    toast({
      title: "Produit retiré",
      description: `${name} a été retiré de votre panier`,
    })
  }

  const handleAddToWishlist = (name: string) => {
    toast({
      title: "Ajouté aux favoris",
      description: `${name} a été ajouté à vos favoris`,
    })
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={`${item.id}-${item.color}-${item.size}`}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <Link href={`/produit/${item.id}`} className="hover:text-primary transition-colors">
                      <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm">
                        <strong>Couleur:</strong> {item.color}
                      </span>
                      <span className="text-sm">
                        <strong>Taille:</strong> {item.size}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleAddToWishlist(item.name)}
                      className="h-8 w-8"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id, item.color, item.size, item.name)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Price and Quantity */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="price-fcfa text-lg text-primary">{formatPrice(item.price)}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => handleQuantityChange(item.id, item.color, item.size, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => handleQuantityChange(item.id, item.color, item.size, item.quantity + 1)}
                      disabled={item.quantity >= item.maxStock}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Stock Warning */}
                {item.maxStock <= 3 && (
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    Plus que {item.maxStock} en stock
                  </Badge>
                )}

                {/* Subtotal */}
                <div className="text-right">
                  <span className="font-semibold">Sous-total: {formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
