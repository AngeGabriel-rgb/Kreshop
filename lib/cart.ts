"use client"

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

export const getCartItems = (): CartItem[] => {
  if (typeof window === "undefined") {
    return []
  }
  const cartJson = localStorage.getItem(CART_STORAGE_KEY)
  return cartJson ? JSON.parse(cartJson) : []
}

export const saveCartItems = (items: CartItem[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    // Dispatch a storage event manually to notify other components in the same tab/window
    window.dispatchEvent(new Event("storage"))
  }
}

export const addCartItem = (newItem: CartItem): void => {
  const currentCart = getCartItems()
  const existingItemIndex = currentCart.findIndex(
    (item) => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size,
  )

  if (existingItemIndex > -1) {
    currentCart[existingItemIndex].quantity += newItem.quantity
  } else {
    currentCart.push(newItem)
  }
  saveCartItems(currentCart)
}

export const updateCartItemQuantity = (id: number, delta: number, color?: string, size?: string): void => {
  const currentCart = getCartItems()
  const itemIndex = currentCart.findIndex((item) => item.id === id && item.color === color && item.size === size)

  if (itemIndex > -1) {
    currentCart[itemIndex].quantity += delta
    if (currentCart[itemIndex].quantity <= 0) {
      currentCart.splice(itemIndex, 1) // Remove if quantity is 0 or less
    }
    saveCartItems(currentCart)
  }
}

export const removeCartItem = (id: number, color?: string, size?: string): void => {
  const currentCart = getCartItems()
  const updatedCart = currentCart.filter((item) => !(item.id === id && item.color === color && item.size === size))
  saveCartItems(updatedCart)
}

export const clearCart = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CART_STORAGE_KEY)
    window.dispatchEvent(new Event("storage"))
  }
}

export const getSubtotal = (): number => {
  return getCartItems().reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export const getShippingCost = (): number => {
  // Exemple de coût de livraison fixe pour Libreville
  return getCartItems().length > 0 ? 2000 : 0 // 2000 FCFA si le panier n'est pas vide
}

export const getTotal = (): number => {
  return getSubtotal() + getShippingCost()
}

export const getCartItemsCount = (): number => {
  return getCartItems().reduce((total, item) => total + item.quantity, 0)
}
