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

// Mock product data - in real app, this would come from API
const mockProduct = {
  id: 1,
  name: "Robe Élégante Wax Traditionnel",
  price: 45000,
  originalPrice: 55000,
  description:
    "Une magnifique robe en tissu wax traditionnel gabonais, parfaite pour les occasions spéciales. Confectionnée avec soin par nos artisans locaux, cette pièce unique allie tradition et modernité.",
  images: [
    "https://www.dressself.com/cdn/shop/products/RobedeSoiree_a7cbc589-e230-45df-85de-cb327013fdb6.jpg?v=1653555707",
    "https://jane-fashionmode.com/wp-content/uploads/2025/05/tendance-robe-elegante-feminine.webp",
  ],
  category: "Femme",
  brand: "Boutique Gabon",
  sku: "BG-ROB-001",
  variants: {
    colors: [
      { name: "Rouge", value: "#DC2626", available: true },
      { name: "Bleu", value: "#2563EB", available: true },
      { name: "Vert", value: "#16A34A", available: false },
    ],
    sizes: [
      { name: "S", available: true, stock: 3 },
      { name: "M", available: true, stock: 5 },
      { name: "L", available: true, stock: 2 },
      { name: "XL", available: false, stock: 0 },
    ],
  },
  features: [
    "Tissu wax 100% coton",
    "Coupe ajustée",
    "Fermeture éclair invisible",
    "Doublure intérieure",
    "Lavage à la main recommandé",
  ],
  inStock: true,
  rating: 4.8,
  reviewCount: 24,
  tags: ["wax", "traditionnel", "élégant", "artisanal"],
}

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
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
                <BreadcrumbLink href={`/${mockProduct.category.toLowerCase()}`}>{mockProduct.category}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{mockProduct.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <ProductDetail product={mockProduct} />
          <RelatedProducts currentProductId={mockProduct.id} category={mockProduct.category} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
