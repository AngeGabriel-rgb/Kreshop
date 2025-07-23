import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClientProducts } from "@/components/client-products"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 to-cream-100">
      <Header />
      <main>
        <ClientProducts />
      </main>
      <Footer />
    </div>
  )
}
