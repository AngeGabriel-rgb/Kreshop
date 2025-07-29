"use client"

import React, { createContext, useState, useContext, useEffect, useCallback } from "react"
import type { Product } from "@/types/product"

interface CartItem extends Product {
  [x: string]: any
  size: any
  color: any
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  cartTotal: number
  cartItemsCount: number
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Load cart from localStorage on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("kreshop_cart")
      if (storedCart) {
        setCartItems(JSON.parse(storedCart))
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("kreshop_cart", JSON.stringify(cartItems))
    }
  }, [cartItems])

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      }
      return [...prev, { ...product, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }, [])

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId)
        return
      }
      setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    },
    [removeFromCart],
  )

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const value = React.useMemo(
    () => ({
      cartItems,
      cartTotal,
      cartItemsCount,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [
      cartItems,
      cartTotal,
      cartItemsCount,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
