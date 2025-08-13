"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

// Types pour les formulaires
interface FormState {
  isLoading: boolean
  errors: Record<string, string>
  values: Record<string, any>
}

interface ClientContextType {
  // État des formulaires
  forms: Record<string, FormState>
  
  // Actions sur les formulaires
  setFormLoading: (formId: string, loading: boolean) => void
  setFormErrors: (formId: string, errors: Record<string, string>) => void
  setFormValues: (formId: string, values: Record<string, any>) => void
  resetForm: (formId: string) => void
  
  // Gestion des notifications
  showSuccess: (message: string) => void
  showError: (message: string) => void
  showInfo: (message: string) => void
  
  // État global de l'application
  isAppLoading: boolean
  setAppLoading: (loading: boolean) => void
  
  // Gestion du panier (si nécessaire)
  cart: any[]
  addToCart: (item: any) => void
  removeFromCart: (itemId: string | number) => void
  clearCart: () => void
}

const ClientContext = createContext<ClientContextType | undefined>(undefined)

export function ClientProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast()
  const [forms, setForms] = useState<Record<string, FormState>>({})
  const [isAppLoading, setIsAppLoading] = useState(false)
  const [cart, setCart] = useState<any[]>([])

  // Gestion des formulaires
  const setFormLoading = useCallback((formId: string, loading: boolean) => {
    setForms(prev => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        isLoading: loading
      }
    }))
  }, [])

  const setFormErrors = useCallback((formId: string, errors: Record<string, string>) => {
    setForms(prev => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        errors
      }
    }))
  }, [])

  const setFormValues = useCallback((formId: string, values: Record<string, any>) => {
    setForms(prev => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        values: { ...prev[formId]?.values, ...values }
      }
    }))
  }, [])

  const resetForm = useCallback((formId: string) => {
    setForms(prev => ({
      ...prev,
      [formId]: {
        isLoading: false,
        errors: {},
        values: {}
      }
    }))
  }, [])

  // Gestion des notifications
  const showSuccess = useCallback((message: string) => {
    toast({
      title: "Succès",
      description: message,
      variant: "default"
    })
  }, [toast])

  const showError = useCallback((message: string) => {
    toast({
      title: "Erreur",
      description: message,
      variant: "destructive"
    })
  }, [toast])

  const showInfo = useCallback((message: string) => {
    toast({
      title: "Information",
      description: message,
      variant: "default"
    })
  }, [toast])

  // Gestion du panier
  const addToCart = useCallback((item: any) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    showSuccess("Produit ajouté au panier")
  }, [showSuccess])

  const removeFromCart = useCallback((itemId: string | number) => {
    setCart(prev => prev.filter(item => item.id !== itemId))
    showInfo("Produit retiré du panier")
  }, [showInfo])

  const clearCart = useCallback(() => {
    setCart([])
    showInfo("Panier vidé")
  }, [showInfo])

  const contextValue: ClientContextType = {
    forms,
    setFormLoading,
    setFormErrors,
    setFormValues,
    resetForm,
    showSuccess,
    showError,
    showInfo,
    isAppLoading,
    setAppLoading: setIsAppLoading,
    cart,
    addToCart,
    removeFromCart,
    clearCart
  }

  return (
    <ClientContext.Provider value={contextValue}>
      {children}
    </ClientContext.Provider>
  )
}

// Hook pour utiliser le ClientProvider
export function useClient() {
  const context = useContext(ClientContext)
  if (context === undefined) {
    throw new Error("useClient must be used within a ClientProvider")
  }
  return context
}

// Hook spécialisé pour les formulaires
export function useForm(formId: string) {
  const { forms, setFormLoading, setFormErrors, setFormValues, resetForm } = useClient()
  const form = forms[formId] || { isLoading: false, errors: {}, values: {} }

  const handleSubmit = useCallback(async (submitFn: () => Promise<void>) => {
    setFormLoading(formId, true)
    setFormErrors(formId, {})
    
    try {
      await submitFn()
    } catch (error: any) {
      setFormErrors(formId, { 
        general: error.message || "Une erreur est survenue" 
      })
    } finally {
      setFormLoading(formId, false)
    }
  }, [formId, setFormLoading, setFormErrors])

  return {
    form,
    setLoading: (loading: boolean) => setFormLoading(formId, loading),
    setErrors: (errors: Record<string, string>) => setFormErrors(formId, errors),
    setValues: (values: Record<string, any>) => setFormValues(formId, values),
    reset: () => resetForm(formId),
    handleSubmit
  }
}
