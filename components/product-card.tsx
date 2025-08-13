"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import type { Produit } from "@/lib/types"
import { useCartStore } from "@/lib/store"

interface ProductCardProps {
  product: Produit
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    // For simplicity, add the first variant if available, or a generic item
    const defaultVariant = product.variantes?.[0]
    addItem({
      productId: product.id,
      variantId: defaultVariant?.id,
      name: product.nom,
      price: product.prix_fcfa + (defaultVariant?.prix_supplementaire || 0),
      quantity: 1,
      image: product.images[0]?.url || "/placeholder.svg?height=200&width=200",
      slug: product.slug,
      color: defaultVariant?.couleur,
      size: defaultVariant?.taille,
    })
  }

  return (
    <Card className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      <Link href={`/product/${product.slug}`} className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">Voir le produit {product.nom}</span>
      </Link>
      <Image
        src={product.images[0]?.url || "/placeholder.svg?height=200&width=200&query=product"}
        alt={product.images[0]?.alt || product.nom}
        width={300}
        height={200}
        className="h-48 w-full object-cover"
      />
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-brun-chocolat">{product.nom}</h3>
        <p className="text-sm text-gray-600">{product.description_courte}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-corail-intensifie">{formatPrice(product.prix_fcfa)}</span>
          <Button onClick={handleAddToCart} className="bg-corail-intensifie text-white hover:bg-corail-doux">
            Ajouter au panier
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
