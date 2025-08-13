import { Suspense } from "react"
import { getProductBySlug } from "@/lib/data" // Use the new data fetching
import { ProductDetailPageClient } from "./ProductDetailPageClient"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  return {
    title: product ? `${product.nom} - KreShop` : "Produit non trouvé - KreShop",
    description:
      product?.description_seo ||
      product?.description_courte ||
      product?.description ||
      `Détails du produit ${product?.nom}.`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-brun-chocolat">
        <h1 className="mb-4 text-4xl font-bold">Produit non trouvé</h1>
        <p className="text-lg">Désolé, ce produit n&apos;existe pas ou a été supprimé.</p>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="container mx-auto grid gap-8 px-4 py-8 md:grid-cols-2">
          <Skeleton className="h-[400px] w-full rounded-lg md:h-[500px]" />
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full md:w-auto" />
          </div>
        </div>
      }
    >
      <ProductDetailPageClient product={product} />
    </Suspense>
  )
}
