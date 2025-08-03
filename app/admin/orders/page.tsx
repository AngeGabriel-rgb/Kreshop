"use client"

import React from "react"
import { Eye, Edit, Trash2, Package, Truck, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { ProtectedRoute } from "@/components/protected-route"
import { fetchCommandes, type Commande } from "@/lib/api"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"
// Importez le composant AdminDashboardSidebar
import { AdminDashboardSidebar } from "@/components/admin-dashboard-sidebar"

export default function AdminOrdersPage() {
  const [orders, setOrders] = React.useState<Commande[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const { getToken } = useAuth()
  const { toast } = useToast()

  React.useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true)
        const token = getToken()
        if (!token) {
          setError("Token d'authentification manquant. Veuillez vous reconnecter.")
          setLoading(false)
          return
        }
        const data = await fetchCommandes(token)
        setOrders(data)
      } catch (err: any) {
        setError(err.message || "Échec du chargement des commandes.")
        console.error(err)
        toast({
          title: "Erreur de chargement",
          description: err.message || "Impossible de charger les commandes.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    getOrders()
  }, [getToken, toast])

  const getStatusColor = (status: Commande["statut"]) => {
    switch (status) {
      case "EN_ATTENTE":
        return "text-yellow-500"
      case "CONFIRMEE":
        return "text-blue-500"
      case "TRAITEE":
        return "text-purple-500"
      case "EXPEDIEE":
        return "text-indigo-500"
      case "LIVREE":
        return "text-green-500"
      case "ANNULEE":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["admin"]}>
        <div className="flex min-h-[calc(100svh-12rem)]">
          <AdminDashboardSidebar />
          <div className="flex-1 container mx-auto py-8 px-4 md:px-6">
            <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">
              Gestion des Commandes
            </h1>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Liste des Commandes</CardTitle>
                <Skeleton className="h-10 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (error) {
    return (
      <ProtectedRoute allowedRoles={["admin"]}>
        <div className="flex min-h-[calc(100svh-12rem)]">
          <AdminDashboardSidebar />
          <div className="flex-1 container mx-auto py-8 px-4 md:px-6">
            <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">
              Gestion des Commandes
            </h1>
            <div className="flex h-64 items-center justify-center text-destructive">
              <p>{error}</p>
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
          {/* Le contenu existant de la page va ici */}
          <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">
            Gestion des Commandes
          </h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Commandes en Attente</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orders.filter((o) => o.statut === "EN_ATTENTE").length}</div>
                <p className="text-xs text-muted-foreground">Nouvelles commandes à traiter</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Commandes Expédiées</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orders.filter((o) => o.statut === "EXPEDIEE").length}</div>
                <p className="text-xs text-muted-foreground">En cours de livraison</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Commandes Livrées</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orders.filter((o) => o.statut === "LIVREE").length}</div>
                <p className="text-xs text-muted-foreground">Terminées</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Liste des Commandes</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <p className="text-center text-muted-foreground">Aucune commande trouvée.</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Commande</TableHead>
                        <TableHead>Client ID</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Paiement</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.numero_commande}</TableCell>
                          <TableCell>{order.client_id}</TableCell>
                          <TableCell className={getStatusColor(order.statut)}>{order.statut}</TableCell>
                          <TableCell>{order.statut_paiement}</TableCell>
                          <TableCell>
                            {order.total_fcfa.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}
                          </TableCell>
                          <TableCell>{new Date(order.date_creation).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="mr-2">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Voir</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="mr-2">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Modifier</span>
                            </Button>
                            <Button variant="destructive" size="icon">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Supprimer</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">
              Fonctionnalités Avancées des Commandes
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Stocks & Alertes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Interface pour visualiser et gérer les stocks, avec des alertes de rupture.
                </p>
                <Button variant="outline" className="mt-4 bg-transparent">
                  Voir les alertes de stock
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Génération d'Étiquettes de Livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Outil pour générer automatiquement des étiquettes de livraison pour les transporteurs locaux.
                </p>
                <Button variant="outline" className="mt-4 bg-transparent">
                  Générer une étiquette
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Communication Client Intégrée</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Envoyez des emails ou des messages WhatsApp directement depuis l'interface de commande.
                </p>
                <Button variant="outline" className="mt-4 bg-transparent">
                  Envoyer un message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
