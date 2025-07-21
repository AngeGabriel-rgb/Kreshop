"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Package, Users, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

export function AdminDashboard() {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-brun-chocolat">Tableau de Bord</h1>
          <p className="text-taupe-fonce">Vue d'ensemble de votre boutique GabonStyle</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-green-100 text-green-800">En ligne</Badge>
          <span className="text-sm text-taupe-fonce">Dernière mise à jour: maintenant</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-taupe-fonce">Commandes Aujourd'hui</p>
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
                <p className="text-sm font-medium text-taupe-fonce">Revenus du Jour</p>
                <p className="text-2xl font-bold text-brun-chocolat">0 FCFA</p>
                <p className="text-sm text-gray-500">Aucun revenu</p>
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
                <p className="text-sm font-medium text-taupe-fonce">Produits en Stock</p>
                <p className="text-2xl font-bold text-brun-chocolat">0</p>
                <p className="text-sm text-gray-500">Aucun produit</p>
              </div>
              <div className="p-3 bg-corail-doux/10 rounded-full">
                <Package className="w-6 h-6 text-corail-doux" />
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
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Commandes Récentes</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-corail-doux text-corail-doux hover:bg-corail-doux hover:text-white bg-transparent"
                >
                  Voir tout
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-taupe-rose mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-brun-chocolat mb-2">Aucune commande</h3>
                <p className="text-taupe-fonce">Les commandes récentes apparaîtront ici</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Low Stock */}
        <div className="space-y-6">
          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-corail-doux" />
                Alertes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-sm text-taupe-fonce">Aucune alerte</p>
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-corail-doux" />
                Stock Faible
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-taupe-rose mx-auto mb-3" />
                <p className="text-sm text-taupe-fonce">Aucun produit en stock faible</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col bg-corail-doux hover:bg-corail-intensifie text-white">
              <Package className="w-6 h-6 mb-2" />
              Ajouter Produit
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col border-corail-doux text-corail-doux hover:bg-corail-doux hover:text-white bg-transparent"
            >
              <ShoppingCart className="w-6 h-6 mb-2" />
              Nouvelle Commande
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col border-corail-doux text-corail-doux hover:bg-corail-doux hover:text-white bg-transparent"
            >
              <Users className="w-6 h-6 mb-2" />
              Ajouter Client
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col border-corail-doux text-corail-doux hover:bg-corail-doux hover:text-white bg-transparent"
            >
              <TrendingUp className="w-6 h-6 mb-2" />
              Voir Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
