"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Star, Heart, Share2, Truck, Shield, RotateCcw, Plus, Minus } from "lucide-react"
import type { Product } from "@/types/product"

interface ProductModalProps {
  product: Product
  onClose: () => void
  onAddToCart: (product: Product, quantity: number) => void
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("XAF", "FCFA")
  }

  const handleAddToCart = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    onAddToCart(product, quantity)
    setIsLoading(false)
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-white z-50 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-beige-rose">
            <div className="flex items-center gap-3">
              <Badge variant="secondary">{product.category}</Badge>
              <div className="flex items-center text-sm text-taupe-fonce">
                <Star className="w-4 h-4 fill-or-dore text-or-dore mr-1" />
                <span>{product.rating}</span>
                <span className="ml-1">({product.reviews} avis)</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid lg:grid-cols-2 gap-8 p-6">
              {/* Image Section */}
              <div className="space-y-4">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-beige-creme">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && <Badge className="bg-corail-doux text-white">Nouveau</Badge>}
                    {product.originalPrice && (
                      <Badge className="bg-brun-espresso text-white">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white/80 hover:bg-white"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                    </Button>
                    <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg overflow-hidden bg-beige-creme border-2 border-transparent hover:border-corail-doux cursor-pointer"
                    >
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={`${product.name} ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="font-display text-2xl lg:text-3xl font-bold text-brun-chocolat mb-2">
                    {product.name}
                  </h1>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-corail-doux">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-taupe-fonce line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <Badge className={`${product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {product.inStock ? "En stock" : "Rupture de stock"}
                    </Badge>
                  </div>

                  <p className="text-taupe-fonce leading-relaxed">
                    Découvrez cette pièce exceptionnelle de notre collection, alliant tradition gabonaise et modernité.
                    Confectionnée avec des matériaux de qualité premium, elle vous accompagnera avec élégance dans
                    toutes vos occasions.
                  </p>
                </div>

                <Separator />

                {/* Color Selection */}
                <div>
                  <h3 className="font-semibold text-brun-chocolat mb-3">
                    Couleur: <span className="font-normal text-corail-doux">{selectedColor}</span>
                  </h3>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedColor(color)}
                        className={
                          selectedColor === color
                            ? "bg-corail-doux text-white"
                            : "border-taupe-rose text-brun-chocolat hover:bg-beige-rose"
                        }
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="font-semibold text-brun-chocolat mb-3">
                    Taille: <span className="font-normal text-corail-doux">{selectedSize}</span>
                  </h3>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                        className={
                          selectedSize === size
                            ? "bg-corail-doux text-white"
                            : "border-taupe-rose text-brun-chocolat hover:bg-beige-rose"
                        }
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="font-semibold text-brun-chocolat mb-3">Quantité</h3>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="border-taupe-rose"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold text-brun-chocolat">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="border-taupe-rose"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Trust Signals */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Truck className="w-6 h-6 text-corail-doux" />
                    <span className="text-xs text-taupe-fonce">Livraison 24-48h</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <RotateCcw className="w-6 h-6 text-corail-doux" />
                    <span className="text-xs text-taupe-fonce">Retour 14 jours</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Shield className="w-6 h-6 text-corail-doux" />
                    <span className="text-xs text-taupe-fonce">Paiement sécurisé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-beige-rose p-6">
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 border-corail-doux text-corail-doux hover:bg-corail-doux hover:text-white bg-transparent"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                Ajouter aux favoris
              </Button>

              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || isLoading}
                className="flex-1 bg-corail-doux hover:bg-corail-intensifie text-white disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                {!product.inStock ? "Rupture de stock" : "Ajouter au panier"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
