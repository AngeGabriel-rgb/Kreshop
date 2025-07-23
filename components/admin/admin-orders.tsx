"use client"
import { useState, useEffect } from "react"
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Package,
  Clock,
  Truck,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  User,
  ShoppingBag,
  TrendingUp,
  Bell,
  Download,
  Printer,
} from "lucide-react"

const orderStatuses = [
  { value: "pending", label: "En Attente", color: "bg-yellow-100 text-yellow-800" },
  { value: "confirmed", label: "Confirmée", color: "bg-blue-100 text-blue-800" },
  { value: "preparing", label: "En Préparation", color: "bg-orange-100 text-orange-800" },
  { value: "shipped", label: "Expédiée", color: "bg-purple-100 text-purple-800" },
  { value: "delivered", label: "Livrée", color: "bg-green-100 text-green-800" },
  { value: "cancelled", label: "Annulée", color: "bg-red-100 text-red-800" },
  { value: "returned", label: "Retournée", color: "bg-gray-100 text-gray-800" },
]

const paymentStatuses = [
  { value: "pending", label: "En Attente", color: "bg-yellow-100 text-yellow-800" },
  { value: "paid", label: "Payée", color: "bg-green-100 text-green-800" },
  { value: "failed", label: "Échouée", color: "bg-red-100 text-red-800" },
  { value: "refunded", label: "Remboursée", color: "bg-blue-100 text-blue-800" },
]

const shippingMethods = ["Livraison Standard", "Livraison Express", "Retrait en Magasin", "Livraison Premium"]

