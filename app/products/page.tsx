import { Suspense } from "react"
import { ProductGrid } from "@/components/product-grid"
import { getProducts } from "@/lib/data" // Use the new data fetching
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Tous les produits - KreShop",
  description: "Découvrez tous les produits disponibles chez KreShop.",
}

export default async function ProductsPage() {
  const { products } = await getProducts() // Fetch all products

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-brun-chocolat">Nos Produits</h1>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-[300px] w-full rounded-lg" />
            ))}
          </div>
        }
      >
        <ProductGrid products={products} />
      </Suspense>
    </div>
  )
}
