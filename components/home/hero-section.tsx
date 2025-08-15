"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden rounded-lg">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://www.wsbconceptdemagasin.fr/wp-content/uploads/2018/04/Anna_van_Toor_029-kopi--ren.jpg"
          alt="KRESHOP BOUTIQUE"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl text-center mx-auto text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Mode Authentique
              <span className="block text-golden-yellow">Gabonaise</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Découvrez notre collection exclusive de vêtements et accessoires qui célèbrent l'élégance africaine
              moderne
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-golden-yellow hover:bg-golden-yellow/90 text-charcoal-black font-semibold text-lg px-8 py-3"
              >
                <Link href="/produits">Découvrir la Collection</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-black hover:border-golden-yellow hover:text-golden-yellow font-semibold text-lg px-8 py-3"
              >
                <Link href="/categories">Parcourir par Catégorie</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