export function AdminOrders() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all")
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdate(new Date())
      }, 30000) // Refresh every 30 seconds

      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("XAF", "FCFA")
  }

  const getStatusBadge = (status: string, type: "order" | "payment") => {
    const statuses = type === "order" ? orderStatuses : paymentStatuses
    const statusInfo = statuses.find((s) => s.value === status)
    return statusInfo ? (
      <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Inconnu</Badge>
    )
  }

  const openOrderModal = (order?: any) => {
    setSelectedOrder(order || null)
    setIsOrderModalOpen(true)
  }

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // Logic to update order status
    console.log(`Updating order ${orderId} to status ${newStatus}`)
  }

  const handleRefresh = () => {
    setLastUpdate(new Date())
    // Logic to refresh orders data
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-brun-chocolat">Gestion des Commandes</h1>
          <p className="text-taupe-fonce">Suivi en temps réel de toutes vos commandes GabonStyle</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-taupe-fonce">
            <Clock className="w-4 h-4" />
            <span>Dernière mise à jour: {lastUpdate.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
              className="data-[state=checked]:bg-corail-doux"
            />
            <Label htmlFor="auto-refresh" className="text-sm">
              Auto-actualisation
            </Label>
          </div>
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            className="border-corail-doux text-corail-doux hover:bg-corail-doux hover:text-white bg-transparent"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
        </div>
      </div>

      {/* Real-time Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-corail-doux to-corail-intensifie border-0 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes Actives</CardTitle>
            <Package className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs opacity-80">Aucune commande active</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-taupe-fonce to-brun-chocolat border-0 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Préparation</CardTitle>
            <Clock className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs opacity-80">Aucune commande en préparation</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 border-0 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expédiées</CardTitle>
            <Truck className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs opacity-80">Aucune expédition</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 border-0 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes</CardTitle>
            <AlertTriangle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs opacity-80">Aucune alerte</p>
          </CardContent>
        </Card>
      </div>

      {/* Alert System */}
      <Card className="bg-gradient-to-r from-beige-creme to-beige-rose border-taupe-rose">
        <CardHeader>
          <CardTitle className="text-brun-chocolat flex items-center">
            <Bell className="w-5 h-5 mr-2 text-corail-doux" />
            Système d'Alertes pour Commandes Urgentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertTriangle className="w-16 h-16 mx-auto text-taupe-rose mb-4" />
            <p className="text-taupe-fonce">Aucune alerte active pour le moment</p>
            <p className="text-sm text-taupe-fonce mt-2">
              Les alertes apparaîtront ici pour les commandes nécessitant une attention immédiate
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taupe-fonce h-4 w-4" />
                <Input
                  placeholder="Rechercher par numéro de commande, client..."
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
                  <SelectValue placeholder="Statut commande" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  {orderStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
                <SelectTrigger className="w-48 border-taupe-rose">
                  <SelectValue placeholder="Statut paiement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les paiements</SelectItem>
                  {paymentStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
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

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des Commandes (0)</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">0 Nouvelles</Badge>
              <Badge className="bg-orange-100 text-orange-800">0 En cours</Badge>
              <Badge className="bg-green-100 text-green-800">0 Terminées</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-taupe-rose mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-brun-chocolat mb-2">Aucune commande</h3>
            <p className="text-taupe-fonce mb-6">
              Les commandes apparaîtront ici une fois que vous aurez configuré votre boutique et reçu vos premières
              ventes.
            </p>
            <div className="flex gap-3 justify-center">
              <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">
                <Package className="w-4 h-4 mr-2" />
                Configurer la Boutique
              </Button>
              <Button
                variant="outline"
                className="border-taupe-rose text-brun-chocolat hover:bg-beige-rose bg-transparent"
              >
                <Bell className="w-4 h-4 mr-2" />
                Configurer les Alertes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Modal */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détails de la Commande #{selectedOrder?.id || "NOUVEAU"}</DialogTitle>
            <DialogDescription>
              {selectedOrder ? "Gérez tous les aspects de cette commande" : "Créer une nouvelle commande"}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-beige-creme">
              <TabsTrigger
                value="details"
                className="data-[state=active]:bg-corail-doux data-[state=active]:text-white"
              >
                Détails
              </TabsTrigger>
              <TabsTrigger
                value="customer"
                className="data-[state=active]:bg-corail-doux data-[state=active]:text-white"
              >
                Client
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="data-[state=active]:bg-corail-doux data-[state=active]:text-white"
              >
                Produits
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="data-[state=active]:bg-corail-doux data-[state=active]:text-white"
              >
                Livraison
              </TabsTrigger>
              <TabsTrigger
                value="payment"
                className="data-[state=active]:bg-corail-doux data-[state=active]:text-white"
              >
                Paiement
              </TabsTrigger>
            </TabsList>

            {/* Details Tab */}
            <TabsContent value="details" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="order-number">Numéro de Commande</Label>
                    <Input
                      id="order-number"
                      placeholder="CMD-2024-0001"
                      className="border-taupe-rose focus:border-corail-doux"
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="order-status">Statut de la Commande</Label>
                    <Select>
                      <SelectTrigger className="border-taupe-rose">
                        <SelectValue placeholder="Sélectionner le statut" />
                      </SelectTrigger>
                      <SelectContent>
                        {orderStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="order-date">Date de Commande</Label>
                    <Input
                      id="order-date"
                      type="datetime-local"
                      className="border-taupe-rose focus:border-corail-doux"
                    />
                  </div>
                  <div>
                    <Label htmlFor="order-priority">Priorité</Label>
                    <Select>
                      <SelectTrigger className="border-taupe-rose">
                        <SelectValue placeholder="Normale" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Basse</SelectItem>
                        <SelectItem value="normal">Normale</SelectItem>
                        <SelectItem value="high">Haute</SelectItem>
                        <SelectItem value="urgent">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="order-notes">Notes Internes</Label>
                    <Textarea
                      id="order-notes"
                      placeholder="Notes pour l'équipe..."
                      rows={4}
                      className="border-taupe-rose focus:border-corail-doux"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer-notes">Notes du Client</Label>
                    <Textarea
                      id="customer-notes"
                      placeholder="Instructions spéciales du client..."
                      rows={4}
                      className="border-taupe-rose focus:border-corail-doux"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label>Historique des Statuts</Label>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-beige-creme rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-corail-doux rounded-full"></div>
                      <div>
                        <p className="font-medium text-brun-chocolat">Commande créée</p>
                        <p className="text-sm text-taupe-fonce">Aucun historique disponible</p>
                      </div>
                    </div>
                    <span className="text-sm text-taupe-fonce">-</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Customer Tab */}
            <TabsContent value="customer" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customer-name">Nom Complet</Label>
                    <Input
                      id="customer-name"
                      placeholder="Nom du client"
                      className="border-taupe-rose focus:border-corail-doux"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer-email">Email</Label>
                    <div className="flex">
                      <Input
                        id="customer-email"
                        type="email"
                        placeholder="client@email.com"
                        className="border-taupe-rose focus:border-corail-doux rounded-r-none"
                      />
                      <Button
                        variant="outline"
                        className="border-l-0 border-taupe-rose rounded-l-none hover:bg-corail-doux hover:text-white bg-transparent"
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="customer-phone">Téléphone</Label>
                    <div className="flex">
                      <Input
                        id="customer-phone"
                        placeholder="+241 XX XX XX XX"
                        className="border-taupe-rose focus:border-corail-doux rounded-r-none"
                      />
                      <Button
                        variant="outline"
                        className="border-l-0 border-taupe-rose rounded-l-none hover:bg-corail-doux hover:text-white bg-transparent"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Informations Client</Label>
                    <div className="mt-2 p-4 bg-beige-creme rounded-lg border border-taupe-rose">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-corail-doux rounded-full flex items-center justify-center text-white font-bold">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-medium text-brun-chocolat">Nouveau Client</p>
                          <p className="text-sm text-taupe-fonce">Première commande</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-taupe-fonce">Commandes totales:</span>
                          <span className="font-medium text-brun-chocolat">0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-taupe-fonce">Montant total:</span>
                          <span className="font-medium text-brun-chocolat">0 FCFA</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-taupe-fonce">Membre depuis:</span>
                          <span className="font-medium text-brun-chocolat">-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label>Adresses</Label>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <Label className="text-sm font-medium">Adresse de Facturation</Label>
                    <div className="mt-2 p-4 bg-beige-creme rounded-lg border border-taupe-rose">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-corail-doux mt-1" />
                        <div className="text-sm text-taupe-fonce">
                          <p>Aucune adresse de facturation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Adresse de Livraison</Label>
                    <div className="mt-2 p-4 bg-beige-creme rounded-lg border border-taupe-rose">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-corail-doux mt-1" />
                        <div className="text-sm text-taupe-fonce">
                          <p>Aucune adresse de livraison</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6 mt-6">
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-taupe-rose mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-brun-chocolat mb-2">Aucun produit</h3>
                <p className="text-taupe-fonce mb-6">Ajoutez des produits à cette commande</p>
                <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">
                  <Package className="w-4 h-4 mr-2" />
                  Ajouter des Produits
                </Button>
              </div>
            </TabsContent>

            {/* Shipping Tab */}
            <TabsContent value="shipping" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="shipping-method">Méthode de Livraison</Label>
                    <Select>
                      <SelectTrigger className="border-taupe-rose">
                        <SelectValue placeholder="Sélectionner la méthode" />
                      </SelectTrigger>
                      <SelectContent>
                        {shippingMethods.map((method) => (
                          <SelectItem key={method} value={method.toLowerCase().replace(/\s+/g, "-")}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="tracking-number">Numéro de Suivi</Label>
                    <Input
                      id="tracking-number"
                      placeholder="TRK-2024-XXXX"
                      className="border-taupe-rose focus:border-corail-doux"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipping-cost">Frais de Livraison (FCFA)</Label>
                    <Input
                      id="shipping-cost"
                      type="number"
                      placeholder="2500"
                      className="border-taupe-rose focus:border-corail-doux"
                    />
                  </div>
                  <div>
                    <Label htmlFor="estimated-delivery">Livraison Estimée</Label>
                    <Input id="estimated-delivery" type="date" className="border-taupe-rose focus:border-corail-doux" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Statut de Livraison</Label>
                    <div className="mt-2 p-4 bg-beige-creme rounded-lg border border-taupe-rose">
                      <div className="flex items-center gap-3">
                        <Truck className="w-8 h-8 text-taupe-rose" />
                        <div>
                          <p className="font-medium text-brun-chocolat">En Attente</p>
                          <p className="text-sm text-taupe-fonce">La livraison n'a pas encore commencé</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="shipping-notes">Notes de Livraison</Label>
                    <Textarea
                      id="shipping-notes"
                      placeholder="Instructions spéciales pour la livraison..."
                      rows={4}
                      className="border-taupe-rose focus:border-corail-doux"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="payment-status">Statut du Paiement</Label>
                    <Select>
                      <SelectTrigger className="border-taupe-rose">
                        <SelectValue placeholder="Sélectionner le statut" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="payment-method">Méthode de Paiement</Label>
                    <Select>
                      <SelectTrigger className="border-taupe-rose">
                        <SelectValue placeholder="Sélectionner la méthode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mobile-money">Mobile Money</SelectItem>
                        <SelectItem value="bank-transfer">Virement Bancaire</SelectItem>
                        <SelectItem value="cash-on-delivery">Paiement à la Livraison</SelectItem>
                        <SelectItem value="credit-card">Carte de Crédit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="transaction-id">ID de Transaction</Label>
                    <Input
                      id="transaction-id"
                      placeholder="TXN-2024-XXXX"
                      className="border-taupe-rose focus:border-corail-doux"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Résumé Financier</Label>
                    <div className="mt-2 p-4 bg-beige-creme rounded-lg border border-taupe-rose">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-taupe-fonce">Sous-total:</span>
                          <span className="font-medium text-brun-chocolat">0 FCFA</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-taupe-fonce">Livraison:</span>
                          <span className="font-medium text-brun-chocolat">0 FCFA</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-taupe-fonce">Taxes:</span>
                          <span className="font-medium text-brun-chocolat">0 FCFA</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-brun-chocolat">Total:</span>
                          <span className="font-bold text-corail-doux text-lg">0 FCFA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label>Historique des Paiements</Label>
                <div className="mt-4 text-center py-8">
                  <CreditCard className="w-12 h-12 text-taupe-rose mx-auto mb-3" />
                  <p className="text-sm text-taupe-fonce">Aucun paiement enregistré</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between pt-6 border-t border-beige-rose">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-taupe-rose text-brun-chocolat hover:bg-beige-rose bg-transparent"
              >
                <Printer className="w-4 h-4 mr-2" />
                Imprimer
              </Button>
              <Button
                variant="outline"
                className="border-taupe-rose text-brun-chocolat hover:bg-beige-rose bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsOrderModalOpen(false)}
                className="border-taupe-rose text-brun-chocolat hover:bg-beige-rose bg-transparent"
              >
                Fermer
              </Button>
              <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">
                {selectedOrder ? "Mettre à Jour" : "Créer la Commande"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Statistics Dashboard */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-corail-doux" />
              Statistiques Commandes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Total Commandes</span>
                <span className="font-semibold text-brun-chocolat">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Commandes Aujourd'hui</span>
                <span className="font-semibold text-corail-doux">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Taux de Conversion</span>
                <span className="font-semibold text-brun-chocolat">0%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Panier Moyen</span>
                <span className="font-semibold text-corail-doux">0 FCFA</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-corail-doux" />
              Performance Financière
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Chiffre d'Affaires</span>
                <span className="font-semibold text-green-600">0 FCFA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Revenus Aujourd'hui</span>
                <span className="font-semibold text-corail-doux">0 FCFA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Commandes Payées</span>
                <span className="font-semibold text-green-600">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">En Attente de Paiement</span>
                <span className="font-semibold text-yellow-600">0</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-corail-doux" />
              Logistique & Livraison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">À Expédier</span>
                <span className="font-semibold text-orange-600">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">En Transit</span>
                <span className="font-semibold text-blue-600">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Livrées</span>
                <span className="font-semibold text-green-600">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Retards de Livraison</span>
                <span className="font-semibold text-red-600">0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
