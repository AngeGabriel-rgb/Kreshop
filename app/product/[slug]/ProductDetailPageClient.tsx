"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { formatPrice } from "@/lib/utils"
import type { Produit } from "@/lib/types"
import { useCartStore } from "@/lib/store"

interface ProductDetailPageClientProps {
  product: Produit
}

export function ProductDetailPageClient({ product }: ProductDetailPageClientProps) {
  const { toast } = useToast()
  const addItem = useCartStore((state) => state.addItem)

  const [selectedVariant, setSelectedVariant] = useState(product.variantes?.[0] || null)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une variante de produit.",
        variant: "destructive",
      })
      return
    }

    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.nom,
      price: product.prix_fcfa + selectedVariant.prix_supplementaire,
      quantity: quantity,
      image: selectedVariant.images?.[0]?.url || product.images[0]?.url || "/placeholder.svg?height=200&width=200",
      slug: product.slug,
      color: selectedVariant.couleur,
      size: selectedVariant.taille,
    })

    toast({
      title: "Ajouté au panier !",
      description: `${quantity} x ${product.nom} (${selectedVariant.couleur}, ${selectedVariant.taille}) a été ajouté à votre panier.`,
    })
  }

  const currentPrice = product.prix_fcfa + (selectedVariant?.prix_supplementaire || 0)

  return (
    <div className="container mx-auto grid gap-8 px-4 py-8 md:grid-cols-2">
      <div className="relative h-[400px] w-full overflow-hidden rounded-lg md:h-[500px]">
        <Image
          src={
            selectedVariant?.images?.[0]?.url ||
            product.images[0]?.url ||
            "/placeholder.svg?height=500&width=500&query=product"
          }
          alt={selectedVariant?.images?.[0]?.alt || product.images[0]?.alt || product.nom}
          fill
          style={{ objectFit: "contain" }}
          className="bg-gray-100"
        />
      </div>
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-brun-chocolat">{product.nom}</h1>
        <p className="text-2xl font-semibold text-corail-intensifie">{formatPrice(currentPrice)}</p>
        <p className="text-gray-700">{product.description}</p>

        {product.variantes && product.variantes.length > 0 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="variant-select" className="mb-2 block text-sm font-medium text-gray-700">
                Variante:
              </label>
              <Select
                onValueChange={(value) =>
                  setSelectedVariant(product.variantes.find((v) => v.id.toString() === value) || null)
                }
                value={selectedVariant?.id.toString()}
              >
                <SelectTrigger id="variant-select" className="w-full md:w-[200px]">
                  <SelectValue placeholder="Sélectionner une variante" />
                </SelectTrigger>
                <SelectContent>
                  {product.variantes.map((variant) => (
                    <SelectItem key={variant.id} value={variant.id.toString()}>
                      {variant.couleur} - {variant.taille} (Stock: {variant.stock})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="quantity-input" className="mb-2 block text-sm font-medium text-gray-700">
                Quantité:
              </label>
              <input
                id="quantity-input"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                className="w-24 rounded-md border border-gray-300 p-2"
              />
            </div>
          </div>
        )}

        <Button
          onClick={handleAddToCart}
          className="w-full bg-corail-intensifie text-white hover:bg-corail-doux md:w-auto"
          disabled={!selectedVariant || selectedVariant.stock === 0}
        >
          {selectedVariant && selectedVariant.stock === 0 ? "Rupture de stock" : "Ajouter au panier"}
        </Button>
      </div>
    </div>
  )
}
