"use client"

import { User2 } from "lucide-react"
import { useRouter } from "next/navigation" // Import useRouter
import { Button } from "@/components/ui/button" // Import Button

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/auth"

export default function AccountPage() {
  const { getUser, logout, clearAuthData } = useAuth() // Destructure logout and clearAuthData
  const user = getUser()
  const router = useRouter() // Initialize useRouter

  const handleLogout = () => {
    logout()
    clearAuthData()
    router.push("/") // Redirect to home after logout
  }

  return (
    <ProtectedRoute allowedRoles={["client", "admin"]}>
      <div className="container mx-auto py-8">
        <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">Mon Compte</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Informations Personnelles</CardTitle>
              <User2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold">
                {user?.prenom} {user?.nom}
              </p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <p className="text-sm text-muted-foreground">{user?.telephone}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Membre depuis: {new Date(user?.date_creation || "").toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Adresses de Livraison</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Aucune adresse enregistrée.</p>
              {/* Placeholder for address management */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Gérez vos préférences de notification.</p>
              {/* Placeholder for notification settings */}
            </CardContent>
          </Card>
        </div>

        {/* New Logout Button */}
        <div className="mt-8 flex justify-center">
          <Button onClick={handleLogout} className="w-full max-w-xs bg-destructive hover:bg-destructive/90">
            Déconnexion
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  )
}
