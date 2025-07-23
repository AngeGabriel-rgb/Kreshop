import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClientCategories } from "@/components/client-categories"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 to-cream-100">
      <Header />
      <main>
        <ClientCategories />
      </main>
      <Footer />
    </div>
  )
}
