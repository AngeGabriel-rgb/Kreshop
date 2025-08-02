"use client"

import * as React from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { fetchProduits, type Produit } from "@/lib/api"

import { ProductCard } from "./product-card"

interface ProductGridProps {
  title?: string
}

export function ProductGrid({ title }: ProductGridProps) {
  const [products, setProducts] = React.useState<Produit[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        const response = await fetchProduits() 

        if (Array.isArray(response)) {
          setProducts(response as Produit[])
        } else if (
          response &&
          typeof response === "object" &&
          "data" in response &&
          Array.isArray((response as { data?: unknown }).data)
        ) {
          setProducts((response as { data: Produit[] }).data)
        } else {
          setError("Format de données inattendu de l'API des produits.")
          console.error("Réponse API inattendue pour les produits:", response)
          setProducts([]) // Assurez-vous que products est un tableau vide pour éviter l'erreur .map()
        }
      } catch (err) {
        setError("Échec du chargement des produits.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    getProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-80 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center text-destructive">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <section className="py-8">
      {title && (
        <h2 className="mb-6 text-3xl font-bold text-brun-chocolat dark:text-beige-creme font-serif">{title}</h2>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
