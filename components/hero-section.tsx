"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

export function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          <CarouselItem className="relative h-[60vh] md:h-[80vh] flex items-center">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/globe.svg")' }} />
            <div className="relative z-10 flex flex-col items-start justify-center text-left text-white px-4 md:px-16 max-w-xl">
              <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Mode Gabonaise <span className="block text-corail-doux">Authentique</span></h1>
              <p className="mt-4 text-lg md:text-2xl font-medium drop-shadow">Découvrez notre collection exclusive de vêtements traditionnels et modernes.</p>
              <a href="/categories" className="mt-6">
                <Button className="bg-corail-doux hover:bg-corail-intensifie text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300">
                  Voir les catégories
                </Button>
              </a>
            </div>
          </CarouselItem>
          <CarouselItem className="relative h-[60vh] md:h-[80vh] flex items-center">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/window.svg")' }} />
            <div className="relative z-10 flex flex-col items-start justify-center text-left text-white px-4 md:px-16 max-w-xl">
              <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Nouvelle Collection 2024</h1>
              <p className="mt-4 text-lg md:text-2xl font-medium drop-shadow">Sublimez votre style africain avec nos nouveautés.</p>
              <a href="/categories" className="mt-6">
                <Button className="bg-corail-doux hover:bg-corail-intensifie text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300">
                  Voir les catégories
                </Button>
              </a>
            </div>
          </CarouselItem>
          <CarouselItem className="relative h-[60vh] md:h-[80vh] flex items-center">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/vercel.svg")' }} />
            <div className="relative z-10 flex flex-col items-start justify-center text-left text-white px-4 md:px-16 max-w-xl">
              <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Livraison Rapide</h1>
              <p className="mt-4 text-lg md:text-2xl font-medium drop-shadow">24-48h à Libreville pour toutes vos commandes.</p>
              <a href="/categories" className="mt-6">
                <Button className="bg-corail-doux hover:bg-corail-intensifie text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300">
                  Voir les catégories
                </Button>
              </a>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="bg-white/80 hover:bg-white text-brun-chocolat" />
        <CarouselNext className="bg-white/80 hover:bg-white text-brun-chocolat" />
      </Carousel>
    </section>
  )
}
