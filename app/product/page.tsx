"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/types/product"
import { ShoppingBag, Heart } from "lucide-react"

export default function ProductsPage() {
  const { addToCart } = useCart()

  // Mock data for products - replace with actual data fetching
  const products: Product[] = [
    {
      id: "prod1",
      name: "T-shirt Africain",
      price: 20000,
      image: "/placeholder.svg?height=300&width=400",
      description: "Un t-shirt en coton bio avec des motifs africains modernes.",
      category: "Mode Moderne",
      inStock: true,
      isNew: false,
      rating: 0,
      reviews: 0,
      colors: [],
      sizes: []
    },
    {
      id: "prod2",
      name: "Collier Perles Africaines",
      price: 15000,
      image: "/placeholder.svg?height=300&width=400",
      description: "Un collier unique fait à la main avec des perles colorées.",
      category: "Accessoires Uniques",
      inStock: true,
      isNew: false,
      rating: 0,
      reviews: 0,
      colors: [],
      sizes: []
    },
    {
      id: "prod3",
      name: "Sandales Cuir Tressé",
      price: 35000,
      image: "/placeholder.svg?height=300&width=400",
      description: "Sandales confortables en cuir tressé, parfaites pour l'été.",
      category: "Chaussures Artisanales",
      inStock: false,
      isNew: false,
      rating: 0,
      reviews: 0,
      colors: [],
      sizes: []
    },
    {
      id: "prod4",
      name: "Chemise Wax Moderne",
      price: 45000,
      image: "/placeholder.svg?height=300&width=400",
      description: "Chemise moderne avec des imprimés wax vibrants.",
      category: "Mode Moderne",
      inStock: true,
      isNew: false,
      rating: 0,
      reviews: 0,
      colors: [],
      sizes: []
    },
    {
      id: "prod5",
      name: "Sac à Main Bogolan",
      price: 55000,
      image: "/placeholder.svg?height=300&width=400",
      description: "Sac à main en tissu Bogolan, alliant tradition et tendance.",
      category: "Accessoires Uniques",
      inStock: true,
      isNew: false,
      rating: 0,
      reviews: 0,
      colors: [],
      sizes: []
    },
    {
      id: "prod6",
      name: "Ensemble Pagne Brodé",
      price: 90000,
      image: "/placeholder.svg?height=300&width=400",
      description: "Ensemble pagne brodé pour des occasions spéciales.",
      category: "Vêtements Traditionnels",
      inStock: true,
      isNew: false,
      rating: 0,
      reviews: 0,
      colors: [],
      sizes: []
    },
  ]

  const handleAddToCart = (product: Product) => {
    // For demonstration, adding with default size/color. In a real app, these would be selected by user.
    addToCart(product, 1, "Unique", "Standard")
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Nos Derniers Produits</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection unique de produits, alliant tradition et modernité.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-60 object-cover"
                />
                <CardHeader className="p-4 pb-2 flex-grow">
                  <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">{product.price.toLocaleString()} FCFA</span>
                    {!product.inStock && <span className="text-sm text-red-500 font-semibold">Rupture de stock</span>}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <Button onClick={() => handleAddToCart(product)} disabled={!product.inStock} className="flex-1 mr-2">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Ajouter au panier
                  </Button>
                  <Button variant="outline" size="icon" className="bg-transparent">
                    <Heart className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
