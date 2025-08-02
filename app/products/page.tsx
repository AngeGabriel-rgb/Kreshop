import { ProductGrid } from "@/components/product-grid"

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">Tous nos Produits</h1>
      <ProductGrid />
    </div>
  )
}
