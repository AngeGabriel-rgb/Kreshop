"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getDashboardMetrics } from "@/lib/data" // Use new data function
import { DollarSign, Package, Users, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import type { DashboardMetrics } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { useClerkAuth } from "@/hooks/use-clerk-auth" // Import useClerkAuth to get token
import { formatPrice } from "@/lib/utils"

export default function AdminDashboardPage() {
  const { toast } = useToast()
  const { getToken } = useClerkAuth() // Get token from Clerk auth hook
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      const token = getToken()
      if (!token) {
        setError("Authentication token not found.")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const data = await getDashboardMetrics(token) // This function now uses the token internally
        setMetrics(data)
      } catch (err: any) {
        setError(err.message || "Failed to fetch dashboard metrics.")
        toast({
          title: "Erreur",
          description: err.message || "Failed to fetch dashboard metrics.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchMetrics()
  }, [getToken, toast]) // Depend on getToken to re-fetch if token changes (e.g., after login)

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="mt-2 h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) return <div className="text-destructive">Erreur de chargement du tableau de bord: {error}</div>

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-brun-chocolat">Tableau de bord Admin</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(metrics?.totalSales || 0)}</div>
            <p className="text-xs text-gray-500">+{metrics?.salesGrowth || 0}% depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes en Attente</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.pendingOrders}</div>
            <p className="text-xs text-gray-500">Commandes non traitées</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.activeClients}</div>
            <p className="text-xs text-gray-500">+{metrics?.clientsGrowth || 0}% depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits en faible stock</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.lowStockProducts}</div>{" "}
            {/* Assuming lowStockProducts is total products for now */}
            <p className="text-xs text-gray-500">Articles nécessitant un réapprovisionnement</p>
          </CardContent>
        </Card>
      </div>

      {/* Add more sections like recent orders, sales charts etc. */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-brun-chocolat">Activité Récente (Mock)</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <ul className="space-y-2">
              <li>Nouvelle commande #ORDER456</li>
              <li>Produit "Cafetière Élégance" mis à jour</li>
              <li>Nouvel administrateur Bob Admin ajouté</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-brun-chocolat">Statistiques de Vente (Mock)</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>Graphique des ventes mensuelles à venir ici.</p>
            <p className="text-sm mt-2">(Utiliser une librairie de graphiques comme Recharts ou Chart.js)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
