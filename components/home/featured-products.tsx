"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, ShoppingBag } from "lucide-react"
import { api, type Product } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("fr-FR", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price) + " FCFA"
  )
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true)
        const response = await api.getFeaturedProducts()

        if (response.success && response.data) {
          setProducts(response.data)
        } else {
          setError("Impossible de charger les produits")
        }
      } catch (err) {
        console.error("Erreur lors du chargement des produits:", err)
        setError("Erreur de connexion")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Produit ajouté",
      description: `${product.nom} a été ajouté au panier`,
    })
  }

  const handleAddToWishlist = (product: Product) => {
    toast({
      title: "Ajouté aux favoris",
      description: `${product.nom} a été ajouté à vos favoris`,
    })
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Produits Vedettes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre sélection de produits les plus populaires et nos dernières nouveautés
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <Skeleton className="h-64 w-full" />
                </CardContent>
                <CardFooter className="p-4 space-y-3">
                  <div className="w-full space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-destructive">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Produits Vedettes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection de produits les plus populaires et nos dernières nouveautés
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const mainImage = product.images?.[0]?.url_image || "/placeholder.svg?height=400&width=300"
            const hasPromo = product.prix_promo_fcfa && product.prix_promo_fcfa < product.prix_fcfa
            const isOutOfStock = product.stock_info?.is_out_of_stock
            const isLowStock = product.stock_info?.has_low_stock

            return (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={mainImage || "/placeholder.svg"}
                      alt={product.nom}
                      width={300}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {hasPromo && (
                      <Badge className="absolute top-2 left-2 bg-golden-yellow text-charcoal-black">Promo</Badge>
                    )}
                    {isOutOfStock && (
                      <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                        Rupture
                      </Badge>
                    )}
                    {isLowStock && !isOutOfStock && (
                      <Badge className="absolute top-2 left-2 bg-orange-500 text-white">Stock limité</Badge>
                    )}

                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-background/80 hover:bg-background"
                        onClick={() => handleAddToWishlist(product)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 space-y-3">
                  <div className="w-full">
                    <p className="text-sm text-muted-foreground">{product.categorie?.nom}</p>
                    <h3 className="font-semibold text-lg leading-tight">{product.nom}</h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="price-fcfa text-primary text-lg">
                        {formatPrice(hasPromo ? product.prix_promo_fcfa! : product.prix_fcfa)}
                      </span>
                      {hasPromo && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.prix_fcfa)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 w-full">
                    <Button asChild variant="outline" className="flex-1 bg-transparent">
                      <Link href={`/produit/${product.slug}`}>Voir</Link>
                    </Button>
                    <Button
                      className="btn-primary flex-1"
                      onClick={() => handleAddToCart(product)}
                      disabled={isOutOfStock}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      {isOutOfStock ? "Rupture" : "Ajouter"}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/produits">Voir tous les produits</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
