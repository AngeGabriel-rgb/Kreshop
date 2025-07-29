"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth, logout } from "@/lib/auth"
import { User, LogOut, Shield, UserCheck } from "lucide-react"

export default function AuthStatus() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { getUser, isAuthenticated, isAdmin, isClient } = useAuth()

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getUser())
    }
  }, [])

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await logout()
      setUser(null)
      window.location.reload() // Recharger la page après déconnexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated() || !user) {
    return null
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Statut de connexion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Utilisateur :</span>
          <span className="text-sm">
            {user.prenom} {user.nom}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Email :</span>
          <span className="text-sm">{user.email}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Rôle :</span>
          <Badge variant={isAdmin() ? "default" : "secondary"} className="flex items-center gap-1">
            {isAdmin() ? (
              <>
                <Shield className="h-3 w-3" />
                Administrateur
              </>
            ) : (
              <>
                <UserCheck className="h-3 w-3" />
                Client
              </>
            )}
          </Badge>
        </div>

        {user.telephone && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Téléphone :</span>
            <span className="text-sm">{user.telephone}</span>
          </div>
        )}

        <Button onClick={handleLogout} variant="outline" className="w-full bg-transparent" disabled={isLoading}>
          <LogOut className="mr-2 h-4 w-4" />
          {isLoading ? "Déconnexion..." : "Se déconnecter"}
        </Button>
      </CardContent>
    </Card>
  )
}
