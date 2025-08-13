"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"

export function CartBadge() {
  const totalItems = useCartStore((state) => state.getTotalItems())

  return (
    <Button asChild variant="ghost" size="icon" className="relative text-brun-chocolat hover:text-corail-intensifie">
      <Link href="/panier">
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-corail-intensifie text-xs font-bold text-white">
            {totalItems}
          </span>
        )}
        <span className="sr-only">Panier</span>
      </Link>
    </Button>
  )
}
