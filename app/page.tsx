"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ShoppingBag, Users, Star, TrendingUp, ChevronDown, Mail } from "lucide-react"
import { ProductGrid } from "@/components/product-grid"
import { getProducts, getCategories } from "@/lib/data"
import type { Produit, Categorie } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Produit[]>([])
  const [categories, setCategories] = useState<Categorie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [productsData, categoriesData] = await Promise.all([getProducts(1, 8), getCategories()])

        // Filter featured products
        const featured = productsData.products.filter((product) => product.est_vedette).slice(0, 4)
        setFeaturedProducts(featured)
        setCategories(categoriesData.slice(0, 6)) // Limit to 6 categories
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des données")
        console.error("Error fetching homepage data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Découvrez{" "}
              <span className="bg-gradient-to-r from-corail-intensifie to-corail-doux bg-clip-text text-transparent">
                KreShop
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Votre destination shopping en ligne avec les meilleurs produits aux prix les plus compétitifs
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-corail-intensifie hover:bg-corail-doux text-white px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Découvrir nos produits
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-brun-chocolat px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300 bg-transparent"
              >
                <Link href="/categories">
                  Voir les catégories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-corail-intensifie">1000+</div>
                <div className="text-gray-300 mt-2">Produits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-corail-intensifie">500+</div>
                <div className="text-gray-300 mt-2">Clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-corail-intensifie">24/7</div>
                <div className="text-gray-300 mt-2">Support client</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-corail-intensifie">4.9★</div>
                <div className="text-gray-300 mt-2">Note moyenne</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-beige-creme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brun-chocolat mb-4">Explorez nos Catégories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez notre large gamme de produits soigneusement sélectionnés pour vous
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
                    <Skeleton className="h-4 w-20 mx-auto mb-2" />
                    <Skeleton className="h-3 w-16 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p>Erreur lors du chargement des catégories</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center text-gray-500">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p>Aucune catégorie disponible pour le moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <Card className="group cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-corail-intensifie to-corail-doux rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                        <ShoppingBag className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-brun-chocolat group-hover:text-corail-intensifie transition-colors">
                        {category.nom}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{category.description || "Découvrir"}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-corail-intensifie text-corail-intensifie hover:bg-corail-intensifie hover:text-white bg-transparent"
            >
              <Link href="/categories">
                Voir toutes les catégories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-corail-intensifie text-white mb-4">
              <Star className="h-4 w-4 mr-1" />
              Produits Vedettes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-brun-chocolat mb-4">Nos Coups de Cœur</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de produits les plus populaires et les mieux notés
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-8 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p>Erreur lors du chargement des produits</p>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center text-gray-500">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p>Aucun produit vedette disponible pour le moment</p>
            </div>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-corail-intensifie hover:bg-corail-doux text-white">
              <Link href="/products">
                Voir tous les produits
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-beige-creme to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brun-chocolat mb-4">Pourquoi choisir KreShop ?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nous nous engageons à vous offrir la meilleure expérience d'achat en ligne
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-corail-intensifie to-corail-doux rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brun-chocolat mb-4">Produits de Qualité</h3>
              <p className="text-gray-600">
                Nous sélectionnons rigoureusement chaque produit pour garantir la meilleure qualité à nos clients.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-corail-intensifie to-corail-doux rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brun-chocolat mb-4">Service Client 24/7</h3>
              <p className="text-gray-600">
                Notre équipe est disponible 24h/24 et 7j/7 pour répondre à toutes vos questions et préoccupations.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-corail-intensifie to-corail-doux rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brun-chocolat mb-4">Prix Compétitifs</h3>
              <p className="text-gray-600">
                Nous offrons les meilleurs prix du marché avec des promotions régulières pour nos clients fidèles.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-brun-chocolat relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <Mail className="h-16 w-16 text-corail-intensifie mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Restez informé de nos nouveautés</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter et recevez en exclusivité nos offres spéciales et nouveaux produits
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:bg-white/20"
            />
            <Button className="bg-corail-intensifie hover:bg-corail-doux text-white px-8">S'inscrire</Button>
          </div>

          <p className="text-sm text-gray-400 mt-4">Nous respectons votre vie privée. Désabonnez-vous à tout moment.</p>
        </div>
      </section>
    </div>
  )
}
