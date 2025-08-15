"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Package, MapPin, Heart, Settings, LogOut, Loader2, Plus, Edit, Trash2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { api, type Order, type Address } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

interface AccountDashboardProps {
  user: {
    id: number
    email: string
    prenom: string
    nom: string
    telephone?: string
  }
}

export function AccountDashboard({ user }: AccountDashboardProps) {
  const { logout } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")
  const [orders, setOrders] = useState<Order[]>([])
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(false)
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false)
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [addressForm, setAddressForm] = useState({
    nom_complet: "",
    adresse_ligne_1: "",
    adresse_ligne_2: "",
    ville: "",
    quartier: "", // Nouveau champ requis
    code_postal: "",
    pays: "Gabon", // Valeur par défaut pour le Gabon
    telephone: "",
    type_adresse: "DOMICILE" as "DOMICILE" | "BUREAU" | "AUTRE", // Nouveau champ requis
    est_principale: false,
  })

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoadingOrders(true)
        const userOrders = await api.getMyOrders()
        setOrders(userOrders)
      } catch (error) {
        console.error("Erreur lors du chargement des commandes:", error)
      } finally {
        setIsLoadingOrders(false)
      }
    }

    if (activeTab === "orders") {
      loadOrders()
    }
  }, [activeTab])

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        setIsLoadingAddresses(true)
        const userAddresses = await api.getAddresses()
        const clientAddresses = userAddresses.filter((addr) => addr.client_id === user.id)
        setAddresses(clientAddresses)
      } catch (error) {
        console.error("Erreur lors du chargement des adresses:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les adresses",
          variant: "destructive",
        })
      } finally {
        setIsLoadingAddresses(false)
      }
    }

    if (activeTab === "addresses") {
      loadAddresses()
    }
  }, [activeTab, user.id, toast])

  const getStatusBadge = (status: string) => {
    const statusMap = {
      EN_ATTENTE: { label: "En attente", variant: "secondary" as const },
      CONFIRMEE: { label: "Confirmée", variant: "default" as const },
      EXPEDIEE: { label: "Expédiée", variant: "default" as const },
      LIVREE: { label: "Livrée", variant: "default" as const },
      ANNULEE: { label: "Annulée", variant: "destructive" as const },
    }
    return statusMap[status as keyof typeof statusMap] || { label: status, variant: "secondary" as const }
  }

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const addressData = {
        ...addressForm,
        client_id: user.id,
      }

      if (editingAddress) {
        await api.updateAddress(editingAddress.id, addressData)
        toast({
          title: "Succès",
          description: "Adresse modifiée avec succès",
        })
      } else {
        await api.createAddress(addressData)
        toast({
          title: "Succès",
          description: "Adresse ajoutée avec succès",
        })
      }

      const userAddresses = await api.getAddresses()
      const clientAddresses = userAddresses.filter((addr) => addr.client_id === user.id)
      setAddresses(clientAddresses)

      setAddressForm({
        nom_complet: "",
        adresse_ligne_1: "",
        adresse_ligne_2: "",
        ville: "",
        quartier: "",
        code_postal: "",
        pays: "Gabon",
        telephone: "",
        type_adresse: "DOMICILE",
        est_principale: false,
      })
      setEditingAddress(null)
      setIsAddressDialogOpen(false)
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'adresse:", error)
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'adresse",
        variant: "destructive",
      })
    }
  }

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address)
    setAddressForm({
      nom_complet: address.nom_complet,
      adresse_ligne_1: address.adresse_ligne_1,
      adresse_ligne_2: address.adresse_ligne_2 || "",
      ville: address.ville,
      quartier: address.quartier,
      code_postal: address.code_postal || "",
      pays: address.pays,
      telephone: address.telephone || "",
      type_adresse: address.type_adresse,
      est_principale: address.est_principale,
    })
    setIsAddressDialogOpen(true)
  }

  const handleDeleteAddress = async (addressId: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette adresse ?")) return

    try {
      await api.deleteAddress(addressId)
      setAddresses(addresses.filter((addr) => addr.id !== addressId))
      toast({
        title: "Succès",
        description: "Adresse supprimée avec succès",
      })
    } catch (error) {
      console.error("Erreur lors de la suppression de l'adresse:", error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'adresse",
        variant: "destructive",
      })
    }
  }

  const resetAddressForm = () => {
    setAddressForm({
      nom_complet: "",
      adresse_ligne_1: "",
      adresse_ligne_2: "",
      ville: "",
      quartier: "",
      code_postal: "",
      pays: "Gabon",
      telephone: "",
      type_adresse: "DOMICILE",
      est_principale: false,
    })
    setEditingAddress(null)
  }

  const favorites = [
    {
      id: 1,
      name: "Chemise en coton bio",
      price: 15000,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Pantalon chino beige",
      price: 22000,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Mon Compte</h1>
          <p className="text-muted-foreground">
            Bienvenue {user.prenom} {user.nom}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Commandes</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Adresses</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Favoris</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Paramètres</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Prénom</label>
                    <p className="text-foreground">{user.prenom}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nom</label>
                    <p className="text-foreground">{user.nom}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-foreground">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Téléphone</label>
                    <p className="text-foreground">{user.telephone || "Non renseigné"}</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 bg-transparent">
                  Modifier mes informations
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes commandes</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingOrders ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span className="ml-2">Chargement des commandes...</span>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Aucune commande trouvée</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const statusInfo = getStatusBadge(order.statut)
                      return (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">Commande #{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date_creation).toLocaleDateString("fr-FR")}
                            </p>
                            <p className="text-sm">{order.articles?.length || 0} article(s)</p>
                          </div>
                          <div className="text-right space-y-1">
                            <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                            <p className="font-semibold price-fcfa">{order.total_fcfa.toLocaleString()} FCFA</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Mes adresses
                  <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={resetAddressForm} className="bg-primary hover:bg-primary/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter une adresse
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{editingAddress ? "Modifier l'adresse" : "Ajouter une adresse"}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddressSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="nom_complet">Nom complet</Label>
                          <Input
                            id="nom_complet"
                            value={addressForm.nom_complet}
                            onChange={(e) => setAddressForm({ ...addressForm, nom_complet: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="adresse_ligne_1">Adresse</Label>
                          <Input
                            id="adresse_ligne_1"
                            value={addressForm.adresse_ligne_1}
                            onChange={(e) => setAddressForm({ ...addressForm, adresse_ligne_1: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="adresse_ligne_2">Complément d'adresse (optionnel)</Label>
                          <Input
                            id="adresse_ligne_2"
                            value={addressForm.adresse_ligne_2}
                            onChange={(e) => setAddressForm({ ...addressForm, adresse_ligne_2: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="ville">Ville</Label>
                            <Input
                              id="ville"
                              value={addressForm.ville}
                              onChange={(e) => setAddressForm({ ...addressForm, ville: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="quartier">Quartier</Label>
                            <Input
                              id="quartier"
                              value={addressForm.quartier}
                              onChange={(e) => setAddressForm({ ...addressForm, quartier: e.target.value })}
                              placeholder="Ex: Glass, Nombakélé, Akanda..."
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="code_postal">Code postal</Label>
                            <Input
                              id="code_postal"
                              value={addressForm.code_postal}
                              onChange={(e) => setAddressForm({ ...addressForm, code_postal: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="pays">Pays</Label>
                            <Input
                              id="pays"
                              value={addressForm.pays}
                              onChange={(e) => setAddressForm({ ...addressForm, pays: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="telephone">Téléphone</Label>
                          <Input
                            id="telephone"
                            value={addressForm.telephone}
                            onChange={(e) => setAddressForm({ ...addressForm, telephone: e.target.value })}
                            placeholder="+241 XX XX XX XX"
                          />
                        </div>
                        <div>
                          <Label htmlFor="type_adresse">Type d'adresse</Label>
                          <select
                            id="type_adresse"
                            value={addressForm.type_adresse}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                type_adresse: e.target.value as "DOMICILE" | "BUREAU" | "AUTRE",
                              })
                            }
                            className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                            required
                          >
                            <option value="DOMICILE">Domicile</option>
                            <option value="BUREAU">Bureau</option>
                            <option value="AUTRE">Autre</option>
                          </select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="est_principale"
                            checked={addressForm.est_principale}
                            onChange={(e) => setAddressForm({ ...addressForm, est_principale: e.target.checked })}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor="est_principale">Adresse principale</Label>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                            {editingAddress ? "Modifier" : "Ajouter"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsAddressDialogOpen(false)}
                            className="flex-1"
                          >
                            Annuler
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingAddresses ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span className="ml-2">Chargement des adresses...</span>
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="text-center py-8">
                    <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Aucune adresse enregistrée</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Ajoutez une adresse pour faciliter vos commandes
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{address.nom_complet}</p>
                              {address.est_principale && <Badge variant="secondary">Principale</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{address.adresse_ligne_1}</p>
                            {address.adresse_ligne_2 && (
                              <p className="text-sm text-muted-foreground">{address.adresse_ligne_2}</p>
                            )}
                            <p className="text-sm text-muted-foreground">
                              {address.quartier}, {address.ville} {address.code_postal}
                            </p>
                            <p className="text-sm text-muted-foreground">{address.pays}</p>
                            {address.telephone && <p className="text-sm text-muted-foreground">{address.telephone}</p>}
                            <Badge variant="outline" className="text-xs">
                              {address.type_adresse === "DOMICILE"
                                ? "Domicile"
                                : address.type_adresse === "BUREAU"
                                  ? "Bureau"
                                  : "Autre"}
                            </Badge>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm" onClick={() => handleEditAddress(address)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteAddress(address.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes favoris</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favorites.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="price-fcfa text-primary">{item.price.toLocaleString()} FCFA</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          Ajouter au panier
                        </Button>
                        <Button variant="outline" size="sm">
                          Retirer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du compte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Changer mon mot de passe
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Préférences de notification
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Confidentialité et sécurité
                  </Button>
                  <hr />
                  <Button variant="destructive" className="w-full justify-start" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
