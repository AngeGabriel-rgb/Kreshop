"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingBag, Star, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ProductInfoProps {
  product: {
    id: number
    name: string
    price: number
    originalPrice?: number
    variants: {
      colors: Array<{ name: string; value: string; available: boolean }>
      sizes: Array<{ name: string; available: boolean; stock: number }>
    }
    inStock: boolean
    rating: number
    reviewCount: number
  }
  selectedColor: string
  selectedSize: string
  onColorChange: (color: string) => void
  onSizeChange: (size: string) => void
}

function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("fr-FR", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price) + " FCFA"
  )
}

export function ProductInfo({ product, selectedColor, selectedSize, onColorChange, onSizeChange }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const selectedSizeData = product.variants.sizes.find((s) => s.name === selectedSize)
  const canAddToCart = selectedColor && selectedSize && product.inStock && selectedSizeData?.available

  const handleAddToCart = () => {
    if (!canAddToCart) return

    toast({
      title: "Produit ajouté au panier",
      description: `${quantity}x ${product.name} (${selectedColor}, ${selectedSize})`,
    })
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Retiré des favoris" : "Ajouté aux favoris",
      description: product.name,
    })
  }

  return (
    <div className="space-y-6">
      {/* Product Title and Rating */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? "fill-secondary text-secondary" : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              {product.rating} ({product.reviewCount} avis)
            </span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center space-x-3">
        <span className="price-fcfa text-3xl text-primary">{formatPrice(product.price)}</span>
        {product.originalPrice && (
          <span className="text-xl text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
        )}
        {product.originalPrice && (
          <Badge variant="destructive">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </Badge>
        )}
      </div>

      {/* Color Selection */}
      <div className="space-y-3">
        <h3 className="font-semibold">Couleur: {selectedColor}</h3>
        <div className="flex space-x-2">
          {product.variants.colors.map((color) => (
            <button
              key={color.name}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                selectedColor === color.name
                  ? "border-primary scale-110"
                  : "border-muted-foreground hover:border-primary"
              } ${!color.available ? "opacity-50 cursor-not-allowed" : ""}`}
              style={{ backgroundColor: color.value }}
              onClick={() => color.available && onColorChange(color.name)}
              disabled={!color.available}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-3">
        <h3 className="font-semibold">Taille: {selectedSize}</h3>
        <div className="grid grid-cols-4 gap-2">
          {product.variants.sizes.map((size) => (
            <Button
              key={size.name}
              variant={selectedSize === size.name ? "default" : "outline"}
              className={`h-12 ${!size.available ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => size.available && onSizeChange(size.name)}
              disabled={!size.available}
            >
              {size.name}
              {size.available && size.stock <= 3 && size.stock > 0 && (
                <span className="ml-1 text-xs">({size.stock})</span>
              )}
            </Button>
          ))}
        </div>
        {selectedSizeData && selectedSizeData.stock <= 3 && selectedSizeData.stock > 0 && (
          <p className="text-sm text-orange-600">Plus que {selectedSizeData.stock} en stock !</p>
        )}
      </div>

      {/* Quantity */}
      <div className="space-y-3">
        <h3 className="font-semibold">Quantité</h3>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            disabled={selectedSizeData ? quantity >= selectedSizeData.stock : false}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="flex space-x-3">
          <Button className="btn-primary flex-1 h-12" onClick={handleAddToCart} disabled={!canAddToCart}>
            <ShoppingBag className="h-5 w-5 mr-2" />
            {canAddToCart ? "Ajouter au panier" : "Sélectionner les options"}
          </Button>
          <Button variant="outline" size="icon" className="h-12 bg-transparent" onClick={handleWishlist}>
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>

        {!product.inStock && (
          <Button variant="outline" className="w-full h-12 bg-transparent">
            Me notifier quand disponible
          </Button>
        )}
      </div>

      {/* Service Information */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <Truck className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Livraison gratuite</p>
              <p className="text-sm text-muted-foreground">À Libreville dès 50 000 FCFA</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <RotateCcw className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Retours gratuits</p>
              <p className="text-sm text-muted-foreground">30 jours pour changer d'avis</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Paiement sécurisé</p>
              <p className="text-sm text-muted-foreground">Mobile Money et virement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
