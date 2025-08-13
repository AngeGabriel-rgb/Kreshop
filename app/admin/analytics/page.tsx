"use client"

import { useEffect } from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAnalyticsMetrics } from "@/lib/data" // Use new data function
import { DollarSign, Package, Users, TrendingUp } from "lucide-react"
import { useAuth } from "@/lib/auth" // Import useAuth to get token
import { formatPrice } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminAnalyticsPage() {
  const { getToken } = useAuth()
  const [metrics, setMetrics] = useState<any>(null)
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
        const data = await getAnalyticsMetrics(token)
        setMetrics(data)
      } catch (err: any) {
        setError(err.message || "Failed to fetch analytics metrics.")
        console.error("Error fetching analytics metrics:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchMetrics()
  }, [getToken])

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

  if (error) {
    return <div className="text-center text-red-500">Erreur: {error}</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-brun-chocolat">Analyses du Tableau de Bord</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventes du Mois</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(metrics?.totalSalesMonth || 0)}</div>
            <p className="text-xs text-gray-500">+{metrics?.salesGrowthMonth || 0}% par rapport au mois précédent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes Traitées</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.processedOrders || 0}</div>
            <p className="text-xs text-gray-500">Commandes finalisées ce mois-ci</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux Clients</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.newClients || 0}</div>
            <p className="text-xs text-gray-500">+{metrics?.clientsGrowthMonth || 0}% par rapport au mois précédent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.conversionRate || 0}%</div>
            <p className="text-xs text-gray-500">Visiteurs convertis en acheteurs</p>
          </CardContent>
        </Card>
      </div>

      {/* Add more detailed charts or reports here */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Graphique des Ventes Mensuelles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Un graphique des ventes ici...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Répartition des Catégories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Un graphique en secteurs des catégories ici...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
