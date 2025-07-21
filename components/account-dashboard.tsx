"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Package,
  MapPin,
  Heart,
  Bell,
  BarChart3,
  Settings,
  Edit3,
  Plus,
  TrendingUp,
  Award,
  Gift,
} from "lucide-react"
import type { Product } from "@/types/product"

interface AccountDashboardProps {
  onAddToCart: (product: Product) => void
}

export function AccountDashboard({ onAddToCart }: AccountDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [editingProfile, setEditingProfile] = useState(false)

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
    <div className="container mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-corail-doux rounded-full flex items-center justify-center text-white text-2xl font-bold">
            U
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-brun-chocolat">Bonjour, Utilisateur</h1>
            <p className="text-taupe-fonce">Bienvenue sur votre espace personnel</p>
          </div>
        </div>

        {/* Statistiques Rapides */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Package className="w-8 h-8 text-corail-doux mx-auto mb-2" />
              <div className="text-2xl font-bold text-brun-chocolat">0</div>
              <div className="text-sm text-taupe-fonce">Commandes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-corail-doux mx-auto mb-2" />
              <div className="text-2xl font-bold text-brun-chocolat">0 FCFA</div>
              <div className="text-sm text-taupe-fonce">Total dépensé</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Gift className="w-8 h-8 text-corail-doux mx-auto mb-2" />
              <div className="text-2xl font-bold text-brun-chocolat">0</div>
              <div className="text-sm text-taupe-fonce">Points fidélité</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 text-corail-doux mx-auto mb-2" />
              <div className="text-2xl font-bold text-brun-chocolat">Bronze</div>
              <div className="text-sm text-taupe-fonce">Niveau membre</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-white border border-taupe-rose">
          <TabsTrigger value="overview" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Résumé</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            <Package className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Commandes</span>
          </TabsTrigger>
          <TabsTrigger value="addresses" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Adresses</span>
          </TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            <Heart className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Favoris</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-corail-doux data-[state=active]:text-white"
          >
            <Bell className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            <Settings className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
        </TabsList>

        {/* Résumé Exécutif */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Commandes Récentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-corail-doux" />
                  Commandes Récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-taupe-rose mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-brun-chocolat mb-2">Aucune commande</h3>
                  <p className="text-taupe-fonce mb-6">Vous n'avez pas encore passé de commande</p>
                  <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">
                    Découvrir la collection
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Programme de Fidélité */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-corail-doux" />
                  Programme de Fidélité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-corail-doux mb-2">0</div>
                    <div className="text-sm text-taupe-fonce">Points disponibles</div>
                  </div>

                  <div className="bg-beige-creme rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-brun-chocolat">Progression vers Silver</span>
                      <span className="text-sm text-taupe-fonce">0 / 1000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-corail-doux h-2 rounded-full" style={{ width: "0%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-taupe-fonce">Réduction 10%</span>
                      <span className="text-corail-doux font-medium">500 points</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-taupe-fonce">Livraison gratuite</span>
                      <span className="text-corail-doux font-medium">200 points</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-taupe-fonce">Produit gratuit</span>
                      <span className="text-corail-doux font-medium">2000 points</span>
                    </div>
                  </div>

                  <Button className="w-full bg-corail-doux hover:bg-corail-intensifie text-white" disabled>
                    Utiliser mes points
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Historique des Commandes */}
        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Historique des Commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-taupe-rose mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-brun-chocolat mb-2">Aucune commande</h3>
                <p className="text-taupe-fonce mb-6">Vous n'avez pas encore passé de commande</p>
                <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">Commencer mes achats</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gestion des Adresses */}
        <TabsContent value="addresses" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-brun-chocolat">Mes Adresses de Livraison</h2>
              <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une adresse
              </Button>
            </div>

            <Card>
              <CardContent className="p-12 text-center">
                <MapPin className="w-16 h-16 text-taupe-rose mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-brun-chocolat mb-2">Aucune adresse</h3>
                <p className="text-taupe-fonce mb-6">Ajoutez votre première adresse de livraison</p>
                <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une adresse
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Liste de Favoris */}
        <TabsContent value="favorites" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-corail-doux" />
                Mes Favoris (0)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-taupe-rose mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-brun-chocolat mb-2">Aucun favori pour le moment</h3>
                <p className="text-taupe-fonce mb-6">Découvrez notre collection et ajoutez vos articles préférés</p>
                <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">
                  Découvrir la collection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Système de Notifications */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-corail-doux" />
                Préférences de Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-beige-creme rounded-lg">
                  <div>
                    <h4 className="font-medium text-brun-chocolat">Nouvelles collections</h4>
                    <p className="text-sm text-taupe-fonce">Soyez informé des dernières nouveautés</p>
                  </div>
                  <Button variant="outline" className="border-corail-doux text-corail-doux bg-transparent">
                    Activé
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-beige-creme rounded-lg">
                  <div>
                    <h4 className="font-medium text-brun-chocolat">Promotions exclusives</h4>
                    <p className="text-sm text-taupe-fonce">Recevez nos offres spéciales en avant-première</p>
                  </div>
                  <Button variant="outline" className="border-corail-doux text-corail-doux bg-transparent">
                    Activé
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-beige-creme rounded-lg">
                  <div>
                    <h4 className="font-medium text-brun-chocolat">Suivi de commandes</h4>
                    <p className="text-sm text-taupe-fonce">Notifications sur l'état de vos commandes</p>
                  </div>
                  <Button variant="outline" className="border-corail-doux text-corail-doux bg-transparent">
                    Activé
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-beige-creme rounded-lg">
                  <div>
                    <h4 className="font-medium text-brun-chocolat">Retour en stock</h4>
                    <p className="text-sm text-taupe-fonce">Alerte quand vos favoris sont disponibles</p>
                  </div>
                  <Button variant="outline" className="border-taupe-rose text-brun-chocolat bg-transparent">
                    Désactivé
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium text-brun-chocolat mb-4">Canal de communication préféré</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="communication"
                      value="email"
                      defaultChecked
                      className="text-corail-doux"
                    />
                    <span className="text-taupe-fonce">Email</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="communication" value="whatsapp" className="text-corail-doux" />
                    <span className="text-taupe-fonce">WhatsApp</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="communication" value="sms" className="text-corail-doux" />
                    <span className="text-taupe-fonce">SMS</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profil Utilisateur */}
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-corail-doux" />
                  Informations Personnelles
                </CardTitle>
                <Button
                  variant="outline"
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="border-corail-doux text-corail-doux hover:bg-corail-doux hover:text-white bg-transparent"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {editingProfile ? "Annuler" : "Modifier"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      placeholder="Votre nom complet"
                      disabled={!editingProfile}
                      className="border-taupe-rose focus:border-corail-doux"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      disabled={!editingProfile}
                      className="border-taupe-rose focus:border-corail-doux"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      placeholder="+241 XX XX XX XX"
                      disabled={!editingProfile}
                      className="border-taupe-rose focus:border-corail-doux"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="birthdate">Date de naissance</Label>
                    <Input
                      id="birthdate"
                      type="date"
                      disabled={!editingProfile}
                      className="border-taupe-rose focus:border-corail-doux"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Genre</Label>
                    <select
                      id="gender"
                      disabled={!editingProfile}
                      className="w-full p-2 border border-taupe-rose rounded-md focus:border-corail-doux disabled:bg-gray-50"
                    >
                      <option value="">Sélectionner</option>
                      <option>Femme</option>
                      <option>Homme</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="preferences">Préférences de style</Label>
                    <select
                      id="preferences"
                      disabled={!editingProfile}
                      className="w-full p-2 border border-taupe-rose rounded-md focus:border-corail-doux disabled:bg-gray-50"
                    >
                      <option value="">Sélectionner</option>
                      <option>Traditionnel</option>
                      <option>Moderne</option>
                      <option>Mixte</option>
                    </select>
                  </div>
                </div>
              </div>

              {editingProfile && (
                <div className="flex gap-4 mt-6">
                  <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">
                    Sauvegarder les modifications
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditingProfile(false)}
                    className="border-taupe-rose text-brun-chocolat hover:bg-beige-rose bg-transparent"
                  >
                    Annuler
                  </Button>
                </div>
              )}

              <Separator className="my-6" />

              <div>
                <h4 className="font-medium text-brun-chocolat mb-4">Sécurité du compte</h4>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-taupe-rose text-brun-chocolat hover:bg-beige-rose bg-transparent"
                  >
                    Changer le mot de passe
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-taupe-rose text-brun-chocolat hover:bg-beige-rose bg-transparent"
                  >
                    Activer l'authentification à deux facteurs
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    Supprimer mon compte
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
