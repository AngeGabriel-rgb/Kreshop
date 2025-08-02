import Link from "next/link"
import { Facebook, Instagram, MapPin, Phone, PhoneIcon as Whatsapp, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground py-8 md:py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1">
          <h3 className="font-serif text-2xl font-bold text-corail-doux mb-4">KreShop</h3>
          <p className="text-sm text-muted-foreground">
            Votre boutique en ligne de vêtements et accessoires au Gabon. Qualité et style à portée de main.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Whatsapp className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="col-span-1">
          <h4 className="font-semibold text-lg mb-4">Liens Rapides</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/products" className="text-muted-foreground hover:text-foreground">
                Produits
              </Link>
            </li>
            <li>
              <Link href="/categories" className="text-muted-foreground hover:text-foreground">
                Catégories
              </Link>
            </li>
            <li>
              <Link href="/panier" className="text-muted-foreground hover:text-foreground">
                Panier
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                Mon Compte
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-semibold text-lg mb-4">Informations</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                À Propos
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                Conditions Générales
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Politique de Confidentialité
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-semibold text-lg mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Libreville, Gabon</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+241 77 123 456</span>
            </li>
            <li className="flex items-center gap-2">
              <Whatsapp className="h-4 w-4" />
              <span>+241 66 123 456</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>contact@kreshop.ga</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container text-center text-xs text-muted-foreground mt-8 pt-4 border-t border-border">
        &copy; {new Date().getFullYear()} KreShop. Tous droits réservés.
      </div>
    </footer>
  )
}
