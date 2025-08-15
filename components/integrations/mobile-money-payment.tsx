"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, Smartphone, CreditCard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MobileMoneyPaymentProps {
  amount: number
  orderId: string
  onSuccess: (transactionId: string) => void
  onError: (error: string) => void
}

export function MobileMoneyPayment({ amount, orderId, onSuccess, onError }: MobileMoneyPaymentProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const providers = [
    {
      id: "orange-money",
      name: "Orange Money",
      logo: "/placeholder.svg?height=40&width=40",
      prefixes: ["07", "08"],
      color: "bg-orange-500",
    },
    {
      id: "airtel-money",
      name: "Airtel Money",
      logo: "/placeholder.svg?height=40&width=40",
      prefixes: ["05", "06"],
      color: "bg-red-500",
    },
    {
      id: "moov-money",
      name: "Moov Money",
      logo: "/placeholder.svg?height=40&width=40",
      prefixes: ["01", "02"],
      color: "bg-blue-500",
    },
  ]

  const validatePhoneNumber = (phone: string, provider: string) => {
    const cleanPhone = phone.replace(/\s/g, "")
    const selectedProviderData = providers.find((p) => p.id === provider)

    if (!selectedProviderData) return false

    // Vérifier le format gabonais
    if (!/^(\+241|0)?[0-9]{8}$/.test(cleanPhone)) return false

    // Vérifier le préfixe selon l'opérateur
    const phoneWithoutCountryCode = cleanPhone.replace(/^\+?241/, "").replace(/^0/, "")
    const prefix = phoneWithoutCountryCode.substring(0, 2)

    return selectedProviderData.prefixes.includes(prefix)
  }

  const handlePayment = async () => {
    if (!selectedProvider) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un opérateur",
        variant: "destructive",
      })
      return
    }

    if (!phoneNumber) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir votre numéro de téléphone",
        variant: "destructive",
      })
      return
    }

    if (!validatePhoneNumber(phoneNumber, selectedProvider)) {
      toast({
        title: "Erreur",
        description: "Numéro de téléphone invalide pour cet opérateur",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch("/api/payments/mobile-money", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: selectedProvider,
          phoneNumber: phoneNumber.replace(/\s/g, ""),
          amount,
          orderId,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Paiement initié",
          description: "Veuillez confirmer le paiement sur votre téléphone",
        })

        // Simuler l'attente de confirmation
        setTimeout(() => {
          if (data.success) {
            onSuccess(data.transactionId)
          } else {
            onError(data.message || "Erreur lors du paiement")
          }
        }, 5000)
      } else {
        onError(data.message || "Erreur lors du paiement")
      }
    } catch (error) {
      onError("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          Paiement Mobile Money
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-2xl font-bold price-fcfa text-primary">{amount.toLocaleString()} FCFA</p>
          <p className="text-sm text-muted-foreground">Montant à payer</p>
        </div>

        <div className="space-y-4">
          <Label>Sélectionnez votre opérateur</Label>
          <RadioGroup value={selectedProvider} onValueChange={setSelectedProvider}>
            {providers.map((provider) => (
              <div key={provider.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                <RadioGroupItem value={provider.id} id={provider.id} />
                <div className="flex items-center space-x-3 flex-1">
                  <div className={`w-10 h-10 rounded-lg ${provider.color} flex items-center justify-center`}>
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <Label htmlFor={provider.id} className="font-medium cursor-pointer">
                      {provider.name}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Préfixes : {provider.prefixes.map((p) => `0${p}`).join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Numéro de téléphone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+241 07 12 34 56 78"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={isProcessing}
          />
          <p className="text-xs text-muted-foreground">Saisissez le numéro associé à votre compte Mobile Money</p>
        </div>

        <Button onClick={handlePayment} disabled={!selectedProvider || !phoneNumber || isProcessing} className="w-full">
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Traitement en cours...
            </>
          ) : (
            `Payer ${amount.toLocaleString()} FCFA`
          )}
        </Button>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>• Vous recevrez une notification sur votre téléphone</p>
          <p>• Composez votre code PIN pour confirmer</p>
          <p>• Le paiement sera traité instantanément</p>
        </div>
      </CardContent>
    </Card>
  )
}
