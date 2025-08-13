import { Suspense } from "react"
import { ProductGrid } from "@/components/product-grid"
import { getProductsByCategorySlug, getCategoryBySlugData } from "@/lib/data" // Use the new data fetching
import { Skeleton } from "@/components/ui/skeleton"

interface CategoryPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlugData(slug)
  return {
    title: category ? `${category.nom} - KreShop` : "Catégorie non trouvée - KreShop",
    description: category?.description || `Produits de la catégorie ${category?.nom}.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlugData(slug)
  const products = await getProductsByCategorySlug(slug)

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-brun-chocolat">
        <h1 className="mb-4 text-4xl font-bold">Catégorie non trouvée</h1>
        <p className="text-lg">Désolé, cette catégorie n&apos;existe pas ou a été supprimée.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-brun-chocolat">{category.nom}</h1>
      {category.description && <p className="mb-8 text-center text-lg text-gray-700">{category.description}</p>}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[300px] w-full rounded-lg" />
            ))}
          </div>
        }
      >
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="text-center text-brun-chocolat">Aucun produit trouvé dans cette catégorie pour le moment.</p>
        )}
      </Suspense>
    </div>
  )
}
