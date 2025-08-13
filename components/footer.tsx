import Link from "next/link"
import { Package2 } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-beige-creme py-8 text-brun-chocolat">
      <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-3 md:px-6 lg:grid-cols-4">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-brun-chocolat">
            <Package2 className="h-6 w-6" />
            <span>KreShop</span>
          </Link>
          <p className="text-sm">Votre destination unique pour des produits de qualité.</p>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Liens Rapides</h3>
          <nav className="space-y-2">
            <Link href="/products" className="block text-sm hover:text-corail-intensifie">
              Produits
            </Link>
            <Link href="/categories" className="block text-sm hover:text-corail-intensifie">
              Catégories
            </Link>
            <Link href="/panier" className="block text-sm hover:text-corail-intensifie">
              Panier
            </Link>
            <Link href="/account" className="block text-sm hover:text-corail-intensifie">
              Mon Compte
            </Link>
          </nav>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Support</h3>
          <nav className="space-y-2">
            <Link href="#" className="block text-sm hover:text-corail-intensifie">
              FAQ
            </Link>
            <Link href="#" className="block text-sm hover:text-corail-intensifie">
              Contact
            </Link>
            <Link href="#" className="block text-sm hover:text-corail-intensifie">
              Politique de Confidentialité
            </Link>
            <Link href="#" className="block text-sm hover:text-corail-intensifie">
              Conditions Générales
            </Link>
          </nav>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Contactez-nous</h3>
          <p className="text-sm">
            123 Rue du Commerce
            <br />
            Dakar, Sénégal
          </p>
          <p className="text-sm">Email: info@kreshop.com</p>
          <p className="text-sm">Téléphone: +221 77 123 45 67</p>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">© {new Date().getFullYear()} KreShop. Tous droits réservés.</div>
    </footer>
  )
}
