"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingBag, Star, Eye } from "lucide-react"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
  viewMode: "grid" | "list"
  onProductClick: (product: Product) => void
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, viewMode, onProductClick, onAddToCart }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    onAddToCart(product)
    setIsLoading(false)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("XAF", "FCFA")
  }

  if (viewMode === "list") {
    return (
      <Card
        className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-taupe-rose/30 hover:border-corail-doux/50"
        onClick={() => onProductClick(product)}
      >
        <CardContent className="p-0">
          <div className="flex">
            {/* Image */}
            <div className="relative w-48 h-48 flex-shrink-0">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover rounded-l-lg"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.isNew && <Badge className="bg-corail-doux text-white text-xs px-2 py-1">Nouveau</Badge>}
                {product.originalPrice && (
                  <Badge className="bg-brun-espresso text-white text-xs px-2 py-1">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </Badge>
                )}
                {!product.inStock && <Badge className="bg-gray-500 text-white text-xs px-2 py-1">Rupture</Badge>}
              </div>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsLiked(!isLiked)
                }}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  <div className="flex items-center text-sm text-taupe-fonce">
                    <Star className="w-4 h-4 fill-or-dore text-or-dore mr-1" />
                    <span>{product.rating}</span>
                    <span className="ml-1">({product.reviews})</span>
                  </div>
                </div>

                <h3 className="font-semibold text-lg text-brun-chocolat mb-2 group-hover:text-corail-doux transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-corail-doux">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-taupe-fonce line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-taupe-fonce mb-4">
                  <div>
                    <span className="font-medium">Couleurs:</span> {product.colors.join(", ")}
                  </div>
                  <div>
                    <span className="font-medium">Tailles:</span> {product.sizes.join(", ")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isLoading}
                  className="flex-1 bg-corail-doux hover:bg-corail-intensifie text-white disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <ShoppingBag className="w-4 h-4 mr-2" />
                  )}
                  {!product.inStock ? "Rupture de stock" : "Ajouter au panier"}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="border-taupe-rose text-taupe-fonce hover:bg-beige-rose bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation()
                    onProductClick(product)
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-taupe-rose/30 hover:border-corail-doux/50 overflow-hidden"
      onClick={() => onProductClick(product)}
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <Button
                size="icon"
                className="bg-white text-brun-chocolat hover:bg-corail-doux hover:text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  onProductClick(product)
                }}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                className="bg-white text-brun-chocolat hover:bg-corail-doux hover:text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsLiked(!isLiked)
                }}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge className="bg-corail-doux text-white text-xs px-2 py-1">Nouveau</Badge>}
            {product.originalPrice && (
              <Badge className="bg-brun-espresso text-white text-xs px-2 py-1">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </Badge>
            )}
            {!product.inStock && <Badge className="bg-gray-500 text-white text-xs px-2 py-1">Rupture</Badge>}
          </div>

          {/* Wishlist */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation()
              setIsLiked(!isLiked)
            }}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            <div className="flex items-center text-sm text-taupe-fonce">
              <Star className="w-4 h-4 fill-or-dore text-or-dore mr-1" />
              <span>{product.rating}</span>
              <span className="ml-1">({product.reviews})</span>
            </div>
          </div>

          <h3 className="font-semibold text-brun-chocolat mb-2 group-hover:text-corail-doux transition-colors line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-corail-doux">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-taupe-fonce line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || isLoading}
            className="w-full bg-corail-doux hover:bg-corail-intensifie text-white disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <ShoppingBag className="w-4 h-4 mr-2" />
            )}
            {!product.inStock ? "Rupture de stock" : "Ajouter au panier"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
