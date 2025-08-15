"use client"

import { useState } from "react"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tag, X, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("fr-FR", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price) + " FCFA"
  )
}

export function PromoCodeInput() {
  const { promoCode, applyPromoCode, removePromoCode, getPromoDiscount } = useCartStore()
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleApplyCode = async () => {
    if (!code.trim()) return

    setIsLoading(true)
    try {
      const success = await applyPromoCode(code.toUpperCase())
      if (success) {
        toast({
          title: "Code promo appliqué",
          description: `Vous économisez ${formatPrice(getPromoDiscount())}`,
        })
        setCode("")
      } else {
        toast({
          title: "Code promo invalide",
          description: "Vérifiez le code ou les conditions d'utilisation",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'appliquer le code promo",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveCode = () => {
    removePromoCode()
    toast({
      title: "Code promo retiré",
      description: "Le code promo a été retiré de votre commande",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Tag className="h-5 w-5" />
          <span>Code promo</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {promoCode ? (
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {promoCode.code}
                </Badge>
                <span className="text-sm font-medium text-green-800">-{formatPrice(getPromoDiscount())}</span>
              </div>
              <p className="text-xs text-green-600 mt-1">Code promo appliqué avec succès</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleRemoveCode} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Input
              placeholder="Entrez votre code promo"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === "Enter" && handleApplyCode()}
              disabled={isLoading}
            />
            <Button onClick={handleApplyCode} disabled={!code.trim() || isLoading} className="bg-transparent">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Appliquer"}
            </Button>
          </div>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p>Codes disponibles :</p>
          <ul className="space-y-1">
            <li>• BIENVENUE10 - 10% de réduction dès 20 000 FCFA</li>
            <li>• LIVRAISON - 2 000 FCFA de réduction dès 30 000 FCFA</li>
            <li>• GABON2024 - 15% de réduction dès 50 000 FCFA</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
