import { toast } from "@/components/ui/use-toast"

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  color?: string
  size?: string
}

const CART_STORAGE_KEY = "kreshop_cart"

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") {
    return []
  }
  const storedCart = localStorage.getItem(CART_STORAGE_KEY)
  return storedCart ? JSON.parse(storedCart) : []
}

export function saveCartItems(items: CartItem[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }
}

export function addToCart(
  product: {
    id: number
    nom: string
    prix_fcfa: number
    images?: { url: string }[]
    variantes?: { id: number; couleur?: string; taille?: string; images?: { url: string }[] }[]
  },
  quantity: number,
  selectedColor?: string,
  selectedSize?: string,
): void {
  const currentItems = getCartItems()

  // Determine the image for the cart item
  let imageUrl = product.images?.[0]?.url || "/placeholder.svg"
  if (selectedColor || selectedSize) {
    const variant = product.variantes?.find(
      (v) => (selectedColor ? v.couleur === selectedColor : true) && (selectedSize ? v.taille === selectedSize : true),
    )
    if (variant && variant.images && variant.images.length > 0) {
      imageUrl = variant.images[0].url
    }
  }

  const newItem: CartItem = {
    id: product.id,
    name: product.nom,
    price: product.prix_fcfa,
    quantity: quantity,
    image: imageUrl,
    color: selectedColor,
    size: selectedSize,
  }

  const existingItemIndex = currentItems.findIndex(
    (item) => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size,
  )

  if (existingItemIndex > -1) {
    const updatedItems = [...currentItems]
    updatedItems[existingItemIndex].quantity += quantity
    saveCartItems(updatedItems)
  } else {
    saveCartItems([...currentItems, newItem])
  }

  toast({
    title: "Produit ajouté au panier",
    description: `${quantity} x ${product.nom} a été ajouté à votre panier.`,
  })
}

export function updateCartItemQuantity(id: number, delta: number, color?: string, size?: string): void {
  const currentItems = getCartItems()
  const updatedItems = currentItems
    .map((item) =>
      item.id === id && item.color === color && item.size === size
        ? { ...item, quantity: item.quantity + delta }
        : item,
    )
    .filter((item) => item.quantity > 0)
  saveCartItems(updatedItems)
}

export function removeCartItem(id: number, color?: string, size?: string): void {
  const currentItems = getCartItems()
  const updatedItems = currentItems.filter((item) => !(item.id === id && item.color === color && item.size === size))
  saveCartItems(updatedItems)
  toast({
    title: "Produit retiré",
    description: "Le produit a été retiré de votre panier.",
  })
}

export function clearCart(): void {
  saveCartItems([])
  toast({
    title: "Panier vidé",
    description: "Tous les produits ont été retirés de votre panier.",
  })
}

export function getTotalItems(): number {
  return getCartItems().reduce((sum, item) => sum + item.quantity, 0)
}

export function getSubtotal(): number {
  return getCartItems().reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function getShippingCost(): number {
  return getCartItems().length > 0 ? 2500 : 0 // Example fixed shipping cost for Libreville
}

export function getTotal(): number {
  return getSubtotal() + getShippingCost()
}
