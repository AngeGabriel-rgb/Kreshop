"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Grid, List, SlidersHorizontal, Package } from "lucide-react"
import type { Product } from "@/types/product"

interface ProductGridProps {
  products: Product[]
  onProductClick: (product: Product) => void
  onAddToCart: (product: Product) => void
}

export function ProductGrid({ products, onProductClick, onAddToCart }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [filterCategory, setFilterCategory] = useState("all")

  const categories = ["all", "Robes", "Hommes", "Femmes", "Traditionnel", "Accessoires"]

  const filteredProducts = products.filter((product) => filterCategory === "all" || product.category === filterCategory)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return a.isNew ? -1 : 1
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="bg-beige-rose text-brun-chocolat mb-4">Collection Premium</Badge>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-brun-chocolat mb-4">
            Nos Créations Exclusives
          </h2>
          <p className="text-taupe-fonce max-w-2xl mx-auto">
            Découvrez notre sélection de vêtements authentiques, alliant tradition gabonaise et modernité
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 p-4 bg-beige-creme rounded-xl">
          <div className="flex flex-wrap items-center gap-4">
            {/* Category Filter */}
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48 border-taupe-rose">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 border-taupe-rose">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Mis en avant</SelectItem>
                <SelectItem value="newest">Plus récents</SelectItem>
                <SelectItem value="price-low">Prix croissant</SelectItem>
                <SelectItem value="price-high">Prix décroissant</SelectItem>
                <SelectItem value="rating">Mieux notés</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-taupe-fonce mr-4">{sortedProducts.length} produits</span>

            {/* View Mode Toggle */}
            <div className="flex border border-taupe-rose rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-corail-doux text-white" : "text-taupe-fonce"}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-corail-doux text-white" : "text-taupe-fonce"}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-24 h-24 text-taupe-rose mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-brun-chocolat mb-4">Aucun produit disponible</h3>
            <p className="text-taupe-fonce mb-8 max-w-md mx-auto">
              Notre collection sera bientôt disponible. Revenez prochainement pour découvrir nos créations exclusives.
            </p>
            <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">
              Être notifié des nouveautés
            </Button>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}

        {/* Load More - Only show if there are products */}
        {sortedProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-corail-doux text-corail-doux hover:bg-corail-doux hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 bg-transparent"
            >
              Voir plus de produits
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
