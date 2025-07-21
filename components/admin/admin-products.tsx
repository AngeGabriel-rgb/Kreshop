"use client"

import type React from "react"

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
import {
  Package,
  Plus,
  Upload,
  Percent,
  Search,
  Filter,
  Star,
  AlertTriangle,
  CheckCircle,
  X,
  TrendingUp,
} from "lucide-react"

const categories = ["Robes", "Hommes", "Femmes", "Traditionnel", "Accessoires", "Chaussures", "Jupes", "Hauts"]
const colors = ["Rouge", "Bleu", "Vert", "Jaune", "Orange", "Rose", "Blanc", "Noir", "Multicolore"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

export function AdminProducts() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("XAF", "FCFA")
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setUploadedImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-brun-chocolat">Gestion des Produits</h1>
          <p className="text-taupe-fonce">Gérez votre catalogue de produits GabonStyle</p>
        </div>
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un Produit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedProduct ? "Modifier le Produit" : "Ajouter un Nouveau Produit"}</DialogTitle>
              <DialogDescription>Remplissez les informations du produit ci-dessous</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-beige-creme">
                <TabsTrigger
                  value="general"
                  className="data-[state=active]:bg-corail-doux data-[state=active]:text-white"
                >
                  Général
                </TabsTrigger>
                <TabsTrigger
                  value="images"
                  className="data-[state=active]:bg-corail-doux data-[state=active]:text-white"
                >
                  Images
                </TabsTrigger>
                <TabsTrigger
                  value="variants"
                  className="data-[state=active]:bg-corail-doux data-[state=active]:text-white"
                >
                  Variantes
                </TabsTrigger>
                <TabsTrigger
                  value="promotion"
                  className="data-[state=active]:bg-corail-doux data-[state=active]:text-white"
                >
                  Promotion
                </TabsTrigger>
              </TabsList>

              {/* General Tab */}
              <TabsContent value="general" className="space-y-6 mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nom du Produit *</Label>
                      <Input
                        id="name"
                        placeholder="Ex: Robe Wax Élégante"
                        className="border-taupe-rose focus:border-corail-doux"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Catégorie *</Label>
                      <Select>
                        <SelectTrigger className="border-taupe-rose">
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Prix (FCFA) *</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="45000"
                          className="border-taupe-rose focus:border-corail-doux"
                        />
                      </div>
                      <div>
                        <Label htmlFor="stock">Stock *</Label>
                        <Input
                          id="stock"
                          type="number"
                          placeholder="10"
                          className="border-taupe-rose focus:border-corail-doux"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Description détaillée du produit..."
                        rows={6}
                        className="border-taupe-rose focus:border-corail-doux"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="is-new" />
                      <Label htmlFor="is-new">Marquer comme nouveau</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="is-featured" />
                      <Label htmlFor="is-featured">Produit mis en avant</Label>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Images Tab */}
              <TabsContent value="images" className="space-y-6 mt-6">
                <div>
                  <Label>Upload Multiple d'Images</Label>
                  <div className="mt-2 border-2 border-dashed border-taupe-rose rounded-lg p-8 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-taupe-fonce mx-auto mb-4" />
                      <p className="text-brun-chocolat font-medium">Cliquez pour télécharger des images</p>
                      <p className="text-sm text-taupe-fonce">PNG, JPG, WEBP jusqu'à 10MB chacune</p>
                    </label>
                  </div>
                </div>

                {uploadedImages.length > 0 && (
                  <div>
                    <Label>Images Téléchargées</Label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-taupe-rose"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          {index === 0 && (
                            <Badge className="absolute bottom-2 left-2 bg-corail-doux text-white">
                              Image principale
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Variants Tab */}
              <TabsContent value="variants" className="space-y-6 mt-6">
                <div className="space-y-6">
                  <div>
                    <Label>Gestion Avancée des Variantes</Label>
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <Label htmlFor="colors">Couleurs Disponibles</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {colors.map((color) => (
                            <label key={color} className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-taupe-rose text-corail-doux" />
                              <span className="text-sm">{color}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="sizes">Tailles Disponibles</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {sizes.map((size) => (
                            <label key={size} className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-taupe-rose text-corail-doux" />
                              <span className="text-sm">{size}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label>Variantes de Prix par Taille/Couleur</Label>
                    <div className="space-y-4 mt-4">
                      <div className="grid grid-cols-4 gap-4 p-4 bg-beige-creme rounded-lg">
                        <div>
                          <Label className="text-xs">Couleur</Label>
                          <Select>
                            <SelectTrigger className="h-8">
                              <SelectValue placeholder="Rouge" />
                            </SelectTrigger>
                            <SelectContent>
                              {colors.map((color) => (
                                <SelectItem key={color} value={color}>
                                  {color}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Taille</Label>
                          <Select>
                            <SelectTrigger className="h-8">
                              <SelectValue placeholder="M" />
                            </SelectTrigger>
                            <SelectContent>
                              {sizes.map((size) => (
                                <SelectItem key={size} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Prix (FCFA)</Label>
                          <Input type="number" placeholder="45000" className="h-8" />
                        </div>
                        <div>
                          <Label className="text-xs">Stock</Label>
                          <Input type="number" placeholder="10" className="h-8" />
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-corail-doux text-corail-doux hover:bg-corail-doux hover:text-white bg-transparent"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter une Variante
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Promotion Tab */}
              <TabsContent value="promotion" className="space-y-6 mt-6">
                <div className="space-y-6">
                  <div>
                    <Label>Moteur de Promotions</Label>
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="has-promotion" />
                          <Label htmlFor="has-promotion">Activer la promotion</Label>
                        </div>
                        <div>
                          <Label htmlFor="discount-type">Type de Réduction</Label>
                          <Select>
                            <SelectTrigger className="border-taupe-rose">
                              <SelectValue placeholder="Sélectionner le type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="percentage">Pourcentage</SelectItem>
                              <SelectItem value="fixed">Montant fixe</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="discount-value">Valeur de la Réduction</Label>
                          <div className="flex">
                            <Input
                              id="discount-value"
                              type="number"
                              placeholder="20"
                              className="border-taupe-rose focus:border-corail-doux"
                            />
                            <div className="flex items-center px-3 bg-beige-creme border border-l-0 border-taupe-rose rounded-r-md">
                              <Percent className="w-4 h-4 text-taupe-fonce" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="promo-start">Date de Début</Label>
                          <Input
                            id="promo-start"
                            type="datetime-local"
                            className="border-taupe-rose focus:border-corail-doux"
                          />
                        </div>
                        <div>
                          <Label htmlFor="promo-end">Date de Fin</Label>
                          <Input
                            id="promo-end"
                            type="datetime-local"
                            className="border-taupe-rose focus:border-corail-doux"
                          />
                        </div>
                        <div>
                          <Label htmlFor="promo-code">Code Promo (Optionnel)</Label>
                          <Input
                            id="promo-code"
                            placeholder="GABON2024"
                            className="border-taupe-rose focus:border-corail-doux"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label>Aperçu de la Promotion</Label>
                    <div className="mt-4 p-4 bg-beige-creme rounded-lg border border-corail-doux">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-brun-chocolat">Prix Original: 0 FCFA</p>
                          <p className="text-lg font-bold text-corail-doux">Prix Promotionnel: 0 FCFA</p>
                          <Badge className="bg-brun-espresso text-white mt-2">Aucune promotion</Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-taupe-fonce">Économie</p>
                          <p className="text-xl font-bold text-green-600">0 FCFA</p>
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
                onClick={() => setIsEditModalOpen(false)}
                className="border-taupe-rose text-brun-chocolat hover:bg-beige-rose bg-transparent"
              >
                Annuler
              </Button>
              <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">
                {selectedProduct ? "Mettre à Jour" : "Créer le Produit"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taupe-fonce h-4 w-4" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-taupe-rose focus:border-corail-doux"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 border-taupe-rose">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48 border-taupe-rose">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="out_of_stock">Rupture de stock</SelectItem>
                  <SelectItem value="low_stock">Stock faible</SelectItem>
                  <SelectItem value="draft">Brouillon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Catalogue de Produits (0)</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">0 Actifs</Badge>
              <Badge className="bg-red-100 text-red-800">0 Ruptures</Badge>
              <Badge className="bg-yellow-100 text-yellow-800">0 Stock faible</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-taupe-rose mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-brun-chocolat mb-2">Aucun produit</h3>
            <p className="text-taupe-fonce mb-6">Commencez par ajouter votre premier produit</p>
            <Button
              onClick={() => setIsEditModalOpen(true)}
              className="bg-corail-doux hover:bg-corail-intensifie text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un Produit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tableau de Bord Statistiques */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-corail-doux" />
              Statistiques Produits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Total Produits</span>
                <span className="font-semibold text-brun-chocolat">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Produits Actifs</span>
                <span className="font-semibold text-green-600">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Stock Total</span>
                <span className="font-semibold text-brun-chocolat">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Valeur Stock</span>
                <span className="font-semibold text-corail-doux">0 FCFA</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-corail-doux" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Ventes Totales</span>
                <span className="font-semibold text-brun-chocolat">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Note Moyenne</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-gray-300" />
                  <span className="font-semibold text-brun-chocolat">0</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">Produits Nouveaux</span>
                <span className="font-semibold text-corail-doux">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-taupe-fonce">En Promotion</span>
                <span className="font-semibold text-brun-chocolat">0</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-corail-doux" />
              Alertes Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-sm text-taupe-fonce">Aucune alerte stock</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
