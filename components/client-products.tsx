"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Grid, List, Package, Heart } from "lucide-react"

export function ClientProducts() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-dark-brown">Nos Produits</h1>
        <p className="text-taupe text-lg max-w-2xl mx-auto">
          Découvrez notre collection exclusive de mode africaine authentique et moderne
        </p>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className="border-coral/30 text-coral">
            Mode Africaine
          </Badge>
          <Badge variant="outline" className="border-coral/30 text-coral">
            Authentique
          </Badge>
          <Badge variant="outline" className="border-coral/30 text-coral">
            Qualité Premium
          </Badge>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white/80 backdrop-blur-sm border-coral/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taupe w-4 h-4" />
              <Input
                placeholder="Rechercher des produits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-coral/30 focus:border-coral"
              />
            </div>
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="w-48 border-coral/30 focus:border-coral">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="dresses">Robes</SelectItem>
                  <SelectItem value="accessories">Accessoires</SelectItem>
                  <SelectItem value="men">Mode Masculine</SelectItem>
                  <SelectItem value="traditional">Traditionnel</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48 border-coral/30 focus:border-coral">
                  <SelectValue placeholder="Prix" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les prix</SelectItem>
                  <SelectItem value="0-25000">0 - 25,000 FCFA</SelectItem>
                  <SelectItem value="25000-50000">25,000 - 50,000 FCFA</SelectItem>
                  <SelectItem value="50000-100000">50,000 - 100,000 FCFA</SelectItem>
                  <SelectItem value="100000+">100,000+ FCFA</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48 border-coral/30 focus:border-coral">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Plus récent</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="popular">Plus populaire</SelectItem>
                  <SelectItem value="rating">Mieux notés</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "bg-coral text-white"
                      : "border-coral/30 text-coral hover:bg-coral/10 bg-transparent"
                  }
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "bg-coral text-white"
                      : "border-coral/30 text-coral hover:bg-coral/10 bg-transparent"
                  }
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid/List */}
      <div className="min-h-[400px]">
        <Card className="bg-white/80 backdrop-blur-sm border-coral/20">
          <CardContent className="p-8">
            <div className="text-center py-16">
              <Package className="w-24 h-24 mx-auto text-taupe/50 mb-6" />
              <h2 className="text-2xl font-semibold text-dark-brown mb-4">Aucun produit disponible</h2>
              <p className="text-taupe mb-8 max-w-md mx-auto">
                Notre catalogue de produits sera bientôt disponible. Revenez plus tard pour découvrir nos créations
                uniques.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-coral hover:bg-coral/90 text-white">
                  <Heart className="w-4 h-4 mr-2" />
                  Créer une Liste de Souhaits
                </Button>
                <Button variant="outline" className="border-coral/30 text-dark-brown hover:bg-coral/10 bg-transparent">
                  Parcourir les Catégories
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Collections */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark-brown mb-2">Collections à Découvrir</h2>
          <p className="text-taupe">Explorez nos collections thématiques</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Collection Été",
              description: "Fraîcheur et élégance pour la saison chaude",
              image: "/placeholder.svg?height=200&width=300&text=Collection+Été",
              badge: "Nouveau",
            },
            {
              title: "Mariage Traditionnel",
              description: "Tenues d'exception pour vos grands moments",
              image: "/placeholder.svg?height=200&width=300&text=Mariage+Traditionnel",
              badge: "Populaire",
            },
            {
              title: "Business Chic",
              description: "Professionnalisme et style africain",
              image: "/placeholder.svg?height=200&width=300&text=Business+Chic",
              badge: "Tendance",
            },
          ].map((collection, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-coral/20 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-coral text-white">{collection.badge}</Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Button
                  size="sm"
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-dark-brown hover:bg-coral hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  Découvrir
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-dark-brown mb-1">{collection.title}</h3>
                <p className="text-sm text-taupe">{collection.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-r from-coral/10 to-taupe/10 border-coral/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold text-dark-brown mb-2">Restez Informé</h3>
          <p className="text-taupe mb-6">Soyez les premiers à découvrir nos nouveaux produits et offres exclusives</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Votre adresse email" className="border-coral/30 focus:border-coral" />
            <Button className="bg-coral hover:bg-coral/90 text-white">S'abonner</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
