"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Afficher le widget après 3 secondes
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const whatsappNumber = "+24162489699" // Numéro WhatsApp de la boutique
  const defaultMessage = "Bonjour ! J'ai une question concernant vos produits."

  const quickMessages = [
    {
      title: "Informations produit",
      message: "Bonjour ! J'aimerais avoir plus d'informations sur un produit.",
    },
    {
      title: "Suivi de commande",
      message: "Bonjour ! J'aimerais suivre ma commande.",
    },
    {
      title: "Livraison",
      message: "Bonjour ! J'ai une question concernant la livraison.",
    },
    {
      title: "Retour/Échange",
      message: "Bonjour ! J'aimerais faire un retour ou un échange.",
    },
  ]

  const openWhatsApp = (message: string = defaultMessage) => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
    setIsOpen(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Widget */}
      {isOpen && (
        <Card className="mb-4 w-80 shadow-lg border-primary/20">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Support WhatsApp
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">En ligne maintenant</span>
                </div>
                <p>Choisissez un sujet ou envoyez un message personnalisé :</p>
              </div>

              {quickMessages.map((msg, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-3 bg-transparent hover:bg-primary/5"
                  onClick={() => openWhatsApp(msg.message)}
                >
                  <div>
                    <div className="font-medium text-sm">{msg.title}</div>
                  </div>
                </Button>
              ))}

              <div className="border-t pt-3">
                <Button onClick={() => openWhatsApp()} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Démarrer la conversation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  )
}
