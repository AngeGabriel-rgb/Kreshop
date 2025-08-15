"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Plus } from "lucide-react"
import type { AddressData } from "./checkout-page"

interface AddressFormProps {
  onDataChange: (data: AddressData | null) => void
}

const librevilleDistricts = [
  "Libreville Centre",
  "Akanda",
  "Owendo",
  "Nzeng-Ayong",
  "Lalala",
  "Nombakélé",
  "Plaine Orety",
  "Mindoubé",
  "Okala",
  "Aéroport",
]

const savedAddresses = [
  {
    id: 1,
    label: "Domicile",
    firstName: "Marie",
    lastName: "Nzamba",
    address: "Quartier Nombakélé, Rue de la Paix",
    city: "Libreville Centre",
    phone: "+241 77 12 34 56",
    isDefault: true,
  },
  {
    id: 2,
    label: "Bureau",
    firstName: "Marie",
    lastName: "Nzamba",
    address: "Boulevard Triomphal, Immeuble Gabon Telecom",
    city: "Libreville Centre",
    phone: "+241 77 12 34 56",
    isDefault: false,
  },
]

export function AddressForm({ onDataChange }: AddressFormProps) {
  const [selectedAddress, setSelectedAddress] = useState<number | null>(1)
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
  const [formData, setFormData] = useState<AddressData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Gabon",
  })

  useEffect(() => {
    if (selectedAddress) {
      const address = savedAddresses.find((addr) => addr.id === selectedAddress)
      if (address) {
        const addressData: AddressData = {
          firstName: address.firstName,
          lastName: address.lastName,
          email: "marie.nzamba@email.com", // Mock email
          phone: address.phone,
          address: address.address,
          city: address.city,
          postalCode: "BP 123", // Mock postal code
          country: "Gabon",
        }
        setFormData(addressData)
        onDataChange(addressData)
      }
    } else if (showNewAddressForm) {
      // Check if form is valid
      const isValid = Object.values(formData).every((value) => value.trim() !== "")
      onDataChange(isValid ? formData : null)
    } else {
      onDataChange(null)
    }
  }, [selectedAddress, showNewAddressForm, formData, onDataChange])

  const handleInputChange = (field: keyof AddressData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddressSelection = (addressId: number) => {
    setSelectedAddress(addressId)
    setShowNewAddressForm(false)
  }

  const handleNewAddress = () => {
    setSelectedAddress(null)
    setShowNewAddressForm(true)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "Gabon",
    })
  }

  return (
    <div className="space-y-6">
      {/* Saved Addresses */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <span>Choisir une adresse</span>
        </h3>

        {savedAddresses.map((address) => (
          <Card
            key={address.id}
            className={`cursor-pointer transition-colors ${
              selectedAddress === address.id ? "border-primary bg-primary/5" : "hover:border-muted-foreground"
            }`}
            onClick={() => handleAddressSelection(address.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Checkbox checked={selectedAddress === address.id} readOnly />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">{address.label}</span>
                    {address.isDefault && (
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        Par défaut
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {address.firstName} {address.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{address.address}</p>
                  <p className="text-sm text-muted-foreground">
                    {address.city} • {address.phone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* New Address Option */}
        <Card
          className={`cursor-pointer transition-colors border-dashed ${
            showNewAddressForm ? "border-primary bg-primary/5" : "hover:border-muted-foreground"
          }`}
          onClick={handleNewAddress}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Checkbox checked={showNewAddressForm} readOnly />
              <div className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span className="font-medium">Ajouter une nouvelle adresse</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Address Form */}
      {showNewAddressForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nouvelle adresse de livraison</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+241 77 12 34 56"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Adresse complète *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Numéro, rue, quartier"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Quartier/Ville *</Label>
                <Select value={formData.city} onValueChange={(value) => handleInputChange("city", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un quartier" />
                  </SelectTrigger>
                  <SelectContent>
                    {librevilleDistricts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="postalCode">Code postal</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  placeholder="BP 123"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="saveAddress" />
              <Label htmlFor="saveAddress" className="text-sm">
                Enregistrer cette adresse pour mes prochaines commandes
              </Label>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
