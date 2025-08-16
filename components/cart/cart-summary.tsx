"use client"

import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Truck, MapPin, CreditCard } from "lucide-react"
import Link from "next/link"

function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("fr-FR", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price) + " FCFA"
  )
}

const deliveryZones = [
  { value: "libreville-centre", label: "Libreville Centre", fee: 2000 },
  { value: "libreville-nord", label: "Libreville Nord", fee: 3000 },
  { value: "libreville-sud", label: "Libreville Sud", fee: 3000 },
  { value: "akanda", label: "Akanda", fee: 5000 },
  { value: "owendo", label: "Owendo", fee: 4000 },
  { value: "autres-zones", label: "Autres zones", fee: 7000 },
]

const deliveryMethods = [
  { value: "standard", label: "Livraison standard (24-48h)", multiplier: 1 },
  { value: "express", label: "Livraison express (12-24h)", multiplier: 1.5 },
]

export function CartSummary() {
  const {
    deliveryZone,
    deliveryMethod,
    setDeliveryZone,
    setDeliveryMethod,
    getSubtotal,
    getDeliveryFee,
    getPromoDiscount,
    getTotal,
    promoCode,
  } = useCartStore()

  const subtotal = getSubtotal()
  const deliveryFee = getDeliveryFee()
  const discount = getPromoDiscount()
  const total = getTotal()

  const freeShippingThreshold = 50000
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  return (
    <div className="space-y-6">
      {/* Free Shipping Progress */}
      {remainingForFreeShipping > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Truck className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Livraison gratuite</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Plus que {formatPrice(remainingForFreeShipping)} pour la livraison gratuite !
            </p>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delivery Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Livraison</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Zone de livraison</label>
            <Select value={deliveryZone} onValueChange={setDeliveryZone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {deliveryZones.map((zone) => (
                  <SelectItem key={zone.value} value={zone.value}>
                    {zone.label} - {formatPrice(zone.fee)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Mode de livraison</label>
            <Select value={deliveryMethod} onValueChange={setDeliveryMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {deliveryMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Récapitulatif</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Sous-total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span>Livraison</span>
            <span className={subtotal >= freeShippingThreshold ? "line-through text-muted-foreground" : ""}>
              {formatPrice(deliveryFee)}
            </span>
          </div>

          {subtotal >= freeShippingThreshold && (
            <div className="flex justify-between text-green-600">
              <span>Livraison gratuite</span>
              <span>-{formatPrice(deliveryFee)}</span>
            </div>
          )}

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Réduction {promoCode?.code && `(${promoCode.code})`}</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="price-fcfa text-primary">{formatPrice(total)}</span>
          </div>

          <p className="text-xs text-muted-foreground">TVA incluse</p>
        </CardContent>
      </Card>

      {/* Checkout Button */}
      <Button asChild size="lg" className="w-full btn-primary h-12">
        <Link href="/checkout">
          <CreditCard className="h-5 w-5 mr-2" />
          Passer la commande
        </Link>
      </Button>

      {/* Security Info */}
      <div className="text-center text-xs text-muted-foreground space-y-1">
        <p>Paiement 100% sécurisé</p>
        <p>Mobile Money • Virement bancaire • E-BILLING</p>
      </div>
    </div>
  )
}
