import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { getCategories } from "@/lib/data" // Use the new data fetching

export const metadata = {
  title: "Catégories - KreShop",
  description: "Explorez les différentes catégories de produits chez KreShop.",
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-brun-chocolat">Nos Catégories</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <Link href={`/categories/${category.slug}`} className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">Voir la catégorie {category.nom}</span>
            </Link>
            <Image
              src={category.url_image || "/placeholder.svg?height=200&width=200&query=category"}
              alt={category.nom}
              width={300}
              height={200}
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-4 text-center">
              <h3 className="text-xl font-semibold text-brun-chocolat">{category.nom}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
