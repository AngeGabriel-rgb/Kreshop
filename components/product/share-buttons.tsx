"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Share2, MessageCircle, Copy } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ShareButtonsProps {
  product: {
    id: number
    name: string
    price: number
  }
}

function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("fr-FR", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price) + " FCFA"
  )
}

export function ShareButtons({ product }: ShareButtonsProps) {
  const productUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareText = `Découvrez ${product.name} à ${formatPrice(product.price)} sur Boutique Gabon !`

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${productUrl}`)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl)
      toast({
        title: "Lien copié",
        description: "Le lien du produit a été copié dans le presse-papiers",
      })
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Share2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Partager ce produit</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleWhatsAppShare}>
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopyLink}>
              <Copy className="h-4 w-4 mr-2" />
              Copier le lien
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
