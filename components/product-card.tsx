"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import type { Produit } from "@/lib/api"

interface ProductCardProps {
  product: Produit
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast()

  const handleAddToCart = () => {
    // Simulate adding to cart
    const currentCart = JSON.parse(localStorage.getItem("kreshop_cart") || "[]")
    const existingItemIndex = currentCart.findIndex((item: any) => item.id === product.id)

    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += 1
    } else {
      currentCart.push({
        id: product.id,
        name: product.nom,
        price: product.prix_fcfa,
        quantity: 1,
        image: product.images[0]?.url || "/placeholder.svg?height=200&width=200&text=Produit",
      })
    }
    localStorage.setItem("kreshop_cart", JSON.stringify(currentCart))

    toast({
      title: "Produit ajouté au panier",
      description: `${product.nom} a été ajouté à votre panier.`,
    })
  }

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-md">
      <Link href={`/product/${product.slug}`} className="relative block h-48 w-full overflow-hidden">
        <Image
          src={product.images[0]?.url || "/placeholder.svg?height=200&width=200&text=Produit"}
          alt={product.nom}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-semibold line-clamp-2">
          <Link href={`/product/${product.slug}`} className="hover:underline">
            {product.nom}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-0">
        <p className="text-xl font-bold text-primary">
          {product.prix_fcfa.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}
        </p>
        {product.prix_comparaison_fcfa && (
          <p className="text-sm text-muted-foreground line-through">
            {product.prix_comparaison_fcfa.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-corail-doux hover:bg-corail-intensifie" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Ajouter au panier
        </Button>
      </CardFooter>
    </Card>
  )
}
