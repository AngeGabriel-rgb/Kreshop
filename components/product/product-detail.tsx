"use client"

import { useState } from "react"
import { ProductGallery } from "./product-gallery"
import { ProductInfo } from "./product-info"
import { ProductReviews } from "./product-reviews"
import { SizeGuide } from "./size-guide"
import { ShareButtons } from "./share-buttons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductDetailProps {
  product: {
    id: number
    name: string
    price: number
    originalPrice?: number
    description: string
    images: string[]
    category: string
    brand: string
    sku: string
    variants: {
      colors: Array<{ name: string; value: string; available: boolean }>
      sizes: Array<{ name: string; available: boolean; stock: number }>
    }
    features: string[]
    inStock: boolean
    rating: number
    reviewCount: number
    tags: string[]
  }
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(product.variants.colors.find((c) => c.available)?.name || "")
  const [selectedSize, setSelectedSize] = useState("")

  return (
    <div className="space-y-8">
      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductGallery images={product.images} productName={product.name} />
        <ProductInfo
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          onColorChange={setSelectedColor}
          onSizeChange={setSelectedSize}
        />
      </div>

      {/* Share Buttons */}
      <ShareButtons product={product} />

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="features">Caractéristiques</TabsTrigger>
          <TabsTrigger value="size-guide">Guide des tailles</TabsTrigger>
          <TabsTrigger value="reviews">Avis ({product.reviewCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <div className="prose max-w-none">
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Informations produit</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Marque:</span> {product.brand}
                </div>
                <div>
                  <span className="font-medium">Référence:</span> {product.sku}
                </div>
                <div>
                  <span className="font-medium">Catégorie:</span> {product.category}
                </div>
                <div>
                  <span className="font-medium">Disponibilité:</span>{" "}
                  <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                    {product.inStock ? "En stock" : "Rupture de stock"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="features" className="mt-6">
          <div className="space-y-3">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="size-guide" className="mt-6">
          <SizeGuide category={product.category} />
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <ProductReviews productId={product.id} rating={product.rating} reviewCount={product.reviewCount} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
