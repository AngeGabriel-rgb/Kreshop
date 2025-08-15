"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { apiClient, type Category } from "@/lib/api-client"
import { Skeleton } from "@/components/ui/skeleton"
import { createSlug } from "@/lib/utils"

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true)
        const categories = await apiClient.getCategories()

        if (categories && Array.isArray(categories)) {
          const activeCategories = categories.filter((cat) => cat.est_active).slice(0, 4)

          setCategories(activeCategories)
        } else {
          setError("Impossible de charger les catégories")
        }
      } catch (err) {
        console.error("Erreur lors du chargement des catégories:", err)
        setError("Erreur de connexion")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (isLoading) {
    return (
      <section className="py-16 bg-cream-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal-black">Nos Catégories</h2>
            <p className="text-lg text-charcoal-black/70 max-w-2xl mx-auto">
              Découvrez notre sélection de vêtements et accessoires pour toute la famille
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <Skeleton className="h-64 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-cream-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-cream-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal-black">Nos Catégories</h2>
          <p className="text-lg text-charcoal-black/70 max-w-2xl mx-auto">
            Découvrez notre sélection de vêtements et accessoires pour toute la famille
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${createSlug(category.nom)}`} className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
                <CardContent className="p-0">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={
                        category.url_image ||
                        `/placeholder.svg?height=300&width=300&query=${encodeURIComponent(category.nom)}`
                      }
                      alt={category.nom}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{category.nom}</h3>
                      {category.description && (
                        <p className="text-sm opacity-90 line-clamp-2">{category.description}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
