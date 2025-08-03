"use client"

import * as React from "react"
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/protected-route"
import { Skeleton } from "@/components/ui/skeleton"
import { AdminDashboardSidebar } from "@/components/admin-dashboard-sidebar" // Importez le nouveau composant
import { useToast } from "@/components/ui/use-toast"

// Interface pour les métriques du tableau de bord
interface DashboardMetrics {
  totalSales: number
  pendingOrders: number
  activeClients: number
  lowStockProducts: number
  salesGrowth: number // en pourcentage
  clientsGrowth: number // en pourcentage
}

export default function AdminDashboardPage() {
  const { toast } = useToast()
  const [metrics, setMetrics] = React.useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        setLoading(true)
        setError(null)
        // Simuler un appel API pour récupérer les métriques du tableau de bord
        // En production, vous feriez un appel à votre backend, par exemple:
        // const data = await fetchApi<DashboardMetrics>("/admin/dashboard/metrics", { headers: createAuthHeaders(getToken()) });
        await new Promise((resolve) => setTimeout(resolve, 1500)) // Simuler le temps de chargement

        const mockData: DashboardMetrics = {
          totalSales: 5450000,
          pendingOrders: 15,
          activeClients: 2350,
          lowStockProducts: 7,
          salesGrowth: 20.1,
          clientsGrowth: 180.1,
        }
        setMetrics(mockData)
      } catch (err: any) {
        setError(err.message || "Échec du chargement des métriques du tableau de bord.")
        toast({
          title: "Erreur de chargement",
          description: err.message || "Impossible de charger les données du tableau de bord.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardMetrics()
  }, [toast])

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="flex min-h-[calc(100svh-12rem)]">
        <AdminDashboardSidebar /> {/* Intégrez la barre latérale ici */}
        <div className="flex-1 container mx-auto py-8 px-4 md:px-6">
          <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">
            Dashboard Administrateur
          </h1>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          ) : error ? (
            <div className="flex h-64 items-center justify-center text-destructive">
              <p>{error}</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total des Ventes</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metrics?.totalSales.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {metrics && metrics.salesGrowth !== undefined
                      ? metrics.salesGrowth > 0
                        ? `+${metrics.salesGrowth}%`
                        : `${metrics.salesGrowth}%`
                      : ""}
                    {" "}par rapport au mois dernier
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Commandes en Attente</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics?.pendingOrders}</div>
                  <p className="text-xs text-muted-foreground">Nouvelles commandes aujourd'hui</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{metrics?.activeClients}</div>
                  <p className="text-xs text-muted-foreground">
                    {metrics
                      ? metrics.clientsGrowth > 0
                        ? `+${metrics.clientsGrowth}%`
                        : `${metrics.clientsGrowth}%`
                      : ""}
                    {" "}par rapport au mois dernier
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Produits en Stock Faible</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics?.lowStockProducts}</div>
                  <p className="text-xs text-muted-foreground">Nécessitent un réapprovisionnement</p>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ventes par Période</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Graphique des ventes (Placeholder)
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Commandes Récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Liste des dernières commandes (Placeholder)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
