"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-beige-rose via-beige-creme to-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-corail-doux text-white px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Nouvelle Collection 2024
              </Badge>

              <h1 className="font-display text-4xl lg:text-6xl font-bold text-brun-chocolat leading-tight">
                Mode Gabonaise
                <span className="block text-corail-doux">Authentique</span>
              </h1>

              <p className="text-lg text-taupe-fonce leading-relaxed max-w-md">
                Découvrez notre collection exclusive de vêtements traditionnels et modernes, conçus avec passion à
                Libreville pour sublimer votre style africain.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
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
                className="border-taupe-rose text-brun-chocolat hover:bg-beige-rose px-8 py-3 rounded-xl font-semibold transition-all duration-300 bg-transparent"
              >
                Voir les Tendances
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-brun-chocolat">500+</div>
                <div className="text-sm text-taupe-fonce">Produits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brun-chocolat">1000+</div>
                <div className="text-sm text-taupe-fonce">Clients Satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brun-chocolat">4.8★</div>
                <div className="text-sm text-taupe-fonce">Note Moyenne</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/placeholder.svg?height=600&width=500"
                alt="Mode Gabonaise"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-corail-doux rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-beige-rose rounded-full opacity-30"></div>

            {/* Floating Badge */}
            <div className="absolute top-8 -left-4 bg-white rounded-xl p-4 shadow-lg border border-beige-rose">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <div className="text-sm font-semibold text-brun-chocolat">Livraison Rapide</div>
                  <div className="text-xs text-taupe-fonce">24-48h à Libreville</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FF9B8A' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
    </section>
  )
}
