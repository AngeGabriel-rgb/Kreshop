import { Truck, Clock, Shield, Headphones } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Truck,
    title: "Livraison Gratuite",
    description: "À Libreville dès 50 000 FCFA",
  },
  {
    icon: Clock,
    title: "Livraison Rapide",
    description: "24-48h dans Libreville",
  },
  {
    icon: Shield,
    title: "Paiement Sécurisé",
    description: "Mobile Money & Virement",
  },
  {
    icon: Headphones,
    title: "Support WhatsApp",
    description: "Assistance 7j/7",
  },
]

export function DeliveryBanner() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
