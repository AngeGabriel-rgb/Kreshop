"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shirt, Watch, Gem, Footprints } from "lucide-react" // Import relevant icons

export default function CategoriesPage() {
  // Mock data for categories - replace with actual data fetching
  const categories = [
    {
      id: "1",
      name: "Vêtements Traditionnels",
      description: "Découvrez l'élégance des tenues gabonaises.",
      image: "/placeholder.svg?height=200&width=300",
      icon: Shirt,
    },
    {
      id: "2",
      name: "Accessoires Uniques",
      description: "Bijoux, sacs et plus pour compléter votre look.",
      image: "/placeholder.svg?height=200&width=300",
      icon: Gem,
    },
    {
      id: "3",
      name: "Chaussures Artisanales",
      description: "Confort et style avec nos créations faites main.",
      image: "/placeholder.svg?height=200&width=300",
      icon: Footprints,
    },
    {
      id: "4",
      name: "Mode Moderne",
      description: "Fusion de la tradition et des tendances actuelles.",
      image: "/placeholder.svg?height=200&width=300",
      icon: Watch, // Using Watch as a generic icon for modern
    },
  ]

  return (
    <>
      <Header />
      <main className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Explorez Nos Catégories</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Plongez dans l'univers de KreShop et trouvez la pièce parfaite qui raconte votre histoire.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                />
                <CardHeader className="p-4">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    {category.icon && <category.icon className="h-5 w-5 text-primary" />}
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-muted-foreground mb-4 text-sm">{category.description}</p>
                  <Button asChild className="w-full">
                    <Link href={`/categories/${category.id}`}>Voir les produits</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
