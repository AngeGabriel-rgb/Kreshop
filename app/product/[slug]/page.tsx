"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import { notFound, useParams } from "next/navigation" // Import useParams
import { Minus, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { fetchProductBySlug } from "@/lib/api"
import { addToCart } from "@/lib/cart" // Import the addToCart function

interface ProductImage {
  id: number
  url: string
  est_principale: boolean
  ordre_tri: number
}

interface ProductVariant {
  id: number
  couleur?: string
  taille?: string
  stock: number
  prix_supplementaire: number
  images?: ProductImage[]
}

interface Product {
  id: number
  nom: string
  slug: string
  description: string
  prix_fcfa: number
  est_actif: boolean
  categorie: {
    nom: string
    slug: string
  }
  images: ProductImage[]
  variantes: ProductVariant[]
  avis_clients: {
    id: number
    note: number
    commentaire: string
    date_creation: string
    client: {
      prenom: string
      nom: string
    }
  }[]
}

export default function ProductDetailPage() {
  // Remove params from props
  const params = useParams()
  const slug = params.slug as string // Get slug using useParams
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined)
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined)
  const [mainImage, setMainImage] = useState<string | undefined>(undefined)

  useEffect(() => {
    const getProduct = async () => {
      if (!slug) return // Ensure slug is available
      try {
        setLoading(true)
        const response = await fetchProductBySlug(slug)
        if (response.success && response.data) {
          setProduct(response.data)
          // Set initial main image
          const primaryImage = response.data.images.find((img) => img.est_principale) || response.data.images[0]
          setMainImage(primaryImage?.url || "/placeholder.svg")

          // Set default selected variant if available
          if (response.data.variantes && response.data.variantes.length > 0) {
            const defaultVariant = response.data.variantes[0]
            setSelectedColor(defaultVariant.couleur)
            setSelectedSize(defaultVariant.taille)
          }
        } else {
          notFound()
        }
      } catch (error) {
        console.error("Failed to fetch product:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }
    getProduct()
  }, [slug])

  useEffect(() => {
    if (product && product.variantes.length > 0) {
      const currentVariant = product.variantes.find(
        (v) =>
          (selectedColor ? v.couleur === selectedColor : true) && (selectedSize ? v.taille === selectedSize : true),
      )
      if (currentVariant && currentVariant.images && currentVariant.images.length > 0) {
        setMainImage(currentVariant.images[0].url)
      } else {
        const primaryImage = product.images.find((img) => img.est_principale) || product.images[0]
        setMainImage(primaryImage?.url || "/placeholder.svg")
      }
    }
  }, [selectedColor, selectedSize, product])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedColor, selectedSize)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>Chargement du produit...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>Produit non trouvé.</p>
      </div>
    )
  }

  const availableColors = Array.from(new Set(product.variantes.map((v) => v.couleur).filter(Boolean))) as string[]
  const availableSizes = Array.from(new Set(product.variantes.map((v) => v.taille).filter(Boolean))) as string[]

  const currentPrice =
    product.prix_fcfa +
    (product.variantes.find((v) => v.couleur === selectedColor && v.taille === selectedSize)?.prix_supplementaire || 0)

  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <div className="flex flex-col items-center">
          <div className="relative h-[400px] w-full max-w-[400px] overflow-hidden rounded-lg shadow-lg">
            <Image
              src={mainImage || "/placeholder.svg"}
              alt={product.nom}
              fill
              style={{ objectFit: "contain" }}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {product.images.map((img) => (
              <Button
                key={img.id}
                variant="outline"
                size="icon"
                className={`h-20 w-20 flex-shrink-0 ${mainImage === img.url ? "ring-2 ring-corail-intensifie" : ""}`}
                onClick={() => setMainImage(img.url)}
              >
                <Image
                  src={img.url || "/placeholder.svg"}
                  alt={product.nom}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
              </Button>
            ))}
            {product.variantes.map((variant) =>
              variant.images?.map((img) => (
                <Button
                  key={img.id}
                  variant="outline"
                  size="icon"
                  className={`h-20 w-20 flex-shrink-0 ${mainImage === img.url ? "ring-2 ring-corail-intensifie" : ""}`}
                  onClick={() => setMainImage(img.url)}
                >
                  <Image
                    src={img.url || "/placeholder.svg"}
                    alt={product.nom}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                </Button>
              )),
            )}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">{product.nom}</h1>
            <p className="text-lg text-primary font-semibold mt-2">
              {currentPrice.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}
            </p>
            <p className="text-muted-foreground mt-2">{product.description}</p>
          </div>

          {availableColors.length > 0 && (
            <div>
              <Label htmlFor="color" className="text-lg font-semibold">
                Couleur:
              </Label>
              <RadioGroup
                id="color"
                value={selectedColor}
                onValueChange={setSelectedColor}
                className="mt-2 flex flex-wrap gap-2"
              >
                {availableColors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <RadioGroupItem value={color} id={`color-${color}`} />
                    <Label htmlFor={`color-${color}`}>{color}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {availableSizes.length > 0 && (
            <div>
              <Label htmlFor="size" className="text-lg font-semibold">
                Taille:
              </Label>
              <RadioGroup
                id="size"
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="mt-2 flex flex-wrap gap-2"
              >
                {availableSizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <RadioGroupItem value={size} id={`size-${size}`} />
                    <Label htmlFor={`size-${size}`}>{size}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          <div className="flex items-center gap-4">
            <Label htmlFor="quantity" className="text-lg font-semibold">
              Quantité:
            </Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center text-lg font-medium">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button className="w-full bg-corail-doux hover:bg-corail-intensifie py-6 text-lg" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Ajouter au panier
          </Button>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle>Avis Clients</CardTitle>
              <CardDescription>Ce que nos clients pensent de ce produit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {product.avis_clients && product.avis_clients.length > 0 ? (
                product.avis_clients.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {review.client.prenom} {review.client.nom}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        - {new Date(review.date_creation).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} className={`h-4 w-4 ${i < review.note ? "fill-current" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <p className="mt-2 text-sm">{review.commentaire}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">Aucun avis pour le moment.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
