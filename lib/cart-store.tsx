"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { api, type CreateCartItemRequest } from "./api-client"

export interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  color: string
  size: string
  quantity: number
  maxStock: number
  produit_id: number
  variante_id?: number
  client_id?: number
}

export interface PromoCode {
  code: string
  discount: number
  type: "percentage" | "fixed"
  minAmount?: number
  isValid: boolean
}

interface CartStore {
  items: CartItem[]
  promoCode: PromoCode | null
  deliveryZone: string
  deliveryMethod: string
  isLoading: boolean
  addItem: (item: Omit<CartItem, "quantity">) => Promise<void>
  removeItem: (id: number, color: string, size: string) => Promise<void>
  updateQuantity: (id: number, color: string, size: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  syncWithAPI: () => Promise<void>
  applyPromoCode: (code: string) => Promise<boolean>
  removePromoCode: () => void
  setDeliveryZone: (zone: string) => void
  setDeliveryMethod: (method: string) => void
  getTotalItems: () => number
  getSubtotal: () => number
  getDeliveryFee: () => number
  getPromoDiscount: () => number
  getTotal: () => number
}

const deliveryFees = {
  "libreville-centre": 2000,
  "libreville-nord": 3000,
  "libreville-sud": 3000,
  akanda: 5000,
  owendo: 4000,
  "autres-zones": 7000,
}

const mockPromoCodes = {
  BIENVENUE10: { discount: 10, type: "percentage" as const, minAmount: 20000 },
  LIVRAISON: { discount: 2000, type: "fixed" as const, minAmount: 30000 },
  GABON2024: { discount: 15, type: "percentage" as const, minAmount: 50000 },
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      deliveryZone: "libreville-centre",
      deliveryMethod: "standard",
      isLoading: false,

      syncWithAPI: async () => {
        try {
          set({ isLoading: true })
          const apiCartItems = await api.getMyCart()

          const cartItems: CartItem[] = apiCartItems.map((apiItem) => ({
            id: apiItem.id,
            name: apiItem.produit?.nom || "Produit",
            price: apiItem.produit?.prix_promo_fcfa || apiItem.produit?.prix_fcfa || 0,
            originalPrice: apiItem.produit?.prix_fcfa,
            image: apiItem.produit?.images?.[0]?.url_image || "/placeholder.svg",
            category: apiItem.produit?.categorie?.nom || "Catégorie",
            color: apiItem.variante?.valeur || "Standard",
            size: apiItem.variante?.nom || "Unique",
            quantity: apiItem.quantite,
            maxStock: apiItem.produit?.stock_disponible || 0,
            produit_id: apiItem.produit_id,
            variante_id: apiItem.variante_id,
            client_id: apiItem.client_id,
          }))

          set({ items: cartItems, isLoading: false })
        } catch (error) {
          console.error("Erreur lors de la synchronisation du panier:", error)
          set({ isLoading: false })
        }
      },

      addItem: async (newItem) => {
        try {
          set({ isLoading: true })

          const cartData: CreateCartItemRequest = {
            client_id: newItem.client_id || 1, // À récupérer du contexte d'auth
            produit_id: newItem.produit_id,
            variante_id: newItem.variante_id,
            quantite: 1,
          }

          await api.addToCart(cartData)
          await get().syncWithAPI()
        } catch (error) {
          console.error("Erreur lors de l'ajout au panier:", error)
          // Fallback vers le comportement local
          set((state) => {
            const existingItemIndex = state.items.findIndex(
              (item) => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size,
            )

            if (existingItemIndex >= 0) {
              const updatedItems = [...state.items]
              const existingItem = updatedItems[existingItemIndex]
              updatedItems[existingItemIndex] = {
                ...existingItem,
                quantity: Math.min(existingItem.quantity + 1, existingItem.maxStock),
              }
              return { items: updatedItems, isLoading: false }
            }

            return {
              items: [...state.items, { ...newItem, quantity: 1 }],
              isLoading: false,
            }
          })
        }
      },

      removeItem: async (id, color, size) => {
        try {
          set({ isLoading: true })
          await api.removeFromCart(id)
          await get().syncWithAPI()
        } catch (error) {
          console.error("Erreur lors de la suppression:", error)
          // Fallback vers le comportement local
          set((state) => ({
            items: state.items.filter((item) => !(item.id === id && item.color === color && item.size === size)),
            isLoading: false,
          }))
        }
      },

      updateQuantity: async (id, color, size, quantity) => {
        try {
          set({ isLoading: true })
          await api.updateCartItem(id, { quantite: quantity })
          await get().syncWithAPI()
        } catch (error) {
          console.error("Erreur lors de la mise à jour:", error)
          // Fallback vers le comportement local
          set((state) => ({
            items: state.items.map((item) =>
              item.id === id && item.color === color && item.size === size
                ? { ...item, quantity: Math.max(0, Math.min(quantity, item.maxStock)) }
                : item,
            ),
            isLoading: false,
          }))
        }
      },

      clearCart: async () => {
        try {
          set({ isLoading: true })
          await api.clearCart()
          set({ items: [], promoCode: null, isLoading: false })
        } catch (error) {
          console.error("Erreur lors du vidage du panier:", error)
          set({ items: [], promoCode: null, isLoading: false })
        }
      },

      applyPromoCode: async (code) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const promoData = mockPromoCodes[code as keyof typeof mockPromoCodes]
        if (!promoData) {
          return false
        }

        const subtotal = get().getSubtotal()
        if (promoData.minAmount && subtotal < promoData.minAmount) {
          return false
        }

        set({
          promoCode: {
            code,
            ...promoData,
            isValid: true,
          },
        })
        return true
      },

      removePromoCode: () => {
        set({ promoCode: null })
      },

      setDeliveryZone: (zone) => {
        set({ deliveryZone: zone })
      },

      setDeliveryMethod: (method) => {
        set({ deliveryMethod: method })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getDeliveryFee: () => {
        const { deliveryZone, deliveryMethod } = get()
        const baseFee = deliveryFees[deliveryZone as keyof typeof deliveryFees] || deliveryFees["autres-zones"]
        return deliveryMethod === "express" ? baseFee * 1.5 : baseFee
      },

      getPromoDiscount: () => {
        const { promoCode } = get()
        if (!promoCode || !promoCode.isValid) return 0

        const subtotal = get().getSubtotal()
        if (promoCode.type === "percentage") {
          return Math.round((subtotal * promoCode.discount) / 100)
        }
        return promoCode.discount
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        const deliveryFee = get().getDeliveryFee()
        const discount = get().getPromoDiscount()
        return Math.max(0, subtotal + deliveryFee - discount)
      },
    }),
    {
      name: "boutique-gabon-cart",
    },
  ),
)
