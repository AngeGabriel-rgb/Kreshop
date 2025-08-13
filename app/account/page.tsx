"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useClerkAuth } from "@/hooks/use-clerk-auth"
import { getOrders } from "@/lib/data" // Use the new data fetching
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { ProtectedRoute } from "@/components/protected-route"
import type { Commande } from "@/lib/types"

export default function AccountPage() {
  const { user, getToken } = useClerkAuth()
  const [orders, setOrders] = useState<Commande[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (user && getToken()) {
        setLoadingOrders(true)
        try {
          const fetchedOrders = await getOrders(getToken()!)
          // Filter orders by client_id if the API returns all orders
          const userOrders = fetchedOrders.filter((order) => order.client_id === user.id)
          setOrders(userOrders)
        } catch (error) {
          console.error("Failed to fetch orders:", error)
          // Handle error, e.g., show a toast
        } finally {
          setLoadingOrders(false)
        }
      }
    }
    fetchUserOrders()
  }, [user, getToken])

  if (!user) {
    return (
      <ProtectedRoute allowedRoles={["client", "admin"]}>
        <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-beige-creme p-4 text-brun-chocolat">
          <h1 className="mb-4 text-4xl font-bold">Chargement...</h1>
          <p className="text-lg">Veuillez patienter pendant le chargement de votre compte.</p>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["client", "admin"]}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold text-brun-chocolat">Mon Compte</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="orders">Mes Commandes</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations du profil</CardTitle>
                <CardDescription>Mettez à jour vos informations personnelles.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" defaultValue={user.prenom} disabled />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" defaultValue={user.nom} disabled />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user.email} disabled />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" defaultValue={user.telephone || "N/A"} disabled />
                </div>
                {/* Add an edit button if you want to implement profile updates */}
                {/* <Button className="bg-corail-intensifie text-white hover:bg-corail-doux">
                  Modifier le profil
                </Button> */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes Commandes</CardTitle>
                <CardDescription>Historique de vos commandes.</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingOrders ? (
                  <div className="text-center text-brun-chocolat">Chargement des commandes...</div>
                ) : orders.length === 0 ? (
                  <div className="text-center text-brun-chocolat">Vous n&apos;avez pas encore passé de commandes.</div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="border">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Commande #{order.numero_commande}</CardTitle>
                          <span className="text-xs text-gray-500">
                            {new Date(order.date_creation).toLocaleDateString()}
                          </span>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{formatPrice(order.total_fcfa)}</div>
                          <p className="text-xs text-gray-500">Statut: {order.statut}</p>
                          <p className="text-xs text-gray-500">Paiement: {order.statut_paiement}</p>
                          <Button asChild variant="link" className="p-0 text-corail-intensifie">
                            <Link href={`/account/orders/${order.id}`}>Voir les détails</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du compte</CardTitle>
                <CardDescription>Gérez vos préférences de compte.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Example setting */}
                <div>
                  <Label htmlFor="newsletter">Abonnement à la newsletter</Label>
                  <p className="text-sm text-gray-500">Recevez des mises à jour et des offres spéciales.</p>
                  {/* Add a Switch component here for toggling newsletter */}
                </div>
                <Button variant="destructive">Supprimer le compte</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}
