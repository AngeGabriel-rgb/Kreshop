"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Grid, List, Folder, TrendingUp, Package } from "lucide-react"

export function ClientCategories() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-dark-brown">Nos Catégories</h1>
        <p className="text-taupe text-lg max-w-2xl mx-auto">
          Explorez nos différentes catégories de mode africaine et trouvez le style qui vous correspond
        </p>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className="border-coral/30 text-coral">
            Mode Traditionnelle
          </Badge>
          <Badge variant="outline" className="border-coral/30 text-coral">
            Style Moderne
          </Badge>
          <Badge variant="outline" className="border-coral/30 text-coral">
            Accessoires
          </Badge>
        </div>
      </div>

      {/* Search and View Options */}
      <Card className="bg-white/80 backdrop-blur-sm border-coral/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taupe w-4 h-4" />
              <Input
                placeholder="Rechercher des catégories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-coral/30 focus:border-coral"
              />
            </div>
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
        </CardContent>
      </Card>

      {/* Categories Grid/List */}
      <div className="min-h-[400px]">
        <Card className="bg-white/80 backdrop-blur-sm border-coral/20">
          <CardContent className="p-8">
            <div className="text-center py-16">
              <Folder className="w-24 h-24 mx-auto text-taupe/50 mb-6" />
              <h2 className="text-2xl font-semibold text-dark-brown mb-4">Aucune catégorie disponible</h2>
              <p className="text-taupe mb-8 max-w-md mx-auto">
                Nos catégories de produits seront bientôt disponibles. Consultez directement notre catalogue de
                produits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-coral hover:bg-coral/90 text-white">
                  <Package className="w-4 h-4 mr-2" />
                  Voir tous les Produits
                </Button>
                <Button variant="outline" className="border-coral/30 text-dark-brown hover:bg-coral/10 bg-transparent">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Tendances du Moment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Categories Preview */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark-brown mb-2">Catégories à Venir</h2>
          <p className="text-taupe">Découvrez bientôt nos collections organisées par thème</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Robes Traditionnelles",
              description: "Élégance africaine authentique",
              icon: "👗",
              count: "Bientôt disponible",
              color: "from-coral/20 to-coral/10",
            },
            {
              title: "Accessoires",
              description: "Bijoux et accessoires traditionnels",
              icon: "💍",
              count: "Bientôt disponible",
              color: "from-taupe/20 to-taupe/10",
            },
            {
              title: "Mode Masculine",
              description: "Style africain pour hommes",
              icon: "👔",
              count: "Bientôt disponible",
              color: "from-dark-brown/20 to-dark-brown/10",
            },
            {
              title: "Enfants",
              description: "Mode africaine pour les petits",
              icon: "👶",
              count: "Bientôt disponible",
              color: "from-cream/40 to-cream/20",
            },
          ].map((category, index) => (
            <Card
              key={index}
              className={`bg-gradient-to-br ${category.color} border-coral/20 hover:shadow-lg transition-all duration-300 group`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-dark-brown mb-2">{category.title}</h3>
                <p className="text-sm text-taupe mb-4">{category.description}</p>
                <Badge variant="outline" className="border-coral/30 text-coral mb-4">
                  {category.count}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-coral/30 text-coral hover:bg-coral hover:text-white bg-transparent opacity-50 cursor-not-allowed"
                  disabled
                >
                  Bientôt Disponible
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-r from-coral/10 to-taupe/10 border-coral/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold text-dark-brown mb-2">Soyez les Premiers Informés</h3>
          <p className="text-taupe mb-6">
            Recevez une notification dès que nos nouvelles catégories seront disponibles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Votre adresse email" className="border-coral/30 focus:border-coral" />
            <Button className="bg-coral hover:bg-coral/90 text-white">Me Notifier</Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Searches */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-dark-brown text-center">Recherches Populaires</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "Robe Africaine",
            "Wax Traditionnel",
            "Bijoux Ethniques",
            "Boubou Homme",
            "Headwrap",
            "Dashiki",
            "Kente",
            "Ankara",
          ].map((term, index) => (
            <Badge
              key={index}
              variant="outline"
              className="border-coral/30 text-coral hover:bg-coral hover:text-white cursor-pointer transition-colors"
            >
              {term}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  )
}
