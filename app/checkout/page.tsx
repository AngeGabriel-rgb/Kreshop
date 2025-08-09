"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { getCartItems, getSubtotal, getShippingCost, getTotal, type CartItem } from "@/lib/cart"
import { createInvoiceOnServer, getGatewayUrl } from "@/actions"
import { useAuth } from "@/lib/auth"

// Schéma de validation pour le formulaire de paiement
const checkoutFormSchema = z.object({
  payer_email: z.string().email("Email invalide").min(1, "L'email est requis"),
  payer_msisdn: z
    .string()
    .min(1, "Le numéro de téléphone est requis")
    .regex(/^\d{9,}$/, "Numéro de téléphone invalide"),
})

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>

export default function CheckoutPage() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { getUser } = useAuth()
  const user = getUser()

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      payer_email: user?.email || "",
      payer_msisdn: user?.telephone || "",
    },
  })

  React.useEffect(() => {
    setCartItems(getCartItems())
    if (getCartItems().length === 0) {
      toast({
        title: "Panier vide",
        description: "Votre panier est vide. Redirection vers la page des produits.",
        variant: "destructive",
      })
      router.push("/products")
    }
  }, [router, toast])

  const subtotal = getSubtotal()
  const shippingCost = getShippingCost()
  const total = getTotal()

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsLoading(true)
    try {
      const totalAmount = getTotal()
      if (totalAmount <= 0) {
        toast({
          title: "Panier vide",
          description: "Votre panier est vide ou le total est de 0. Impossible de procéder au paiement.",
          variant: "destructive",
        })
        return
      }

      const external_reference = `kreshop_order_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`
      const short_description = `Commande KreShop - ${cartItems.length} articles`
      const description = cartItems.map((item) => `${item.name} (x${item.quantity})`).join(", ")

      const invoiceData = {
        payer_msisdn: data.payer_msisdn,
        amount: totalAmount,
        short_description,
        payer_email: data.payer_email,
        description,
        external_reference,
      }

      const invoice = await createInvoiceOnServer(invoiceData)

      if (invoice && invoice.billId) {
        const { url } = await getGatewayUrl(invoice.billId)
        if (url) {
          window.location.href = url 
        } else {
          toast({
            title: "Erreur de paiement",
            description: "Impossible d'obtenir l'URL de la passerelle de paiement.",
            variant: "destructive",
          })
        }
      } else {
        toast({
          title: "Erreur de paiement",
          description: "La création de la facture a échoué ou l'ID de facture est manquant.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors du processus de paiement :", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la préparation du paiement. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (cartItems.length === 0) {
    return null 
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">
        Finaliser la commande
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vos informations</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="payer_email">Email</Label>
                  <Input
                    id="payer_email"
                    type="email"
                    placeholder="votre.email@example.com"
                    {...form.register("payer_email")}
                  />
                  {form.formState.errors.payer_email && (
                    <p className="text-sm text-red-500">{form.formState.errors.payer_email.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="payer_msisdn">Numéro de téléphone</Label>
                  <Input id="payer_msisdn" type="tel" placeholder="Ex: 077123456" {...form.register("payer_msisdn")} />
                  {form.formState.errors.payer_msisdn && (
                    <p className="text-sm text-red-500">{form.formState.errors.payer_msisdn.message}</p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Articles du panier</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.color || ""}-${item.size || ""}`} className="flex items-center gap-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.color && `Couleur: ${item.color}`}
                      {item.color && item.size && ", "}
                      {item.size && `Taille: ${item.size}`}
                      {!item.color && !item.size && "Standard"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.price.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {(item.price * item.quantity).toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Résumé de la commande</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Sous-total:</span>
              <span>{subtotal.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Frais de livraison (Libreville):</span>
              <span>{shippingCost.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold text-primary">
              <span>Total:</span>
              <span>{total.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={form.handleSubmit(onSubmit)} // Le bouton soumet le formulaire
              disabled={isLoading || cartItems.length === 0}
              className="w-full bg-corail-doux hover:bg-corail-intensifie"
            >
              {isLoading ? "Préparation du paiement..." : "Procéder au paiement"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
