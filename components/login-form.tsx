"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock } from "lucide-react"
import { loginClient, useAuth } from "@/lib/auth"
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
  const router = useRouter()
  const { setAuthData, isAuthenticated, clearAuthData } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleLogout = () => {
    clearAuthData()
    setSuccess("Déconnexion réussie. Vous pouvez maintenant vous connecter.")
    setTimeout(() => setSuccess(""), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // Déconnexion automatique avant nouvelle connexion
      clearAuthData()

      const loginData: LoginPayload = {
        email: formData.email,
        password: formData.password,
      }

      const response = await loginClient(loginData)

      // Utiliser setAuthData pour stocker les données d'authentification
      setAuthData(response)

      setSuccess("Connexion réussie !")
      
      // Rediriger vers le dashboard client
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erreur lors de la connexion")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Afficher un bouton de déconnexion si déjà connecté */}
      {isAuthenticated() && (
        <Alert className="border-orange-200 bg-orange-50 text-orange-800">
          <AlertDescription>
            Vous êtes déjà connecté. 
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="ml-2"
            >
              Se déconnecter
            </Button>
          </AlertDescription>
        </Alert>
      )}

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
