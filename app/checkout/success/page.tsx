import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-beige-creme p-4 text-brun-chocolat">
      <CheckCircle className="mb-6 h-24 w-24 text-green-500" />
      <h1 className="mb-4 text-4xl font-bold">Commande Réussie !</h1>
      <p className="mb-8 text-lg text-center">
        Merci pour votre achat. Votre commande a été passée avec succès et sera traitée sous peu.
      </p>
      <div className="flex gap-4">
        <Button asChild className="bg-corail-intensifie text-white hover:bg-corail-doux">
          <Link href="/products">Continuer vos achats</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-corail-intensifie text-corail-intensifie hover:bg-corail-doux hover:text-white bg-transparent"
        >
          <Link href="/account/orders">Voir mes commandes</Link>
        </Button>
      </div>
    </div>
  )
}
