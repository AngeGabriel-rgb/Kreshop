"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, UserPlus, Star, TrendingUp, Mail, ShoppingBag, Filter, Download } from "lucide-react"

const clientStatuses = ["Actif", "Inactif", "VIP", "Bloqué"]
const clientTypes = ["Particulier", "Professionnel", "Revendeur"]
const countries = ["Gabon", "Cameroun", "Congo", "Guinée Équatoriale", "Tchad"]

export function AdminClients() {
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [isClientModalOpen, setIsClientModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("XAF", "FCFA")
  }

  const openClientModal = (client?: any) => {
    setSelectedClient(client || null)
    setIsClientModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-brun-chocolat">Gestion des Clients</h1>
          <p className="text-taupe-fonce">Gérez votre base client GabonStyle</p>
        </div>
        <Dialog open={isClientModalOpen} onOpenChange={setIsClientModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Nouveau Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedClient ? "Modifier le Client" : "Ajouter un Nouveau Client"}</DialogTitle>
              <DialogDescription>Remplissez les informations du client ci-dessous</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-beige-creme">
                <TabsTrigger
                  value="personal"
                  className="data-[state=active]:bg-corail-doux data-[state=active]:text-white"
                >
                  Personnel
                </TabsTrigger>
                <TabsTrigger
                  value="address"
                  className="data-[state=active]:bg-corail-doux data-[state=active]:text-white"
                >
                  Adresses
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-corail-doux data-[state=active]:text-white"
                >
                  Commandes
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="data-[state=active]:bg-corail-doux data-[state=active]:text-white"
                >
                  Préférences
                </TabsTrigger>
              </TabsList>

              {/* Personal Tab */}
              <TabsContent value="personal" className="space-y-6 mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="first-name">Prénom *</Label>
                      <Input
                        id="first-name"
                        placeholder="Jean"
                        className="border-taupe-rose focus:border-corail-doux"
                      />
                    </div>
                    <div>
                      <Label htmlFor="last-name">Nom *</Label>
                      <Input
                        id="last-name"
                        placeholder="Dupont"
                        className="border-taupe-rose focus:border-corail-doux"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jean.dupont@email.com"
                        className="border-taupe-rose focus:border-corail-doux"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        placeholder="+241 XX XX XX XX"
                        className="border-taupe-rose focus:border-corail-doux"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="birth-date">Date de Naissance</Label>
                      <Input id="birth-date" type="date" className="border-taupe-rose focus:border-corail-doux" />
                    </div>
                    <div>
                      <Label htmlFor="gender">Genre</Label>
                      <Select>
                        <SelectTrigger className="border-taupe-rose">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Homme</SelectItem>
                          <SelectItem value="female">Femme</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="client-type">Type de Client</Label>
                      <Select>
                        <SelectTrigger className="border-taupe-rose">
                          <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                          {clientTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="client-status">Statut</Label>
                      <Select>
                        <SelectTrigger className="border-taupe-rose">
                          <SelectValue placeholder="Sélectionner le statut" />
                        </SelectTrigger>
                        <SelectContent>
                          {clientStatuses.map((status) => (
                            <SelectItem key={status} value={status.toLowerCase()}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label htmlFor="notes">Notes Internes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Notes sur le client..."
                    rows={4}
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Switch id="newsletter" />
                    <Label htmlFor="newsletter">Newsletter</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="sms-marketing" />
                    <Label htmlFor="sms-marketing">SMS Marketing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="vip-status" />
                    <Label htmlFor="vip-status">Statut VIP</Label>
                  </div>
                </div>
              </TabsContent>

              {/* Address Tab */}
              <TabsContent value="address" className="space-y-6 mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-lg font-semibold text-brun-chocolat">Adresse de Facturation</Label>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="billing-address">Adresse</Label>
                        <Input
                          id="billing-address"
                          placeholder="123 Rue de la Paix"
                          className="border-taupe-rose focus:border-corail-doux"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billing-city">Ville</Label>
                          <Input
                            id="billing-city"
                            placeholder="Libreville"
                            className="border-taupe-rose focus:border-corail-doux"
                          />
                        </div>
                        <div>
                          <Label htmlFor="billing-postal">Code Postal</Label>
                          <Input
                            id="billing-postal"
                            placeholder="BP 1234"
                            className="border-taupe-rose focus:border-corail-doux"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="billing-country">Pays</Label>
                        <Select>
                          <SelectTrigger className="border-taupe-rose">
                            <SelectValue placeholder="Sélectionner le pays" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country.toLowerCase()}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg font-semibold text-brun-chocolat">Adresse de Livraison</Label>
                    <div className="space-y-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="same-address" />
                        <Label htmlFor="same-address">Identique à l'adresse de facturation</Label>
                      </div>
                      <div>
                        <Label htmlFor="shipping-address">Adresse</Label>
                        <Input
                          id="shipping-address"
                          placeholder="123 Rue de la Paix"
                          className="border-taupe-rose focus:border-corail-doux"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="shipping-city">Ville</Label>
                          <Input
                            id="shipping-city"
                            placeholder="Libreville"
                            className="border-taupe-rose focus:border-corail-doux"
                          />
                        </div>
                        <div>
                          <Label htmlFor="shipping-postal">Code Postal</Label>
                          <Input
                            id="shipping-postal"
                            placeholder="BP 1234"
                            className="border-taupe-rose focus:border-corail-doux"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="shipping-country">Pays</Label>
                        <Select>
                          <SelectTrigger className="border-taupe-rose">
                            <SelectValue placeholder="Sélectionner le pays" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country.toLowerCase()}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-6 mt-6">
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-taupe-rose mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-brun-chocolat mb-2">Aucune commande</h3>
                  <p className="text-taupe-fonce mb-6">L'historique des commandes apparaîtra ici</p>
                </div>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences" className="space-y-6 mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-lg font-semibold text-brun-chocolat">Préférences de Communication</Label>
                      <div className="space-y-3 mt-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-notifications">Notifications Email</Label>
                          <Switch id="email-notifications" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sms-notifications">Notifications SMS</Label>
                          <Switch id="sms-notifications" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="promotional-emails">Emails Promotionnels</Label>
                          <Switch id="promotional-emails" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="order-updates">Mises à jour Commandes</Label>
                          <Switch id="order-updates" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-lg font-semibold text-brun-chocolat">Préférences d'Achat</Label>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="preferred-language">Langue Préférée</Label>
                          <Select>
                            <SelectTrigger className="border-taupe-rose">
                              <SelectValue placeholder="Français" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="preferred-currency">Devise Préférée</Label>
                          <Select>
                            <SelectTrigger className="border-taupe-rose">
                              <SelectValue placeholder="FCFA" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="xaf">FCFA</SelectItem>
                              <SelectItem value="eur">Euro</SelectItem>
                              <SelectItem value="usd">Dollar US</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-3 pt-6 border-t border-beige-rose">
              <Button
                variant="outline"
                onClick={() => setIsClientModalOpen(false)}
                className="border-taupe-rose text-brun-chocolat hover:bg-beige-rose bg-transparent"
              >
                Annuler
              </Button>
              <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">
                {selectedClient ? "Mettre à Jour" : "Créer le Client"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Client Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-corail-doux to-corail-intensifie border-0 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <UserPlus className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs opacity-80">Aucun client enregistré</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-taupe-fonce to-brun-chocolat border-0 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients VIP</CardTitle>
            <Star className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs opacity-80">Aucun client VIP</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 border-0 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux Clients</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs opacity-80">Cette semaine</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-brun-espresso to-brun-chocolat border-0 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Moyenne</CardTitle>
            <Star className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">N/A</div>
            <p className="text-xs opacity-80">Pas de données</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taupe-fonce h-4 w-4" />
                <Input
                  placeholder="Rechercher des clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-taupe-rose focus:border-corail-doux"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48 border-taupe-rose">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  {clientStatuses.map((status) => (
                    <SelectItem key={status} value={status.toLowerCase()}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48 border-taupe-rose">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  {clientTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="border-corail-doux text-corail-doux hover:bg-corail-doux hover:text-white bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des Clients (0)</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">0 Actifs</Badge>
              <Badge className="bg-yellow-100 text-yellow-800">0 VIP</Badge>
              <Badge className="bg-blue-100 text-blue-800">0 Nouveaux</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <UserPlus className="w-16 h-16 text-taupe-rose mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-brun-chocolat mb-2">Aucun client enregistré</h3>
            <p className="text-taupe-fonce mb-6">
              Les clients apparaîtront ici une fois qu'ils se seront inscrits sur votre boutique.
            </p>
            <Button onClick={() => openClientModal()} className="bg-corail-doux hover:bg-corail-intensifie text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Ajouter un Client
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Dashboard */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-corail-doux" />
              Démographie Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Hommes</span>
                <span className="font-semibold text-brun-chocolat">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Femmes</span>
                <span className="font-semibold text-brun-chocolat">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Âge Moyen</span>
                <span className="font-semibold text-corail-doux">-</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Pays Principal</span>
                <span className="font-semibold text-brun-chocolat">-</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-corail-doux" />
              Comportement d'Achat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Panier Moyen</span>
                <span className="font-semibold text-corail-doux">0 FCFA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Commandes/Client</span>
                <span className="font-semibold text-brun-chocolat">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Taux de Fidélité</span>
                <span className="font-semibold text-green-600">0%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Dernière Commande</span>
                <span className="font-semibold text-brun-chocolat">-</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-corail-doux" />
              Engagement Marketing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Abonnés Newsletter</span>
                <span className="font-semibold text-green-600">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Taux d'Ouverture</span>
                <span className="font-semibold text-brun-chocolat">0%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">SMS Marketing</span>
                <span className="font-semibold text-corail-doux">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Désabonnements</span>
                <span className="font-semibold text-red-600">0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
