"use client"

import { useState, useMemo } from "react"
import { ProductFilters } from "./product-filters"
import { ProductGrid } from "./product-grid"
import { ProductSort } from "./product-sort"
import { ViewToggle } from "./view-toggle"
import { SearchResults } from "./search-results"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from "lucide-react"

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Robe Élégante Wax Traditionnel",
    price: 5000,
    originalPrice: 7000,
    image: "https://www.dressself.com/cdn/shop/products/RobedeSoiree_a7cbc589-e230-45df-85de-cb327013fdb6.jpg?v=1653555707",
    category: "Femme",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Rouge", "Bleu", "Vert"],
    inStock: true,
    rating: 4.8,
    reviews: 24,
    isNew: true,
    tags: ["wax", "traditionnel", "élégant"],
  },
  {
    id: 2,
    name: "Chemise Homme Coton Bio",
    price: 3000,
    image: "https://lechemiseur.imgix.net/data/lechemiseur/bandeaux/v4/RB56-lechemiseur-chemise-sur-mesure-business-rayee-100ko-1000x10000.jpg?w=1400&auto=format&fp-x=0.5&fp-y=0.5&fit=crop&crop=focalpoint&",
    category: "Homme",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Blanc", "Bleu", "Noir"],
    inStock: true,
    rating: 4.5,
    reviews: 18,
    isNew: false,
    tags: ["coton", "bio", "chemise"],
  },
  {
    id: 3,
    name: "Collier Perles Dorées Artisanal",
    price: 3000,
    originalPrice: 6000,
    image: "https://www.netperles.com/upload/AUG-8512-BUST.jpg",
    category: "Accessoires",
    sizes: ["Unique"],
    colors: ["Doré", "Argenté"],
    inStock: true,
    rating: 4.9,
    reviews: 32,
    isNew: false,
    tags: ["bijoux", "artisanal", "perles"],
  },
  {
    id: 4,
    name: "Ensemble Enfant Coloré Safari",
    price: 8000,
    image: "https://ayuna.fr/1554-home_default/ensemble-poissonvolant.jpg",
    category: "Enfants",
    sizes: ["2-3 ans", "4-5 ans", "6-7 ans"],
    colors: ["Multicolore"],
    inStock: false,
    rating: 4.6,
    reviews: 12,
    isNew: true,
    tags: ["enfant", "safari", "coloré"],
  },
  {
    id: 5,
    name: "Pantalon Femme Taille Haute",
    price: 7000,
    image: "https://i.pinimg.com/736x/b0/9c/e6/b09ce68d9ef5c038c95f8d54c098ba95.jpg",
    category: "Femme",
    sizes: ["S", "M", "L"],
    colors: ["Noir", "Beige", "Marine"],
    inStock: true,
    rating: 4.7,
    reviews: 28,
    isNew: false,
    tags: ["pantalon", "taille haute", "moderne"],
  },
  {
    id: 6,
    name: "Sac à Main Cuir Véritable",
    price: 5000,
    image: "https://www.paulmarius.fr/media/catalog/product/s/a/sac_bandouliere_cuir_besace_marron_paulmarius_naturel__2__0bbc.jpg",
    category: "Accessoires",
    sizes: ["Unique"],
    colors: ["Marron", "Noir", "Cognac"],
    inStock: true,
    rating: 4.9,
    reviews: 45,
    isNew: false,
    tags: ["sac", "cuir", "véritable"],
  },
]

export type Product = (typeof mockProducts)[0]

export interface Filters {
  category: string[]
  priceRange: [number, number]
  sizes: string[]
  colors: string[]
  inStock: boolean
  isNew: boolean
}

export type SortOption = "popularity" | "price-asc" | "price-desc" | "newest" | "rating"
export type ViewMode = "grid" | "list"

export function ProductCatalog() {
  const [filters, setFilters] = useState<Filters>({
    category: [],
    priceRange: [0, 100000],
    sizes: [],
    colors: [],
    inStock: false,
    isNew: false,
  })

  const [sortBy, setSortBy] = useState<SortOption>("popularity")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const filteredProducts = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(product.category)) {
        return false
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Size filter
      if (filters.sizes.length > 0 && !filters.sizes.some((size) => product.sizes.includes(size))) {
        return false
      }

      // Color filter
      if (filters.colors.length > 0 && !filters.colors.some((color) => product.colors.includes(color))) {
        return false
      }

      // Stock filter
      if (filters.inStock && !product.inStock) {
        return false
      }

      // New products filter
      if (filters.isNew && !product.isNew) {
        return false
      }

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
        )
      }

      return true
    })

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "popularity":
      default:
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
    }

    return filtered
  }, [filters, sortBy, searchQuery])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Header with title and controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tous les produits</h1>
          <p className="text-muted-foreground mt-1">
            {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""} trouvé
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />

          {/* Mobile filter trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filtres</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <ProductFilters filters={filters} onFiltersChange={setFilters} products={mockProducts} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search results highlight */}
      {searchQuery && <SearchResults query={searchQuery} resultCount={filteredProducts.length} />}

      <div className="flex gap-6">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <ProductFilters filters={filters} onFiltersChange={setFilters} products={mockProducts} />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <ProductGrid
            products={paginatedProducts}
            viewMode={viewMode}
            searchQuery={searchQuery}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}
