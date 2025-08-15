"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { apiClient } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { createSlug } from "@/lib/utils"

// Use the same Product type as returned by your API
type Product = {
  id: number
  nom: string
  description: string
  prix_fcfa: number
  url_image: string
  statut_stock: "en_stock" | "rupture_stock" | "precommande"
  est_active: boolean
  note_moyenne?: number
  nombre_avis?: number
  categorie_id: number
}

interface Category {
  id: number
  nom: string
  description?: string
  url_image?: string
  est_active: boolean
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string

  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true)

        // Récupérer toutes les catégories pour trouver celle qui correspond au slug
        const categoriesResponse = await apiClient.getCategories()
        const matchingCategory = categoriesResponse.find((cat: Category) => createSlug(cat.nom) === slug)

        if (!matchingCategory) {
          setError("Catégorie non trouvée")
          return
        }

        setCategory(matchingCategory)

        // Récupérer tous les produits et filtrer par catégorie
        const productsResponse = await apiClient.getProducts()

        // Vérifier si la réponse a la structure { success, data } ou est un tableau direct
        const productsData = Array.isArray(productsResponse) 
          ? productsResponse 
          : productsResponse?.data || []

        const filteredProducts = productsData.filter(
          (product: Product) => product.categorie_id === matchingCategory.id && product.est_active
        )

        setProducts(filteredProducts)
      } catch (err) {
        console.error("Erreur lors du chargement:", err)
        setError("Erreur lors du chargement des produits")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchCategoryAndProducts()
    }
  }, [slug])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA"
  }

  const getStockBadge = (status: string) => {
    switch (status) {
      case "en_stock":
        return <Badge className="bg-green-100 text-green-800">En stock</Badge>
      case "rupture_stock":
        return <Badge className="bg-red-100 text-red-800">Rupture</Badge>
      case "precommande":
        return <Badge className="bg-yellow-100 text-yellow-800">Précommande</Badge>
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-green mx-auto"></div>
            <p className="mt-4 text-charcoal-black">Chargement des produits...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4 bg-sage-green hover:bg-sage-green/90">
              Réessayer
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header de catégorie */}
        <div className="mb-8">
          <nav className="text-sm breadcrumbs mb-4">
            <span className="text-charcoal-black/60">Accueil</span>
            <span className="mx-2 text-charcoal-black/40">/</span>
            <span className="text-charcoal-black/60">Catégories</span>
            <span className="mx-2 text-charcoal-black/40">/</span>
            <span className="text-charcoal-black">{category?.nom}</span>
          </nav>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-charcoal-black mb-4">{category?.nom}</h1>
            {category?.description && (
              <p className="text-charcoal-black/70 max-w-2xl mx-auto">{category.description}</p>
            )}
            <p className="text-sage-green font-medium mt-2">
              {products.length} produit{products.length > 1 ? "s" : ""} disponible{products.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Grille de produits */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={
                        product.url_image ||
                        `/placeholder.svg?height=300&width=300&query=${encodeURIComponent(product.nom) || "/placeholder.svg"}`
                      }
                      alt={product.nom}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute top-3 left-3">{getStockBadge(product.statut_stock)}</div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-charcoal-black mb-2 line-clamp-2">{product.nom}</h3>

                    {product.note_moyenne && (
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.note_moyenne!)
                                  ? "fill-golden-yellow text-golden-yellow"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-charcoal-black/60">({product.nombre_avis || 0})</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-golden-yellow">{formatPrice(product.prix_fcfa)}</span>
                      <Button
                        size="sm"
                        className="bg-sage-green hover:bg-sage-green/90 text-white"
                        disabled={product.statut_stock === "rupture_stock"}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-charcoal-black/60 text-lg">
              Aucun produit disponible dans cette catégorie pour le moment.
            </p>
            <Button onClick={() => window.history.back()} className="mt-4 bg-sage-green hover:bg-sage-green/90">
              Retour
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
