"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock } from "lucide-react"
import { login } from "@/lib/auth"
import type { LoginPayload } from "@/lib/auth"

interface LoginData {
  email: string
  password: string
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
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
      const loginData: LoginPayload = {
        email: formData.email,
        password: formData.password,
      }

      const response = await login(loginData)

      setSuccess("Connexion réussie !")
      // Stocker le token et l'utilisateur
      localStorage.setItem("token", response.token)

      // Gérer les différents types de réponse (client ou admin)
      // Utiliser le rôle renvoyé par le backend si disponible, sinon l'ancienne logique
      const user = response.user || response.client || response.admin
      if (user && response.role) {
        localStorage.setItem("user", JSON.stringify({ ...user, role: response.role }))
      } else if (user) {
        // Fallback pour l'ancienne logique si le rôle n'est pas explicitement renvoyé
        localStorage.setItem("user", JSON.stringify({ ...user, role: response.client ? "client" : "admin" }))
      }

      console.log("Utilisateur connecté:", user)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erreur lors de la connexion")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="votre@email.com"
            value={formData.email}
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
            Connexion...
          </>
        ) : (
          "Se connecter"
        )}
      </Button>
    </form>
  )
}
