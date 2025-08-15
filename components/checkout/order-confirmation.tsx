"use client"

import { useEffect } from "react"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MessageCircle, Mail, Download, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { AddressData, PaymentData } from "./checkout-page"

interface OrderConfirmationProps {
  addressData: AddressData
  paymentData: PaymentData
}

function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("fr-FR", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price) + " FCFA"
  )
}

const getPaymentMethodLabel = (method: PaymentData["method"]) => {
  switch (method) {
    case "mobile-money":
      return "Mobile Money"
    case "bank-transfer":
      return "Virement Bancaire"
    case "e-billing":
      return "E-BILLING"
    default:
      return method
  }
}

export function OrderConfirmation({ addressData, paymentData }: OrderConfirmationProps) {
  const { items, getTotal, clearCart } = useCartStore()
  const orderNumber = `BG-${Date.now().toString().slice(-6)}`
  const estimatedDelivery = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  useEffect(() => {
    // Clear cart after successful order (optional - you might want to keep it for order tracking)
    // clearCart()
  }, [])

  const handleWhatsAppNotification = () => {
    const message = `Bonjour ! Ma commande ${orderNumber} a été confirmée. Pouvez-vous me donner des nouvelles sur le suivi ?`
    const whatsappUrl = `https://wa.me/24177123456?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Commande confirmée !</h2>
          <p className="text-muted-foreground">
            Votre commande <span className="font-medium">#{orderNumber}</span> a été enregistrée avec succès
          </p>
        </div>
      </div>

      {/* Order Details */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Numéro de commande</span>
            <Badge variant="secondary" className="font-mono">
              #{orderNumber}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Montant total</span>
            <span className="price-fcfa text-lg text-primary">{formatPrice(getTotal())}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Mode de paiement</span>
            <span>{getPaymentMethodLabel(paymentData.method)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Livraison estimée</span>
            <span className="text-right">
              <div>{estimatedDelivery}</div>
              <div className="text-sm text-muted-foreground">à {addressData.city}</div>
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Prochaines étapes</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div>
                <p className="font-medium">Confirmation par email</p>
                <p className="text-sm text-muted-foreground">
                  Un email de confirmation a été envoyé à {addressData.email}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div>
                <p className="font-medium">Préparation de la commande</p>
                <p className="text-sm text-muted-foreground">Nous préparons vos articles avec soin</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div>
                <p className="font-medium">Expédition</p>
                <p className="text-sm text-muted-foreground">Vous recevrez un SMS avec le suivi de livraison</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button variant="outline" className="bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Télécharger la facture
          </Button>
          <Button variant="outline" onClick={handleWhatsAppNotification} className="bg-transparent">
            <MessageCircle className="h-4 w-4 mr-2" />
            Suivi WhatsApp
          </Button>
        </div>

        <Button asChild size="lg" className="w-full btn-primary">
          <Link href="/compte/commandes">
            Voir mes commandes
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>

        <div className="text-center">
          <Button asChild variant="ghost">
            <Link href="/produits">Continuer mes achats</Link>
          </Button>
        </div>
      </div>

      {/* Contact Info */}
      <Card className="bg-muted/30">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">Une question sur votre commande ?</p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <a href="mailto:commandes@boutique-gabon.com" className="flex items-center space-x-1 hover:text-primary">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </a>
            <a href="https://wa.me/24177123456" className="flex items-center space-x-1 hover:text-primary">
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
