"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Plus, Minus, ShoppingBag, Truck } from "lucide-react"
import type { Product } from "@/types/product"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  items: Array<Product & { quantity: number }>
  total: number
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
}

export function CartSidebar({ isOpen, onClose, items, total, onUpdateQuantity, onRemoveItem }: CartSidebarProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("XAF", "FCFA")
  }

  const deliveryFee = total >= 50000 ? 0 : 2500
  const finalTotal = total + deliveryFee

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-beige-rose">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-corail-doux" />
              <h2 className="text-xl font-semibold text-brun-chocolat">Mon Panier</h2>
              <Badge className="bg-corail-doux text-white">{items.reduce((sum, item) => sum + item.quantity, 0)}</Badge>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <ShoppingBag className="w-16 h-16 text-taupe-rose mb-4" />
                <h3 className="text-lg font-semibold text-brun-chocolat mb-2">Votre panier est vide</h3>
                <p className="text-taupe-fonce mb-6">Découvrez notre collection et ajoutez vos articles préférés</p>
                <Button onClick={onClose} className="bg-corail-doux hover:bg-corail-intensifie text-white">
                  Continuer mes achats
                </Button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-beige-creme rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-brun-chocolat truncate">{item.name}</h4>
                      <p className="text-sm text-taupe-fonce">{item.category}</p>
                      <p className="text-lg font-semibold text-corail-doux">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-taupe-fonce hover:text-red-500"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-taupe-rose bg-transparent"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>

                        <span className="w-8 text-center font-medium text-brun-chocolat">{item.quantity}</span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-taupe-rose bg-transparent"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-beige-rose p-6 space-y-4">
              {/* Delivery Info */}
              <div className="flex items-center gap-3 p-3 bg-beige-creme rounded-lg">
                <Truck className="w-5 h-5 text-corail-doux" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-brun-chocolat">
                    {deliveryFee === 0 ? "Livraison gratuite!" : "Frais de livraison"}
                  </p>
                  {deliveryFee > 0 && <p className="text-xs text-taupe-fonce">Livraison gratuite dès 50 000 FCFA</p>}
                </div>
                <span className="font-semibold text-brun-chocolat">
                  {deliveryFee === 0 ? "Gratuit" : formatPrice(deliveryFee)}
                </span>
              </div>

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-taupe-fonce">
                  <span>Sous-total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-taupe-fonce">
                  <span>Livraison</span>
                  <span>{deliveryFee === 0 ? "Gratuit" : formatPrice(deliveryFee)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold text-brun-chocolat">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-corail-doux hover:bg-corail-intensifie text-white py-3 rounded-xl font-semibold"
                  size="lg"
                >
                  Passer la commande
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-taupe-rose text-brun-chocolat hover:bg-beige-rose bg-transparent"
                  onClick={onClose}
                >
                  Continuer mes achats
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
