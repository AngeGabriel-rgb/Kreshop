import Link from "next/link"
import Image from "next/image"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { fetchCategories, type Categorie } from "@/lib/api"

export default async function CategoriesPage() {
  const categories: Categorie[] = await fetchCategories()

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">Nos Catégories</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`}>
            <Card className="group overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-md">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={category.url_image || `/placeholder.svg?height=300&width=400&text=${category.nom}`}
                  alt={category.nom}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                  <CardTitle className="text-2xl font-bold text-white font-serif">{category.nom}</CardTitle>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {category.description || `Découvrez notre sélection de produits dans la catégorie ${category.nom}.`}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
