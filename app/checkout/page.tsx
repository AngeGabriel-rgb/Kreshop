"use client"

import type React from "react"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { createInvoiceOnServer, getGatewayUrl } from "@/actions"
import { Loader2, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function CheckoutPage() {
  const { items, getTotalItems, getTotal, removeItem, clearCart } = useCartStore()

  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const total = getTotal()
  const itemCount = getTotalItems()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const invoiceData = {
      payer_msisdn: phone,
      amount: total,
      short_description: `Commande KreShop - ${itemCount} article(s)`,
      payer_email: email,
      description: `Paiement pour commande KreShop avec ${itemCount} article(s)`,
      external_reference: `KRESHOP-${Date.now()}`,
    }

    try {
      const invoice = await createInvoiceOnServer(invoiceData)
      const { url } = await getGatewayUrl(invoice.e_bill.bill_id)
      window.location.href = url
    } catch (err) {
      console.error("Erreur lors du paiement :", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream-white">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-charcoal-black mb-2">Finaliser la commande</h1>
          <p className="text-gray-600">Vérifiez vos articles et procédez au paiement</p>
        </div>

        {itemCount === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-charcoal-black mb-2">Votre panier est vide</h2>
              <p className="text-gray-600 mb-6">Ajoutez des produits à votre panier pour continuer</p>
              <Button
                onClick={() => (window.location.href = "/")}
                className="bg-golden-yellow hover:bg-golden-yellow/90 text-charcoal-black"
              >
                Continuer les achats
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-charcoal-black">Récapitulatif de la commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.color}-${item.size}`}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        {item.image ? (
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-charcoal-black">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        {item.color && <p className="text-sm text-gray-600">Couleur: {item.color}</p>}
                        {item.size && <p className="text-sm text-gray-600">Taille: {item.size}</p>}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-600">Quantité: {item.quantity}</span>
                          <span className="font-semibold text-golden-yellow">
                            {(item.price * item.quantity).toLocaleString()} FCFA
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id, item.color, item.size)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span className="text-charcoal-black">Total à payer:</span>
                      <span className="text-golden-yellow">{total.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-charcoal-black">Informations de paiement</CardTitle>
                  <p className="text-sm text-gray-600">Paiement sécurisé via E-BILLING</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email" className="text-charcoal-black">
                          Adresse email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-charcoal-black">
                          Numéro de téléphone
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+241 XX XX XX XX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Compatible avec Orange Money, Airtel Money, Moov Money
                        </p>
                      </div>
                    </div>

                    <div className="bg-sage-green/10 p-4 rounded-lg">
                      <h3 className="font-medium text-charcoal-black mb-2">Récapitulatif</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Articles ({itemCount}):</span>
                          <span>{total.toLocaleString()} FCFA</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Livraison:</span>
                          <span className="text-green-600">Gratuite</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold">
                          <span>Total:</span>
                          <span className="text-golden-yellow">{total.toLocaleString()} FCFA</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-golden-yellow hover:bg-golden-yellow/90 text-charcoal-black font-semibold py-3"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Traitement en cours...
                        </span>
                      ) : (
                        `Payer ${total.toLocaleString()} FCFA`
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
