"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Users, ShoppingCart, Package, Eye, Download, Calendar, Filter, BarChart } from "lucide-react"

export function AdminAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("XAF", "FCFA")
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-brun-chocolat">Analytics & Reporting</h1>
          <p className="text-taupe-fonce">Analyse détaillée des performances de votre boutique</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40 border-taupe-rose">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 derniers jours</SelectItem>
              <SelectItem value="30d">30 derniers jours</SelectItem>
              <SelectItem value="90d">3 derniers mois</SelectItem>
              <SelectItem value="1y">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-taupe-fonce">Chiffre d'Affaires</p>
                <p className="text-2xl font-bold text-brun-chocolat">0 FCFA</p>
                <p className="text-sm text-gray-500">Aucune vente</p>
              </div>
              <div className="p-3 bg-corail-doux/10 rounded-full">
                <TrendingUp className="w-6 h-6 text-corail-doux" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-taupe-fonce">Commandes Totales</p>
                <p className="text-2xl font-bold text-brun-chocolat">0</p>
                <p className="text-sm text-gray-500">Aucune commande</p>
              </div>
              <div className="p-3 bg-corail-doux/10 rounded-full">
                <ShoppingCart className="w-6 h-6 text-corail-doux" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-taupe-fonce">Nouveaux Clients</p>
                <p className="text-2xl font-bold text-brun-chocolat">0</p>
                <p className="text-sm text-gray-500">Aucun client</p>
              </div>
              <div className="p-3 bg-corail-doux/10 rounded-full">
                <Users className="w-6 h-6 text-corail-doux" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-taupe-fonce">Taux de Conversion</p>
                <p className="text-2xl font-bold text-brun-chocolat">0%</p>
                <p className="text-sm text-gray-500">Aucune donnée</p>
              </div>
              <div className="p-3 bg-corail-doux/10 rounded-full">
                <Eye className="w-6 h-6 text-corail-doux" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-taupe-rose">
          <TabsTrigger value="sales" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            Ventes
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            Produits
          </TabsTrigger>
          <TabsTrigger value="customers" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            Clients
          </TabsTrigger>
          <TabsTrigger value="conversion" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            Conversion
          </TabsTrigger>
        </TabsList>

        {/* Sales Analytics */}
        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Ventes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart className="w-16 h-16 text-taupe-rose mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-brun-chocolat mb-2">Aucune donnée de vente</h3>
                <p className="text-taupe-fonce">Les graphiques apparaîtront quand vous aurez des ventes</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Analytics */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meilleures Performances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-taupe-rose mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-brun-chocolat mb-2">Aucun produit</h3>
                <p className="text-taupe-fonce">Ajoutez des produits pour voir les performances</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Analytics */}
        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Acquisition de Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-taupe-rose mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-brun-chocolat mb-2">Aucun client</h3>
                <p className="text-taupe-fonce">Les données clients apparaîtront ici</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conversion Analytics */}
        <TabsContent value="conversion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Suivi des Taux de Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Eye className="w-16 h-16 text-taupe-rose mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-brun-chocolat mb-2">Aucune donnée de conversion</h3>
                <p className="text-taupe-fonce">Les statistiques de conversion apparaîtront ici</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Génération de Rapports Exportables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col border-corail-doux text-corail-doux hover:bg-corail-doux hover:text-white bg-transparent"
            >
              <Download className="w-6 h-6 mb-2" />
              Rapport Mensuel
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col border-corail-doux text-corail-doux hover:bg-corail-doux hover:text-white bg-transparent"
            >
              <Filter className="w-6 h-6 mb-2" />
              Rapport Personnalisé
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col border-corail-doux text-corail-doux hover:bg-corail-doux hover:text-white bg-transparent"
            >
              <TrendingUp className="w-6 h-6 mb-2" />
              Analyse Prédictive
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
