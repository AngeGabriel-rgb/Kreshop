import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getProducts, getCategories, getFeaturedProducts } from "@/lib/data"
import { ProductGrid } from "@/components/product-grid"

export default async function HomePage() {
  // Fetch data from API
  const { products } = await getProducts(1, 8) // Get first 8 products
  const categories = await getCategories() // Get all categories
  const featuredProducts = await getFeaturedProducts(4) // Get featured products

  return (
    <div className="flex flex-col">
      {/* Hero Section with Background Image */}
      <section className="relative flex h-[600px] items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://www.wsbconceptdemagasin.fr/wp-content/uploads/2018/04/Anna_van_Toor_029-kopi--ren.jpg"
            alt="KreShop Hero Background"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Découvrez l&apos;Excellence chez{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">KreShop</span>
          </h1>
          <p className="mb-8 text-lg leading-relaxed md:text-xl lg:text-2xl">
            Votre destination unique pour des produits de qualité supérieure.
            <br />
            Explorez notre collection exceptionnelle et trouvez ce qui vous inspire.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-orange-600 hover:to-red-700 hover:shadow-xl hover:scale-105"
            >
              <Link href="/products">Explorer les produits</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black hover:scale-105"
            >
              <Link href="/categories">Voir les catégories</Link>
            </Button>
          </div>

          {/* Stats or Features */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">500+</div>
              <div className="text-sm uppercase tracking-wide">Produits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">50+</div>
              <div className="text-sm uppercase tracking-wide">Catégories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">24/7</div>
              <div className="text-sm uppercase tracking-wide">Support</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
          <div className="flex h-8 w-5 justify-center rounded-full border-2 border-white">
            <div className="mt-2 h-2 w-1 animate-pulse rounded-full bg-white"></div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">Produits Phares</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Découvrez notre sélection de produits les plus populaires, choisis avec soin pour leur qualité
              exceptionnelle.
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <ProductGrid products={featuredProducts} />
          ) : (
            <div className="rounded-lg bg-gray-50 p-12 text-center">
              <div className="text-gray-400">
                <svg className="mx-auto mb-4 h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <p className="text-lg font-medium text-gray-500">Aucun produit phare à afficher pour l&apos;instant.</p>
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-orange-500 bg-transparent px-8 py-3 text-orange-500 transition-all hover:bg-orange-500 hover:text-white"
            >
              <Link href="/products">Voir tous les produits</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">Explorer les Catégories</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Parcourez nos différentes catégories pour trouver exactement ce que vous cherchez.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`} className="group">
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={category.url_image || "/placeholder.svg?height=300&width=400&query=category placeholder"}
                      alt={category.nom}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                      {category.nom}
                    </h3>
                    <p className="mt-2 text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                      Découvrir la collection
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="rounded-lg bg-white p-12 text-center shadow-sm">
              <div className="text-gray-400">
                <svg className="mx-auto mb-4 h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <p className="text-lg font-medium text-gray-500">Aucune catégorie à afficher pour l&apos;instant.</p>
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-gray-800 bg-transparent px-8 py-3 text-gray-800 transition-all hover:bg-gray-800 hover:text-white"
            >
              <Link href="/categories">Voir toutes les catégories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 py-16 md:py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container relative mx-auto px-4 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">Restez Informé !</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl">
            Abonnez-vous à notre newsletter pour recevoir les dernières offres, nouveautés et conseils exclusifs.
          </p>

          <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 border-white/30 bg-white/20 text-white placeholder:text-white/70 focus:border-white focus:bg-white/30 backdrop-blur-sm"
            />
            <Button
              type="submit"
              className="bg-white px-8 py-2 text-orange-600 transition-all hover:bg-gray-100 hover:scale-105 font-semibold"
            >
              S&apos;abonner
            </Button>
          </form>

          <p className="mt-4 text-sm text-white/80">Nous respectons votre vie privée. Désabonnez-vous à tout moment.</p>
        </div>
      </section>
    </div>
  )
}
