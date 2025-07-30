"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-[600px] lg:h-[700px] flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/mode.jpg')` }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Background Pattern (keep existing) */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FF9B8A' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Content (centered and z-indexed) */}
      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24 text-white">
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="space-y-4">
            <Badge className="bg-corail-doux text-white px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Nouvelle Collection 2024
            </Badge>
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-white leading-tight">
              Mode Gabonaise
              <span className="block text-corail-doux">Authentique</span>
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed max-w-md mx-auto">
              Découvrez notre collection exclusive de vêtements traditionnels et modernes, conçus avec passion à
              Libreville pour sublimer votre style africain.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-corail-doux hover:bg-corail-intensifie text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Découvrir la Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-taupe-rose text-white hover:bg-white/20 px-8 py-3 rounded-xl font-semibold transition-all duration-300 bg-transparent"
            >
              Voir les Tendances
            </Button>
          </div>
          {/* Stats */}
          <div className="flex items-center space-x-8 pt-8 justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-gray-200">Produits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1000+</div>
              <div className="text-sm text-gray-200">Clients Satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.8★</div>
              <div className="text-sm text-gray-200">Note Moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
