"use client"

import { useCartStore } from "@/lib/cart-store"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Truck, Clock, Zap } from "lucide-react"

function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("fr-FR", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price) + " FCFA"
  )
}

const deliveryOptions = [
  {
    id: "standard",
    name: "Livraison Standard",
    description: "Livraison sous 24-48h ouvrées",
    icon: Truck,
    multiplier: 1,
    popular: false,
  },
  {
    id: "express",
    name: "Livraison Express",
    description: "Livraison sous 12-24h ouvrées",
    icon: Zap,
    multiplier: 1.5,
    popular: true,
  },
  {
    id: "pickup",
    name: "Retrait en magasin",
    description: "Gratuit - Disponible sous 2h",
    icon: Clock,
    multiplier: 0,
    popular: false,
  },
]

export function DeliveryOptions() {
  const { deliveryMethod, setDeliveryMethod, deliveryZone, getSubtotal } = useCartStore()

  const getDeliveryFee = (multiplier: number) => {
    const deliveryFees = {
      "libreville-centre": 2000,
      "libreville-nord": 3000,
      "libreville-sud": 3000,
      akanda: 5000,
      owendo: 4000,
      "autres-zones": 7000,
    }

    const baseFee = deliveryFees[deliveryZone as keyof typeof deliveryFees] || deliveryFees["autres-zones"]
    return multiplier === 0 ? 0 : Math.round(baseFee * multiplier)
  }

  const subtotal = getSubtotal()
  const freeShippingThreshold = 50000
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Options de livraison</h3>
        <p className="text-sm text-muted-foreground">
          Zone sélectionnée: <span className="font-medium">{deliveryZone.replace("-", " ")}</span>
        </p>
        {qualifiesForFreeShipping && (
          <p className="text-sm text-green-600 font-medium">Vous bénéficiez de la livraison gratuite !</p>
        )}
      </div>

      <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
        <div className="space-y-3">
          {deliveryOptions.map((option) => {
            const fee = getDeliveryFee(option.multiplier)
            const finalFee = qualifiesForFreeShipping && option.id !== "pickup" ? 0 : fee

            return (
              <Card
                key={option.id}
                className={`cursor-pointer transition-colors ${
                  deliveryMethod === option.id ? "border-primary bg-primary/5" : "hover:border-muted-foreground"
                }`}
                onClick={() => setDeliveryMethod(option.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full">
                        <option.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Label htmlFor={option.id} className="font-medium cursor-pointer">
                            {option.name}
                          </Label>
                          {option.popular && (
                            <Badge variant="secondary" className="text-xs">
                              Populaire
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                      <div className="text-right">
                        {finalFee === 0 ? (
                          <span className="font-medium text-green-600">Gratuit</span>
                        ) : (
                          <div className="space-y-1">
                            <span className="font-medium">{formatPrice(finalFee)}</span>
                            {qualifiesForFreeShipping && fee > 0 && (
                              <div className="text-xs text-muted-foreground line-through">{formatPrice(fee)}</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </RadioGroup>

      {/* Delivery Info */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="space-y-2 text-sm">
            <h4 className="font-medium">Informations de livraison</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Livraison du lundi au samedi, de 8h à 18h</li>
              <li>• Un SMS vous sera envoyé avant la livraison</li>
              <li>• Paiement à la livraison disponible</li>
              <li>• Retrait gratuit en magasin (Libreville Centre)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
