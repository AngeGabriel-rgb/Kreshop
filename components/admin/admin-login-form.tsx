"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, Shield } from "lucide-react"
import { loginAdmin, useAuth } from "@/lib/auth"
import type { LoginPayload } from "@/lib/auth"

interface LoginData {
  email: string
  password: string
}

export default function AdminLoginForm() {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const { setAuthData } = useAuth()

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

      const response = await loginAdmin(loginData)

      // Vérifier si l'utilisateur est un administrateur
      if (response.role === "admin") {
        // Utiliser setAuthData pour stocker les données d'authentification
        setAuthData(response)
        
        setSuccess("Connexion administrateur réussie !")
        
        // Rediriger vers le dashboard admin
        setTimeout(() => {
          router.push("/admin")
        }, 1000)
      } else {
        // Si l'utilisateur n'est pas un admin, afficher une erreur
        setError("Accès refusé : Ce formulaire est réservé aux administrateurs.")
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erreur lors de la connexion")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Alert className="border-blue-200 bg-blue-50 text-blue-800">
        <Shield className="h-4 w-4" />
        <AlertDescription>Connexion à votre compte administrateur</AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="admin@email.com"
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
          "Se connecter en tant qu'admin"
        )}
      </Button>
    </form>
  )
}
