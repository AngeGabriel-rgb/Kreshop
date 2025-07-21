"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Ruler,
  MessageCircle,
  ThumbsUp,
  ShoppingBag,
  Facebook,
  Twitter,
  Copy,
  Check,
} from "lucide-react"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/types/product"

interface ProductDetailViewProps {
  product: Product & {
    description: string
    features: string[]
    materials: string[]
    careInstructions: string[]
    sizeGuide: { [key: string]: string }
    reviews: Array<{
      id: string
      user: string
      rating: number
      comment: string
      date: string
      verified: boolean
    }>
    relatedProducts: Product[]
  }
  onAddToCart: (product: Product, quantity: number) => void
}

export function ProductDetailView({ product, onAddToCart }: ProductDetailViewProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

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
    await new Promise((resolve) => setTimeout(resolve, 800))
    onAddToCart(product, quantity)
    setIsLoading(false)
  }

  const handleShare = async (platform: string) => {
    const url = window.location.href
    const text = `Découvrez ${product.name} sur GabonStyle`

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
        break
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          "_blank",
        )
        break
      case "copy":
        await navigator.clipboard.writeText(url)
        setCopiedLink(true)
        setTimeout(() => setCopiedLink(false), 2000)
        break
    }
  }

  const images = [product.image, product.image, product.image, product.image] // Simulation de plusieurs images

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-taupe-fonce mb-8">
        <a href="/" className="hover:text-corail-doux">
          Accueil
        </a>
        <span>/</span>
        <a href="/products" className="hover:text-corail-doux">
          {product.category}
        </a>
        <span>/</span>
        <span className="text-brun-chocolat font-medium">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Galerie d'Images */}
        <div className="space-y-4">
          {/* Image Principale */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-beige-creme">
            <img
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Navigation Images */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && <Badge className="bg-corail-doux text-white">Nouveau</Badge>}
              {product.originalPrice && (
                <Badge className="bg-brun-espresso text-white">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </Badge>
              )}
            </div>

            {/* Actions Rapides */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/80 hover:bg-white"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                <Share2 className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  currentImageIndex === index ? "border-corail-doux" : "border-transparent hover:border-taupe-rose"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Informations Produit */}
        <div className="space-y-6">
          {/* En-tête */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="secondary">{product.category}</Badge>
              <div className="flex items-center text-sm text-taupe-fonce">
                <Star className="w-4 h-4 fill-or-dore text-or-dore mr-1" />
                <span className="font-medium">{product.rating}</span>
                <span className="ml-1">({product.reviews.length} avis)</span>
              </div>
            </div>

            <h1 className="font-display text-3xl lg:text-4xl font-bold text-brun-chocolat mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-corail-doux">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-taupe-fonce line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              <Badge className={`${product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {product.inStock ? "En stock" : "Rupture de stock"}
              </Badge>
            </div>

            <p className="text-taupe-fonce leading-relaxed text-lg">{product.description}</p>
          </div>

          <Separator />

          {/* Sélection Couleur */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-brun-chocolat">
                Couleur: <span className="font-normal text-corail-doux">{selectedColor}</span>
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? "default" : "outline"}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 ${
                    selectedColor === color
                      ? "bg-corail-doux text-white border-corail-doux"
                      : "border-taupe-rose text-brun-chocolat hover:bg-beige-rose bg-transparent"
                  }`}
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>

          {/* Sélection Taille */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-brun-chocolat">
                Taille: <span className="font-normal text-corail-doux">{selectedSize}</span>
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="text-corail-doux hover:text-corail-intensifie"
              >
                <Ruler className="w-4 h-4 mr-1" />
                Guide des tailles
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 ${
                    selectedSize === size
                      ? "bg-corail-doux text-white border-corail-doux"
                      : "border-taupe-rose text-brun-chocolat hover:bg-beige-rose bg-transparent"
                  }`}
                >
                  {size}
                </Button>
              ))}
            </div>

            {/* Guide des Tailles */}
            {showSizeGuide && (
              <Card className="mt-4 border-corail-doux/20">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-brun-chocolat mb-3">Guide des Tailles</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(product.sizeGuide).map(([size, measurements]) => (
                      <div key={size} className="flex">
                        <span className="font-medium text-corail-doux w-8">{size}:</span>
                        <span className="text-taupe-fonce">{measurements}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Quantité */}
          <div>
            <h3 className="font-semibold text-brun-chocolat mb-3">Quantité</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-taupe-rose rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-12 w-12"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-16 text-center font-semibold text-brun-chocolat">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-12 w-12">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <span className="text-sm text-taupe-fonce">
                Total: <span className="font-semibold text-corail-doux">{formatPrice(product.price * quantity)}</span>
              </span>
            </div>
          </div>

          <Separator />

          {/* Actions Principales */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || isLoading}
                className="flex-1 bg-corail-doux hover:bg-corail-intensifie text-white py-4 text-lg font-semibold disabled:opacity-50"
                size="lg"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <ShoppingBag className="w-5 h-5 mr-2" />
                )}
                {!product.inStock ? "Rupture de stock" : "Ajouter au panier"}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-corail-doux text-corail-doux hover:bg-corail-doux hover:text-white bg-transparent"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Partage */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-brun-chocolat">Partager:</span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleShare("facebook")}
                  className="text-blue-600 hover:bg-blue-50"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleShare("twitter")}
                  className="text-blue-400 hover:bg-blue-50"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleShare("copy")}
                  className="text-taupe-fonce hover:bg-beige-rose"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Garanties */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center gap-2 p-4 bg-beige-creme rounded-lg">
              <Truck className="w-6 h-6 text-corail-doux" />
              <span className="text-sm font-medium text-brun-chocolat">Livraison 24-48h</span>
              <span className="text-xs text-taupe-fonce">Gratuite dès 50 000 FCFA</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 p-4 bg-beige-creme rounded-lg">
              <RotateCcw className="w-6 h-6 text-corail-doux" />
              <span className="text-sm font-medium text-brun-chocolat">Retour 14 jours</span>
              <span className="text-xs text-taupe-fonce">Satisfait ou remboursé</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 p-4 bg-beige-creme rounded-lg">
              <Shield className="w-6 h-6 text-corail-doux" />
              <span className="text-sm font-medium text-brun-chocolat">Paiement sécurisé</span>
              <span className="text-xs text-taupe-fonce">Mobile Money & E-BILLING</span>
            </div>
          </div>
        </div>
      </div>

      {/* Onglets Détails */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="grid w-full grid-cols-4 bg-beige-creme">
          <TabsTrigger
            value="description"
            className="data-[state=active]:bg-corail-doux data-[state=active]:text-white"
          >
            Description
          </TabsTrigger>
          <TabsTrigger value="features" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            Caractéristiques
          </TabsTrigger>
          <TabsTrigger value="care" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            Entretien
          </TabsTrigger>
          <TabsTrigger value="reviews" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            Avis ({product.reviews.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                <p className="text-taupe-fonce leading-relaxed mb-4">{product.description}</p>
                <h4 className="font-semibold text-brun-chocolat mb-3">Caractéristiques principales:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-taupe-fonce">
                      <div className="w-2 h-2 bg-corail-doux rounded-full mt-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-brun-chocolat mb-3">Matériaux</h4>
                  <ul className="space-y-2">
                    {product.materials.map((material, index) => (
                      <li key={index} className="text-taupe-fonce">
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-brun-chocolat mb-3">Détails</h4>
                  <ul className="space-y-2">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-taupe-fonce">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="care" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-brun-chocolat mb-4">Instructions d'entretien</h4>
              <div className="space-y-3">
                {product.careInstructions.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-beige-creme rounded-lg">
                    <div className="w-6 h-6 bg-corail-doux rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-taupe-fonce">{instruction}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            {/* Résumé des avis */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-corail-doux">{product.rating}</div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= product.rating ? "fill-or-dore text-or-dore" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-taupe-fonce">{product.reviews.length} avis</div>
                  </div>
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = product.reviews.filter((r) => Math.floor(r.rating) === rating).length
                      const percentage = (count / product.reviews.length) * 100
                      return (
                        <div key={rating} className="flex items-center gap-2 mb-1">
                          <span className="text-sm w-8">{rating}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-or-dore h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="text-sm text-taupe-fonce w-8">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <Button className="w-full bg-corail-doux hover:bg-corail-intensifie text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Écrire un avis
                </Button>
              </CardContent>
            </Card>

            {/* Liste des avis */}
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-corail-doux rounded-full flex items-center justify-center text-white font-semibold">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-brun-chocolat">{review.user}</span>
                            {review.verified && (
                              <Badge className="bg-green-100 text-green-800 text-xs">Achat vérifié</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= review.rating ? "fill-or-dore text-or-dore" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-taupe-fonce">
                        {new Date(review.date).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <p className="text-taupe-fonce leading-relaxed mb-3">{review.comment}</p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-taupe-fonce hover:text-corail-doux">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        Utile
                      </Button>
                      <Button variant="ghost" size="sm" className="text-taupe-fonce hover:text-corail-doux">
                        Répondre
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Produits Similaires */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl font-bold text-brun-chocolat">Produits Similaires</h2>
          <Button
            variant="outline"
            className="border-corail-doux text-corail-doux hover:bg-corail-doux hover:text-white bg-transparent"
          >
            Voir tout
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              product={relatedProduct}
              viewMode="grid"
              onProductClick={() => {}}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
