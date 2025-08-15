import Link from "next/link"
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-sans font-bold text-lg">KRESHOP</h3>
            <p className="text-sm text-muted-foreground">
              Votre boutique en ligne de référence pour la mode et les accessoires au Gabon.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="https://wa.me/+24162489699" target="_blank">
                  <MessageCircle className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="tel:+24162489699">
                  <Phone className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="mailto:gabrielange748@gmail.com">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-sans font-bold text-lg">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/femme" className="hover:text-primary transition-colors">
                  Mode Femme
                </Link>
              </li>
              <li>
                <Link href="/homme" className="hover:text-primary transition-colors">
                  Mode Homme
                </Link>
              </li>
              <li>
                <Link href="/accessoires" className="hover:text-primary transition-colors">
                  Accessoires
                </Link>
              </li>
              <li>
                <Link href="/nouveautes" className="hover:text-primary transition-colors">
                  Nouveautés
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="hover:text-primary transition-colors">
                  Promotions
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-sans font-bold text-lg">Service Client</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/aide" className="hover:text-primary transition-colors">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link href="/livraison" className="hover:text-primary transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/retours" className="hover:text-primary transition-colors">
                  Retours & Échanges
                </Link>
              </li>
              <li>
                <Link href="/guide-tailles" className="hover:text-primary transition-colors">
                  Guide des tailles
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-sans font-bold text-lg">Newsletter</h3>
            <p className="text-sm text-muted-foreground">Recevez nos dernières offres et nouveautés</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Votre email" className="flex-1" />
              <Button type="submit" className="btn-primary">
                S'abonner
              </Button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Libreville, Gabon</span>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">© 2025 KRESHOP. Tous droits réservés.</div>
            <div className="flex space-x-6 text-sm">
              <Link href="/mentions-legales" className="hover:text-primary transition-colors">
                Mentions légales
              </Link>
              <Link href="/cgv" className="hover:text-primary transition-colors">
                CGV
              </Link>
              <Link href="/politique-confidentialite" className="hover:text-primary transition-colors">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
