"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface WhatsAppShareProps {
  productName: string
  productUrl: string
  productPrice: number
  productImage?: string
}

export function WhatsAppShare({ productName, productUrl, productPrice, productImage }: WhatsAppShareProps) {
  const shareOnWhatsApp = () => {
    const message = `🛍️ Regardez ce produit sur Boutique Gabon !

📦 ${productName}
💰 ${productPrice.toLocaleString()} FCFA

🔗 ${window.location.origin}${productUrl}

#BoutiqueGabon #ModeGabon #Libreville`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/+24162489699?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button
      onClick={shareOnWhatsApp}
      variant="outline"
      size="sm"
      className="flex items-center gap-2 bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
    >
      <MessageCircle className="h-4 w-4" />
      Partager sur WhatsApp
    </Button>
  )
}
