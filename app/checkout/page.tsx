"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useCartStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"
import { useAuth } from "@/lib/auth" // Use the new auth hook
import { createCommande } from "@/lib/api" // Use the new API function

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { user, getToken } = useAuth() // Get user and token from new auth hook

  const [shippingAddress, setShippingAddress] = useState({
    firstName: user?.prenom || "",
    lastName: user?.nom || "",
    address: "",
    city: "",
    zip: "",
    country: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("credit_card")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingAddress((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (items.length === 0) {
      toast({
        title: "Panier vide",
        description: "Votre panier est vide. Veuillez ajouter des articles avant de passer commande.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (!user || !getToken()) {
      toast({
        title: "Non authentifié",
        description: "Veuillez vous connecter pour passer commande.",
        variant: "destructive",
      })
      router.push("/login")
      setIsLoading(false)
      return
    }

    // Simulate payment processing (e.g., with EbillingJS or a mock API call)
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate network delay

    try {
      const orderData = {
        client_id: user.id,
        statut: "EN_ATTENTE", // Initial status
        statut_paiement: "PAYE", // Assuming payment is successful
        sous_total_fcfa: getTotalPrice(),
        taxes_fcfa: 0, // For simplicity
        livraison_fcfa: 0, // For simplicity
        remise_fcfa: 0, // For simplicity
        total_fcfa: getTotalPrice(),
        devise: "XOF",
        methode_paiement: paymentMethod,
        adresse_livraison: shippingAddress,
        // You might want to include order items here if your backend expects it
        // items: items.map(item => ({ productId: item.productId, quantity: item.quantity, price: item.price }))
      }

      const token = getToken()
      if (!token) {
        throw new Error("Authentication token not found.")
      }

      await createCommande(orderData, token) // Call the new API function

      toast({
        title: "Commande passée !",
        description: "Votre commande a été passée avec succès. Vous recevrez un email de confirmation.",
      })
      clearCart()
      router.push("/checkout/success")
    } catch (error: any) {
      console.error("Error placing order:", error)
      toast({
        title: "Erreur de commande",
        description:
          error.message || "Une erreur est survenue lors du traitement de votre commande. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-brun-chocolat">Paiement</h1>

      <form onSubmit={handlePlaceOrder} className="grid gap-8 md:grid-cols-2">
        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle>Adresse de livraison</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={shippingAddress.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={shippingAddress.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                name="address"
                value={shippingAddress.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="city">Ville</Label>
                <Input id="city" name="city" value={shippingAddress.city} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="zip">Code Postal</Label>
                <Input id="zip" name="zip" value={shippingAddress.zip} onChange={handleInputChange} required />
              </div>
            </div>
            <div>
              <Label htmlFor="country">Pays</Label>
              <Input
                id="country"
                name="country"
                value={shippingAddress.country}
                onChange={handleInputChange}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Method & Order Summary */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Méthode de paiement</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit_card" id="credit_card" />
                  <Label htmlFor="credit_card">Carte de crédit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mobile_money" id="mobile_money" />
                  <Label htmlFor="mobile_money">Mobile Money (Orange Money, Wave, etc.)</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Résumé de la commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Articles ({items.length}):</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison:</span>
                <span>{formatPrice(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes:</span>
                <span>{formatPrice(0)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-corail-intensifie text-white hover:bg-corail-doux"
                disabled={isLoading || items.length === 0}
              >
                {isLoading ? "Traitement..." : "Passer la commande"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}
