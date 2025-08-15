import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductDetail } from "@/components/product/product-detail"
import { RelatedProducts } from "@/components/product/related-products"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { api, type Product } from "@/lib/api-client"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: {
    id: string
  }
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const isNumericId = /^\d+$/.test(id)

    let response
    if (isNumericId) {
      response = await api.getProduct(id)
    } else {
      response = await api.getProductBySlug(id)
    }

    if (response.success && response.data) {
      return response.data
    }
    return null
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error)
    return null
  }
}

function transformProductData(apiProduct: Product) {
  return {
    id: apiProduct.id,
    name: apiProduct.nom,
    price: apiProduct.prix_fcfa,
    originalPrice: apiProduct.prix_promo_fcfa || undefined,
    description: apiProduct.description || "Description non disponible",
    images: apiProduct.images?.map((img) => img.url_image) || ["/placeholder.svg?height=600&width=500"],
    category: apiProduct.categorie?.nom || "Non catégorisé",
    brand: "KRESHOP",
    sku: `KRE-${apiProduct.id.toString().padStart(3, "0")}`,
    variants: {
      colors:
        apiProduct.variantes
          ?.filter((v) => v.nom.toLowerCase().includes("couleur"))
          .map((v) => ({
            name: v.valeur,
            value: v.valeur,
            available: v.statut_stock === "EN_STOCK",
          })) || [],
      sizes:
        apiProduct.variantes
          ?.filter((v) => v.nom.toLowerCase().includes("taille"))
          .map((v) => ({
            name: v.valeur,
            available: v.statut_stock === "EN_STOCK",
            stock: v.stock_disponible,
          })) || [],
    },
    features: [
      "Produit authentique gabonais",
      "Qualité premium",
      "Livraison rapide à Libreville",
      "Garantie satisfaction",
      "Support client WhatsApp",
    ],
    inStock: apiProduct.statut_stock === "EN_STOCK",
    rating: 4.5, // Valeur par défaut en attendant le système d'avis
    reviewCount: Math.floor(Math.random() * 50) + 5, // Valeur simulée
    tags: [apiProduct.categorie?.nom?.toLowerCase() || "produit", "gabonais", "authentique"],
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  const apiProduct = await getProduct(id)

  if (!apiProduct) {
    notFound()
  }

  const product = transformProductData(apiProduct)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/produits">Produits</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/categories/${apiProduct.categorie?.slug || "tous"}`}>
                  {product.category}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <ProductDetail product={product} />
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
