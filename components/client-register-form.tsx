"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, User, Phone } from "lucide-react"
import { registerClient } from "@/lib/auth"
import type { RegisterClientPayload } from "@/lib/auth"

interface ClientRegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}

export default function ClientRegisterForm() {
  const [formData, setFormData] = useState<ClientRegisterData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const registerData: RegisterClientPayload = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      }

      const response = await registerClient(registerData)

      setSuccess("Inscription réussie ! Vous pouvez maintenant vous connecter.")

      // Réinitialiser le formulaire
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
      })

      // Optionnel : connecter automatiquement l'utilisateur
      if (response.token && response.client) {
        localStorage.setItem("token", response.token)
        localStorage.setItem("user", JSON.stringify({ ...response.client, role: "client" }))
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erreur lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Jean"
              value={formData.firstName}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Dupont"
              value={formData.lastName}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jean.dupont@email.com"
            value={formData.email}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="06 12 34 56 78"
            value={formData.phone}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="pl-10"
            minLength={6}
            required
          />
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Inscription...
          </>
        ) : (
          "S'inscrire comme client"
        )}
      </Button>
    </form>
  )
}
