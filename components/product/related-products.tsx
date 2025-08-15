import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, Star } from "lucide-react"

interface RelatedProductsProps {
  currentProductId: number
  category: string
}

const mockRelatedProducts = [
  {
    id: 2,
    name: "Chemise Homme Coton Bio",
    price: 25000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Homme",
    rating: 4.5,
    reviews: 18,
    isNew: false,
  },
  {
    id: 3,
    name: "Collier Perles Dorées",
    price: 15000,
    originalPrice: 20000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessoires",
    rating: 4.9,
    reviews: 32,
    isNew: false,
  },
  {
    id: 5,
    name: "Pantalon Femme Taille Haute",
    price: 32000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Femme",
    rating: 4.7,
    reviews: 28,
    isNew: false,
  },
  {
    id: 6,
    name: "Sac à Main Cuir Véritable",
    price: 65000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessoires",
    rating: 4.9,
    reviews: 45,
    isNew: true,
  },
]

function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("fr-FR", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price) + " FCFA"
  )
}

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const relatedProducts = mockRelatedProducts.filter((product) => product.id !== currentProductId).slice(0, 4)

  return (
    <section className="py-16">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Produits similaires</h2>
        <p className="text-muted-foreground">Découvrez d'autres produits qui pourraient vous plaire</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.isNew && (
                  <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">Nouveau</Badge>
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="outline" size="icon" className="bg-background/80 hover:bg-background">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 space-y-3">
              <div className="w-full">
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-secondary text-secondary" />
                    <span className="text-sm ml-1">{product.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="price-fcfa text-primary text-lg">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2 w-full">
                <Button asChild variant="outline" className="flex-1 bg-transparent">
                  <Link href={`/produit/${product.id}`}>Voir</Link>
                </Button>
                <Button className="btn-primary flex-1">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Ajouter
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button asChild variant="outline" size="lg">
          <Link href="/produits">Voir plus de produits</Link>
        </Button>
      </div>
    </section>
  )
}
