"use client"

import { Package, ShoppingCart, User2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/auth"

export default function ClientDashboardPage() {
  const { getUser } = useAuth()
  const user = getUser()

  return (
    <ProtectedRoute allowedRoles={["client", "admin"]}>
      <div className="container mx-auto py-8">
        <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">
          Bienvenue, {user?.prenom || "Client"} !
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes Récentes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Dernière commande il y a 2 jours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produits Favoris</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Ajoutés à votre wishlist</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mon Profil</CardTitle>
              <User2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user?.email}</div>
              <p className="text-xs text-muted-foreground">Gérez vos informations personnelles</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">
            Historique des Commandes
          </h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Aucune commande récente à afficher.</p>
              {/* Placeholder for a table of orders */}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
