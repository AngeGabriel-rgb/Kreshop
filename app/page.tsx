import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product-grid"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden rounded-lg md:h-[500px] lg:h-[600px]">
        <Image
          src="/placeholder.svg?height=800&width=1600&text=Collection Printemps-Été"
          alt="Hero Image - New Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-8 flex flex-col justify-end text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-4 leading-tight">
            Découvrez la Nouvelle Collection
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl">
            Styles uniques et tendances pour toutes les occasions, inspirés par la vibrante culture gabonaise.
          </p>
          <Button asChild className="w-fit bg-corail-doux hover:bg-corail-intensifie text-lg px-8 py-6">
            <Link href="/products">Explorer Maintenant</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <ProductGrid title="Nos Produits Vedettes" />

      {/* Categories Section */}
      <section className="py-8">
        <h2 className="mb-6 text-3xl font-bold text-brun-chocolat dark:text-beige-creme font-serif">
          Parcourir les Catégories
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/categories/vetements" className="group relative block h-64 overflow-hidden rounded-lg shadow-md">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Vêtements"
              alt="Vêtements"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-white font-serif">Vêtements</h3>
            </div>
          </Link>
          <Link
            href="/categories/accessoires"
            className="group relative block h-64 overflow-hidden rounded-lg shadow-md"
          >
            <Image
              src="/placeholder.svg?height=400&width=600&text=Accessoires"
              alt="Accessoires"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-white font-serif">Accessoires</h3>
            </div>
          </Link>
          <Link
            href="/categories/chaussures"
            className="group relative block h-64 overflow-hidden rounded-lg shadow-md"
          >
            <Image
              src="/placeholder.svg?height=400&width=600&text=Chaussures"
              alt="Chaussures"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-white font-serif">Chaussures</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Call to Action / Newsletter */}
      <section className="bg-beige-rose dark:bg-brun-espresso text-brun-chocolat dark:text-beige-creme py-12 rounded-lg text-center">
        <h2 className="text-3xl font-bold font-serif mb-4">Restez Connecté !</h2>
        <p className="text-lg mb-6">
          Abonnez-vous à notre newsletter pour recevoir les dernières nouveautés et promotions.
        </p>
        <div className="flex justify-center gap-2">
          <Input placeholder="Votre email" className="max-w-sm bg-background" />
          <Button className="bg-corail-doux hover:bg-corail-intensifie">S'abonner</Button>
        </div>
      </section>
    </div>
  )
}
