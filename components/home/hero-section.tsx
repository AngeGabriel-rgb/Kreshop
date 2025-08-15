"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative flex h-[600px] items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://www.wsbconceptdemagasin.fr/wp-content/uploads/2018/04/Anna_van_Toor_029-kopi--ren.jpg"
          alt="KreShop Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Hero Content - Positionné à gauche */}
            <div className="text-white space-y-6">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Découvrez l&apos;Excellence chez{" "}
                <span className="bg-gradient-to-r from-golden-yellow to-orange-400 bg-clip-text text-transparent">
                  KreShop
                </span>
              </h1>

              <p className="text-lg leading-relaxed md:text-xl text-cream-white/90 max-w-lg">
                Votre destination unique pour des produits de qualité supérieure au Gabon. Explorez notre collection
                exceptionnelle et trouvez ce qui vous inspire.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-golden-yellow border-white border-2 hover:bg-golden-yellow/90 text-charcoal-black font-semibold text-lg px-8 py-3 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/produits">Découvrir la Collection</Link>
                </Button>
            
              </div>
              </div>

            {/* Espace pour l'image - côté droit */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
