"use client"

import Image from "next/image"
import { useCartStore } from "@/lib/cart-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag } from "lucide-react"

function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("fr-FR", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price) + " FCFA"
  )
}

export function OrderSummary() {
  const { items, promoCode, getSubtotal, getDeliveryFee, getPromoDiscount, getTotal, getTotalItems } = useCartStore()

  const subtotal = getSubtotal()
  const deliveryFee = getDeliveryFee()
  const discount = getPromoDiscount()
  const total = getTotal()
  const freeShippingThreshold = 50000

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ShoppingBag className="h-5 w-5" />
          <span>Récapitulatif ({getTotalItems()} articles)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div key={`${item.id}-${item.color}-${item.size}`} className="flex space-x-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {item.quantity}
                </Badge>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.color} • {item.size}
                </p>
                <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Sous-total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Livraison</span>
            <span className={subtotal >= freeShippingThreshold ? "line-through text-muted-foreground" : ""}>
              {formatPrice(deliveryFee)}
            </span>
          </div>

          {subtotal >= freeShippingThreshold && deliveryFee > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Livraison gratuite</span>
              <span>-{formatPrice(deliveryFee)}</span>
            </div>
          )}

          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Réduction {promoCode?.code && `(${promoCode.code})`}</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="price-fcfa text-primary">{formatPrice(total)}</span>
        </div>

        <p className="text-xs text-muted-foreground text-center">TVA incluse</p>

        {/* Free Shipping Progress */}
        {subtotal < freeShippingThreshold && (
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-2">
              Plus que {formatPrice(freeShippingThreshold - subtotal)} pour la livraison gratuite
            </p>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
