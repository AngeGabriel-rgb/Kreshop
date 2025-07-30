"use client"

import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { Loader2, CheckCircle, XCircle, ShoppingBag, X } from "lucide-react"
import { useState } from "react"
import { Header } from "@/components/header" // Import Header
import { Footer } from "@/components/footer" // Import Footer

export default function PaymentPage() {
  const { cartItems, cartTotal, clearCart, removeFromCart } = useCart() // Add removeFromCart
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "failed">("idle")

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    setPaymentStatus("idle")
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setPaymentStatus("success")
      clearCart()
    } catch (error) {
      console.error("Order placement failed:", error)
      setPaymentStatus("failed")
    } finally {
      setIsProcessing(false)
    }
  }

  if (cartItems.length === 0 && paymentStatus === "idle") {
    return (
      <>
        <Header /> {/* Render Header */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mb-6" />
          <h2 className="text-2xl font-bold mb-2">Votre panier est vide</h2>
          <p className="text-muted-foreground mb-6">Ajoutez des articles pour passer une commande.</p>
          <Button onClick={() => router.push("/products")}>Parcourir les produits</Button>
        </main>
        <Footer /> {/* Render Footer */}
      </>
    )
  }

  if (paymentStatus === "success") {
    return (
      <>
        <Header /> {/* Render Header */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
          <h2 className="text-2xl font-bold mb-2">Commande passée avec succès !</h2>
          <p className="text-muted-foreground mb-6">Merci pour votre achat. Un email de confirmation a été envoyé.</p>
          <Button onClick={() => router.push("/client/dashboard")}>Voir mes commandes</Button>
        </main>
        <Footer /> {/* Render Footer */}
      </>
    )
  }

  if (paymentStatus === "failed") {
    return (
      <>
        <Header /> {/* Render Header */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <XCircle className="h-24 w-24 text-red-500 mb-6" />
          <h2 className="text-2xl font-bold mb-2">Échec du paiement</h2>
          <p className="text-muted-foreground mb-6">
            Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer.
          </p>
          <Button onClick={() => setPaymentStatus("idle")}>Réessayer le paiement</Button>
        </main>
        <Footer /> {/* Render Footer */}
      </>
    )
  }

  return (
    <>
      <Header /> {/* Render Header */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Récapitulatif de la commande</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Articles du panier</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b pb-4 last:border-b-0 last:pb-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                      {(item.size || item.color) && (
                        <p className="text-xs text-muted-foreground">
                          {item.size && `Taille: ${item.size}`}
                          {item.size && item.color && " • "}
                          {item.color && `Couleur: ${item.color}`}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-semibold">{(item.price * item.quantity).toLocaleString()} FCFA</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 mt-2"
                        onClick={() => removeFromCart(item.id)} // Add remove button
                      >
                        <X className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Adresse de livraison</CardTitle>
                <CardDescription>Veuillez confirmer votre adresse de livraison.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">Nom Prénom</p>
                <p className="text-muted-foreground">123 Rue de la Paix, Quartier XYZ</p>
                <p className="text-muted-foreground">Libreville, Gabon</p>
                <p className="text-muted-foreground">Téléphone: +241 0X XX XX XX XX</p>
                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                  Modifier l'adresse
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Détails de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Sous-total:</span>
                  <span>{cartTotal.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Livraison:</span>
                  <span>5,000 FCFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes:</span>
                  <span>0 FCFA</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>{(cartTotal + 5000).toLocaleString()} FCFA</span>
                </div>
                <Button onClick={handlePlaceOrder} className="w-full" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    "Confirmer la commande et payer"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer /> {/* Render Footer */}
    </>
  )
}
