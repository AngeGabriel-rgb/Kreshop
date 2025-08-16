import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Star } from "lucide-react"

const recommendedProducts = [
  {
    id: 7,
    name: "Écharpe Soie Motifs Africains",
    price: 2000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbdAb3kG-Slnfvqwp_jyTMyi1jzzBX09n0EQ&s",
    category: "Accessoires",
    rating: 4.6,
    reviews: 15,
  },
  {
    id: 8,
    name: "Bracelet Cuir Tressé",
    price: 5000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT72DZ7yZpK5fV-I8n9xTjdVWS21OTYJy2a7g&s",
    category: "Accessoires",
    rating: 4.4,
    reviews: 22,
  },
  {
    id: 9,
    name: "Ceinture Cuir Véritable",
    price: 5000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Qvkl92bWgTrSjL7z2k7ckUPNzJZSz1-wig&s",
    category: "Accessoires",
    rating: 4.8,
    reviews: 31,
  },
  {
    id: 10,
    name: "Boucles d'Oreilles Dorées",
    price: 3000,
    image: "https://www.gigiclozeau.fr/cdn/shop/products/gigi-clozeau_boucles-doreilles-soleil-or-jaune_b4so001j00xxxx_i1_3110a598-4ac3-4cdb-a7d7-84aabc6c6d2e.jpg?v=1740752716",
    category: "Accessoires",
    rating: 4.7,
    reviews: 18,
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

export function RecommendedProducts() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Vous pourriez aussi aimer</h2>
        <p className="text-muted-foreground">Complétez votre look avec ces accessoires</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </CardContent>
            <CardFooter className="p-4 space-y-3">
              <div className="w-full">
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <h3 className="font-semibold leading-tight">{product.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-secondary text-secondary" />
                    <span className="text-sm ml-1">{product.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="price-fcfa text-primary text-lg">{formatPrice(product.price)}</span>
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
    </section>
  )
}
