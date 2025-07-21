"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, CreditCard, Truck, Shield, RotateCcw } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-brun-chocolat text-beige-creme">
      {/* Trust Signals */}
      <div className="border-b border-brun-espresso">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-corail-doux" />
              <div>
                <h4 className="font-semibold">Livraison Rapide</h4>
                <p className="text-sm text-beige-rose">24-48h à Libreville</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-corail-doux" />
              <div>
                <h4 className="font-semibold">Paiement Sécurisé</h4>
                <p className="text-sm text-beige-rose">Mobile Money & E-BILLING</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <RotateCcw className="w-8 h-8 text-corail-doux" />
              <div>
                <h4 className="font-semibold">Retour Gratuit</h4>
                <p className="text-sm text-beige-rose">14 jours pour changer d'avis</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-8 h-8 text-corail-doux" />
              <div>
                <h4 className="font-semibold">Support 24/7</h4>
                <p className="text-sm text-beige-rose">WhatsApp & Téléphone</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-corail-doux rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="font-display text-xl font-bold">GabonStyle</span>
            </div>
            <p className="text-beige-rose leading-relaxed">
              Votre boutique de référence pour la mode gabonaise authentique. Tradition et modernité se rencontrent dans
              chaque création.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-beige-creme hover:text-corail-doux">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-beige-creme hover:text-corail-doux">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-beige-creme hover:text-corail-doux">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Liens Rapides</h3>
            <ul className="space-y-2">
              {[
                "Nouvelle Collection",
                "Robes Traditionnelles",
                "Mode Homme",
                "Accessoires",
                "Promotions",
                "Guide des Tailles",
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="text-beige-rose hover:text-corail-doux transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Service Client</h3>
            <ul className="space-y-2">
              {[
                "Mon Compte",
                "Suivi de Commande",
                "Politique de Retour",
                "FAQ",
                "Nous Contacter",
                "Conditions Générales",
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="text-beige-rose hover:text-corail-doux transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Newsletter</h3>
            <p className="text-beige-rose">Recevez nos dernières nouveautés et offres exclusives</p>
            <div className="space-y-3">
              <Input
                placeholder="Votre email"
                className="bg-brun-espresso border-taupe-rose text-beige-creme placeholder:text-beige-rose"
              />
              <Button className="w-full bg-corail-doux hover:bg-corail-intensifie text-white">S'abonner</Button>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2 text-sm text-beige-rose">
                <MapPin className="w-4 h-4" />
                <span>Quartier Nombakélé, Libreville</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-beige-rose">
                <Phone className="w-4 h-4" />
                <span>+241 01 23 45 67</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-beige-rose">
                <Mail className="w-4 h-4" />
                <span>contact@gabonstyle.ga</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-brun-espresso" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="text-sm text-beige-rose">
            © 2024 GabonStyle. Tous droits réservés. Fait avec ❤️ à Libreville
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-beige-rose">Paiements acceptés:</span>
            <div className="flex items-center gap-2">
              <div className="bg-white rounded px-2 py-1">
                <CreditCard className="w-4 h-4 text-gray-600" />
              </div>
              <div className="bg-orange-500 rounded px-2 py-1 text-white text-xs font-bold">AIRTEL</div>
              <div className="bg-blue-600 rounded px-2 py-1 text-white text-xs font-bold">MOOV</div>
              <div className="bg-green-600 rounded px-2 py-1 text-white text-xs font-bold">E-BILLING</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
