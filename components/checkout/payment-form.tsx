"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Smartphone, CreditCard, Building, Shield } from "lucide-react"
import type { PaymentData } from "./checkout-page"

interface PaymentFormProps {
  onDataChange: (data: PaymentData | null) => void
}

const paymentMethods = [
  {
    id: "mobile-money",
    name: "Mobile Money",
    description: "Airtel Money, Moov Money",
    icon: Smartphone,
    popular: true,
    fees: "Gratuit",
  },
  {
    id: "bank-transfer",
    name: "Virement Bancaire",
    description: "BGFI, UGB, Ecobank",
    icon: Building,
    popular: false,
    fees: "Gratuit",
  },
  {
    id: "e-billing",
    name: "E-BILLING",
    description: "Paiement électronique sécurisé",
    icon: CreditCard,
    popular: false,
    fees: "2% de frais",
  },
]

const mobileOperators = [
  { value: "airtel", label: "Airtel Money" },
  { value: "moov", label: "Moov Money" },
]

const banks = [
  { value: "bgfi", label: "BGFI Bank" },
  { value: "ugb", label: "UGB" },
  { value: "ecobank", label: "Ecobank" },
  { value: "bicig", label: "BICIG" },
]

export function PaymentForm({ onDataChange }: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [selectedOperator, setSelectedOperator] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [ebillingAccount, setEbillingAccount] = useState("")

  const handleMethodChange = (method: string) => {
    setSelectedMethod(method)
    updatePaymentData(method, mobileNumber, selectedBank, ebillingAccount)
  }

  const updatePaymentData = (method: string, mobile: string, bank: string, ebilling: string) => {
    if (!method) {
      onDataChange(null)
      return
    }

    const paymentData: PaymentData = {
      method: method as PaymentData["method"],
    }

    switch (method) {
      case "mobile-money":
        if (mobile && selectedOperator) {
          paymentData.mobileNumber = mobile
          onDataChange(paymentData)
        } else {
          onDataChange(null)
        }
        break
      case "bank-transfer":
        if (bank) {
          paymentData.bankDetails = bank
          onDataChange(paymentData)
        } else {
          onDataChange(null)
        }
        break
      case "e-billing":
        if (ebilling) {
          paymentData.ebillingAccount = ebilling
          onDataChange(paymentData)
        } else {
          onDataChange(null)
        }
        break
      default:
        onDataChange(null)
    }
  }

  const handleMobileNumberChange = (value: string) => {
    setMobileNumber(value)
    updatePaymentData(selectedMethod, value, selectedBank, ebillingAccount)
  }

  const handleBankChange = (value: string) => {
    setSelectedBank(value)
    updatePaymentData(selectedMethod, mobileNumber, value, ebillingAccount)
  }

  const handleEbillingChange = (value: string) => {
    setEbillingAccount(value)
    updatePaymentData(selectedMethod, mobileNumber, selectedBank, value)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Mode de paiement</h3>
        <p className="text-sm text-muted-foreground">Choisissez votre méthode de paiement préférée</p>
      </div>

      <RadioGroup value={selectedMethod} onValueChange={handleMethodChange}>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <Card
              key={method.id}
              className={`cursor-pointer transition-colors ${
                selectedMethod === method.id ? "border-primary bg-primary/5" : "hover:border-muted-foreground"
              }`}
              onClick={() => handleMethodChange(method.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full">
                      <method.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Label htmlFor={method.id} className="font-medium cursor-pointer">
                          {method.name}
                        </Label>
                        {method.popular && (
                          <Badge variant="secondary" className="text-xs">
                            Populaire
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-green-600">{method.fees}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method Details */}
                {selectedMethod === method.id && (
                  <div className="mt-4 pt-4 border-t space-y-4">
                    {method.id === "mobile-money" && (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="operator">Opérateur</Label>
                          <Select value={selectedOperator} onValueChange={setSelectedOperator}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir un opérateur" />
                            </SelectTrigger>
                            <SelectContent>
                              {mobileOperators.map((operator) => (
                                <SelectItem key={operator.value} value={operator.value}>
                                  {operator.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="mobile">Numéro de téléphone</Label>
                          <Input
                            id="mobile"
                            value={mobileNumber}
                            onChange={(e) => handleMobileNumberChange(e.target.value)}
                            placeholder="+241 77 12 34 56"
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Vous recevrez un SMS pour confirmer le paiement
                        </div>
                      </div>
                    )}

                    {method.id === "bank-transfer" && (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="bank">Banque</Label>
                          <Select value={selectedBank} onValueChange={handleBankChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir votre banque" />
                            </SelectTrigger>
                            <SelectContent>
                              {banks.map((bank) => (
                                <SelectItem key={bank.value} value={bank.value}>
                                  {bank.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Les détails de virement vous seront envoyés par email après confirmation
                        </div>
                      </div>
                    )}

                    {method.id === "e-billing" && (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="ebilling">Compte E-BILLING</Label>
                          <Input
                            id="ebilling"
                            value={ebillingAccount}
                            onChange={(e) => handleEbillingChange(e.target.value)}
                            placeholder="Votre identifiant E-BILLING"
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">Frais de 2% appliqués sur le montant total</div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </RadioGroup>

      {/* Security Info */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Paiement 100% sécurisé</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Toutes vos transactions sont protégées par un cryptage SSL et respectent les normes de sécurité gabonaises.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
