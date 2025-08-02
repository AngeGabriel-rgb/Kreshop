"use client"

import * as React from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { ShoppingCart, Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { fetchProduitById, type Produit } from "@/lib/api"
import { Input } from "@/components/ui/input"

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { toast } = useToast()

  const [product, setProduct] = React.useState<Produit | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null)
  const [selectedColor, setSelectedColor] = React.useState<string>("")
  const [selectedSize, setSelectedSize] = React.useState<string>("")
  const [quantity, setQuantity] = React.useState(1)

  React.useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true)
        // In a real app, you'd fetch by slug. For mock, we'll use a dummy ID.
        // Assuming slug might contain an ID or we can derive one for mock purposes.
        // For now, let's just use a fixed ID or parse from slug if it's like "product-mock-1"
        const productId = Number.parseInt(slug.split("-").pop() || "1")
        const data = await fetchProduitById(productId)
        setProduct(data)
        setSelectedImage(data.images[0]?.url || null)
        if (data.variantes.length > 0) {
          setSelectedColor(data.variantes[0].couleur)
          setSelectedSize(data.variantes[0].taille)
        }
      } catch (err) {
        setError("Échec du chargement du produit.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    getProduct()
  }, [slug])

  const handleAddToCart = () => {
    if (!product) return

    const currentCart = JSON.parse(localStorage.getItem("kreshop_cart") || "[]")
    const existingItemIndex = currentCart.findIndex((item: any) => item.id === product.id)

    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += quantity
    } else {
      currentCart.push({
        id: product.id,
        name: product.nom,
        price: product.prix_fcfa,
        quantity: quantity,
        image: product.images[0]?.url || "/placeholder.svg?height=200&width=200&text=Produit",
        color: selectedColor,
        size: selectedSize,
      })
    }
    localStorage.setItem("kreshop_cart", JSON.stringify(currentCart))

    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x ${product.nom} a été ajouté à votre panier.`,
    })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <Skeleton className="h-[400px] w-full rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-20 w-20 rounded-md" />
            <Skeleton className="h-20 w-20 rounded-md" />
            <Skeleton className="h-20 w-20 rounded-md" />
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex h-96 items-center justify-center text-destructive">
        <p>{error || "Produit non trouvé."}</p>
      </div>
    )
  }

  const availableColors = Array.from(new Set(product.variantes.map((v) => v.couleur)))
  const availableSizes = Array.from(new Set(product.variantes.map((v) => v.taille)))

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Product Images */}
      <div className="flex flex-col gap-4">
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg border">
          {selectedImage && (
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt={product.nom}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
            />
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {product.images.map((img, index) => (
            <Button
              key={index}
              variant="outline"
              size="icon"
              className={`relative h-20 w-20 shrink-0 rounded-md ${selectedImage === img.url ? "border-2 border-primary" : ""}`}
              onClick={() => setSelectedImage(img.url)}
            >
              <Image
                src={img.url || "/placeholder.svg"}
                alt={`${product.nom} - Vue ${index + 1}`}
                fill
                className="object-cover"
              />
              <span className="sr-only">Voir l'image {index + 1}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">{product.nom}</h1>
        <p className="text-3xl font-bold text-primary">
          {product.prix_fcfa.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}
        </p>
        {product.prix_comparaison_fcfa && (
          <p className="text-lg text-muted-foreground line-through">
            {product.prix_comparaison_fcfa.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}
          </p>
        )}

        <p className="text-muted-foreground">{product.description_courte}</p>

        <Separator />

        {/* Variants Selection */}
        {product.variantes.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Couleur</h3>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une couleur" />
                </SelectTrigger>
                <SelectContent>
                  {availableColors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Taille</h3>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une taille" />
                </SelectTrigger>
                <SelectContent>
                  {availableSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
              className="w-16 text-center"
            />
            <Button variant="outline" size="icon" onClick={() => setQuantity((prev) => prev + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button className="flex-1 bg-corail-doux hover:bg-corail-intensifie" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Ajouter au panier
          </Button>
        </div>

        <Separator />

        {/* Full Description */}
        <div>
          <h3 className="mb-2 text-xl font-semibold font-serif">Description Détaillée</h3>
          <p className="text-muted-foreground">{product.description}</p>
        </div>

        {/* Placeholder for Reviews/Suggestions */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold font-serif">Avis Clients</h3>
          <p className="text-muted-foreground">Pas encore d'avis. Soyez le premier !</p>
          <h3 className="text-xl font-semibold font-serif">Produits Similaires</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Placeholder for similar products */}
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
