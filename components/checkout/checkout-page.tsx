"use client"

import { useState } from "react"
import { useCartStore } from "@/lib/cart-store"
import { CheckoutSteps } from "./checkout-steps"
import { AddressForm } from "./address-form"
import { DeliveryOptions } from "./delivery-options"
import { PaymentForm } from "./payment-form"
import { OrderConfirmation } from "./order-confirmation"
import { OrderSummary } from "./order-summary"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export type CheckoutStep = "address" | "delivery" | "payment" | "confirmation"

export interface AddressData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
}

export interface PaymentData {
  method: "mobile-money" | "bank-transfer" | "e-billing"
  mobileNumber?: string
  bankDetails?: string
  ebillingAccount?: string
}

export function CheckoutPage() {
  const { items, getTotal } = useCartStore()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("address")
  const [addressData, setAddressData] = useState<AddressData | null>(null)
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
        <p className="text-muted-foreground mb-8">Ajoutez des produits pour passer une commande.</p>
        <Button asChild>
          <a href="/produits">Continuer mes achats</a>
        </Button>
      </div>
    )
  }

  const handleNextStep = () => {
    switch (currentStep) {
      case "address":
        if (!addressData) {
          toast({
            title: "Informations manquantes",
            description: "Veuillez remplir vos informations de livraison",
            variant: "destructive",
          })
          return
        }
        setCurrentStep("delivery")
        break
      case "delivery":
        setCurrentStep("payment")
        break
      case "payment":
        if (!paymentData) {
          toast({
            title: "Mode de paiement requis",
            description: "Veuillez sélectionner un mode de paiement",
            variant: "destructive",
          })
          return
        }
        handlePlaceOrder()
        break
    }
  }

  const handlePrevStep = () => {
    switch (currentStep) {
      case "delivery":
        setCurrentStep("address")
        break
      case "payment":
        setCurrentStep("delivery")
        break
      case "confirmation":
        setCurrentStep("payment")
        break
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setCurrentStep("confirmation")
      toast({
        title: "Commande confirmée",
        description: "Votre commande a été passée avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la commande",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case "address":
        return "Informations de livraison"
      case "delivery":
        return "Mode de livraison"
      case "payment":
        return "Paiement"
      case "confirmation":
        return "Confirmation"
      default:
        return ""
    }
  }

  const canGoNext = () => {
    switch (currentStep) {
      case "address":
        return !!addressData
      case "delivery":
        return true
      case "payment":
        return !!paymentData
      default:
        return false
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Finaliser ma commande</h1>
        <p className="text-muted-foreground">Total: {getTotal().toLocaleString()} FCFA</p>
      </div>

      <CheckoutSteps currentStep={currentStep} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-6">{getStepTitle()}</h2>

            {currentStep === "address" && <AddressForm onDataChange={setAddressData} />}
            {currentStep === "delivery" && <DeliveryOptions />}
            {currentStep === "payment" && <PaymentForm onDataChange={setPaymentData} />}
            {currentStep === "confirmation" && (
              <OrderConfirmation addressData={addressData!} paymentData={paymentData!} />
            )}
          </div>

          {/* Navigation Buttons */}
          {currentStep !== "confirmation" && (
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === "address"}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Précédent
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={!canGoNext() || isProcessing}
                className="btn-primary"
                loading={isProcessing}
              >
                {currentStep === "payment" ? "Confirmer la commande" : "Suivant"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}
