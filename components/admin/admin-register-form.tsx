"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, User, Phone, Shield } from "lucide-react"
import { registerAdmin, useAuth } from "@/lib/auth"
import type { RegisterAdminPayload } from "@/lib/auth"

interface AdminRegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}

export default function AdminRegisterForm() {
  const { isAuthenticated, isAdmin, getToken } = useAuth()
  const [formData, setFormData] = useState<AdminRegisterData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (isAuthenticated() && isAdmin()) {
      setIsAuthorized(true)
    }
  }, [isAuthenticated, isAdmin])

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

    const token = getToken()

    if (!token) {
      setError("Token d'authentification manquant")
      setLoading(false)
      return
    }

    try {
      const registerData: RegisterAdminPayload = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      }

      const response = await registerAdmin(registerData, token)

      setSuccess(response.message || "Administrateur créé avec succès !")

      // Réinitialiser le formulaire
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
      })
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erreur lors de la création de l'administrateur")
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthorized) {
    return (
      <Alert variant="destructive">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Vous devez être connecté en tant qu'administrateur pour accéder à cette fonctionnalité.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Alert className="border-blue-200 bg-blue-50 text-blue-800">
        <Shield className="h-4 w-4" />
        <AlertDescription>Création d'un nouveau compte administrateur</AlertDescription>
      </Alert>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Marie"
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
              placeholder="Martin"
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
            placeholder="marie.martin@admin.com"
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
            minLength={8}
            required
          />
        </div>
        <p className="text-sm text-gray-500">Le mot de passe doit contenir au moins 8 caractères</p>
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
            Création...
          </>
        ) : (
          "Créer l'administrateur"
        )}
      </Button>
    </form>
  )
}
