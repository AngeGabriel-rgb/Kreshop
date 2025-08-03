"use client"

import * as React from "react"
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react"
import { AdminDashboardSidebar } from "@/components/admin-dashboard-sidebar"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/protected-route"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { fetchAnalyticsMetrics, type AnalyticsMetrics } from "@/lib/api" // Importez fetchAnalyticsMetrics
import { useAuth } from "@/lib/auth" // Importez useAuth pour le token

export default function AdminAnalyticsPage() {
  const { toast } = useToast()
  const [analyticsData, setAnalyticsData] = React.useState<AnalyticsMetrics | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [, setError] = React.useState<string | null>(null)
  const { getToken } = useAuth()

  React.useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        setError(null)
        const token = getToken()
        if (!token) {
          setError("Token d'authentification manquant. Veuillez vous reconnecter.")
          setLoading(false)
          return
        }
        const data = await fetchAnalyticsMetrics(token)
        setAnalyticsData(data)
      } catch (err: any) {
        setError(err.message || "Échec du chargement des données d'analyse.")
        toast({
          title: "Erreur de chargement",
          description: err.message || "Impossible de charger les données d'analyse.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [getToken, toast])

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["admin"]}>
        <div className="flex min-h-[calc(100svh-12rem)]">
          <AdminDashboardSidebar />
          <div className="flex-1 container mx-auto py-8 px-4 md:px-6">
            <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">
              Analyses et Rapports
            </h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="flex min-h-[calc(100svh-12rem)]">
        <AdminDashboardSidebar />
        <div className="flex-1 container mx-auto py-8 px-4 md:px-6">
          <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">
            Analyses et Rapports
          </h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total des Ventes (Mois)</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData?.totalSalesMonth.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}
                </div>
                <p className="text-xs text-muted-foreground">
                  {analyticsData?.salesGrowthMonth != null
                    ? analyticsData.salesGrowthMonth > 0
                      ? `+${analyticsData.salesGrowthMonth}%`
                      : `${analyticsData.salesGrowthMonth}%`
                    : "--"}{" "}
                  par rapport au mois dernier
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Commandes Traitées</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData?.processedOrders}</div>
                <p className="text-xs text-muted-foreground">
                  {/* Cette ligne pourrait aussi venir de l'API */}
                  +10% par rapport au mois dernier
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nouveaux Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData?.newClients}</div>
                <p className="text-xs text-muted-foreground">
                  {analyticsData?.clientsGrowthMonth != null
                    ? analyticsData.clientsGrowthMonth > 0
                      ? `+${analyticsData.clientsGrowthMonth}%`
                      : `${analyticsData.clientsGrowthMonth}%`
                    : "--"}{" "}
                  par rapport au mois dernier
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData?.conversionRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {/* Cette ligne pourrait aussi venir de l'API */}
                  Cible: 4%
                </p>
              </CardContent>
            </Card>
          </div>

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
                <CardTitle>Produits les Plus Vendus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Graphique des produits les plus vendus (Placeholder)
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Analyse Comportementale des Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Graphique d'analyse comportementale (Placeholder)
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Rapports Exportables</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Générez des rapports détaillés au format PDF ou CSV.</p>
                <div className="flex gap-2">
                  <Button variant="outline">Exporter PDF</Button>
                  <Button variant="outline">Exporter CSV</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
