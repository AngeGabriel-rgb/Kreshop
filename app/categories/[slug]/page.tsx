import { notFound } from "next/navigation"

import { ProductGrid } from "@/components/product-grid"
import { fetchCategories, type Categorie } from "@/lib/api"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params // Déstructuration explicite du slug
  const categories: Categorie[] = await fetchCategories()
  const category = categories.find((cat) => cat.slug === slug) // Utilisation du slug déstructuré

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">
        Catégorie: {category.nom}
      </h1>
      <p className="mb-6 text-lg text-muted-foreground">
        {category.description || `Explorez tous les produits de notre catégorie ${category.nom}.`}
      </p>
      {/* In a real app, you'd fetch products by category ID/slug */}
      <ProductGrid title="Produits de cette catégorie" />
    </div>
  )
}
