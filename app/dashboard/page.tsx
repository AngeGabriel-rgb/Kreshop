"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/lib/auth"
import { fetchCommandes, type Commande } from "@/lib/api"
import { ShoppingBag, Package, Heart, CreditCard, User, MapPin, TrendingUp, Loader2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ClientDashboard() {
  const { getUser, getToken } = useAuth()
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<Commande[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [errorOrders, setErrorOrders] = useState<string | null>(null)

  useEffect(() => {
    const currentUser = getUser()
    setUser(currentUser)

    const loadOrders = async () => {
      setLoadingOrders(true)
      setErrorOrders(null)
      const token = getToken()
      if (!token) {
        setErrorOrders("Token d'authentification manquant.")
        setLoadingOrders(false)
        return
      }
      try {
        const fetchedOrders = await fetchCommandes(token)
        setOrders(fetchedOrders)
      } catch (error) {
        console.error("Erreur lors du chargement des commandes:", error)
        setErrorOrders(error instanceof Error ? error.message : "Impossible de charger les commandes.")
      } finally {
        setLoadingOrders(false)
      }
    }

    loadOrders()
  }, [getUser, getToken])

  const totalOrders = orders.length
  const pendingOrders = orders.filter((order) => order.statut === "pending" || order.statut === "processing").length
  const totalSpent = orders.reduce((sum, order) => sum + order.total_fcfa, 0)
  const totalFavorites = 8

  return (
    <ProtectedRoute requireAuth requireClient>
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Bonjour {user?.prenom} ! 👋</h1>
            <p className="text-gray-600 mt-2">Bienvenue sur votre espace client KreShop</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Commandes</p>
                    <p className="text-2xl font-bold">{totalOrders}</p>
                  </div>
                  <ShoppingBag className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">En cours</p>
                    <p className="text-2xl font-bold">{pendingOrders}</p>
                  </div>
                  <Package className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Favoris</p>
                    <p className="text-2xl font-bold">{totalFavorites}</p>
                  </div>
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total dépensé</p>
                    <p className="text-2xl font-bold">{totalSpent.toLocaleString()} FCFA</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Commandes récentes
                  </CardTitle>
                  <CardDescription>Vos dernières commandes et leur statut</CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingOrders ? (
                    <div className="flex justify-center items-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                      <span className="ml-2 text-gray-600">Chargement des commandes...</span>
                    </div>
                  ) : errorOrders ? (
                    <div className="text-center py-8 text-red-500">
                      <p>{errorOrders}</p>
                      <p className="text-sm text-gray-500">Veuillez vérifier votre connexion ou réessayer plus tard.</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8 text-gray-600">
                      <p>Vous n'avez pas encore passé de commandes.</p>
                      <Button className="mt-4">Commencer mes achats</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div>
                              <p className="font-medium">{order.numero_commande}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(order.date_creation).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{order.total_fcfa.toLocaleString()} FCFA</p>
                            <Badge
                              variant={
                                order.statut === "delivered"
                                  ? "default"
                                  : order.statut === "shipped"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {order.statut === "delivered"
                                ? "Livrée"
                                : order.statut === "shipped"
                                  ? "Expédiée"
                                  : order.statut === "processing"
                                    ? "En cours"
                                    : "En attente"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {orders.length > 3 && (
                    <Button variant="outline" className="w-full mt-4 bg-transparent">
                      Voir toutes les commandes
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Actions rapides
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Parcourir les produits
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Heart className="mr-2 h-4 w-4" />
                    Ma liste de souhaits
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Package className="mr-2 h-4 w-4" />
                    Suivre une commande
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <User className="mr-2 h-4 w-4" />
                    Modifier mon profil
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Adresse de livraison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">
                      {user?.prenom} {user?.nom}
                    </p>
                    <p className="text-gray-600">123 Rue de la Paix</p>
                    <p className="text-gray-600">Dakar, Sénégal</p>
                    <p className="text-gray-600">{user?.telephone}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                    Modifier l'adresse
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  )
}
