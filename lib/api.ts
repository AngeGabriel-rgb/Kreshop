// lib/api.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const API_BASE_URL = "https://kreshop.onrender.com" // This will be mocked for frontend-only

// Types de base pour l'authentification
export interface User {
  id: number
  email: string
  prenom: string
  nom: string
  telephone?: string
  est_actif?: boolean
  date_creation: string
  role?: "client" | "admin"
}

export interface Client extends User {
  // Champs spécifiques aux clients
}

export interface Admin extends User {
  // Champs spécifiques aux admins
}

// Types d'énumérations
export type StatutCommande = "EN_ATTENTE" | "CONFIRMEE" | "TRAITEE" | "EXPEDIEE" | "LIVREE" | "ANNULEE"
export type StatutPaiement = "EN_ATTENTE" | "PAYE" | "ECHEC" | "REMBOURSE"
export type TypeAdresse = "LIVRAISON" | "FACTURATION"
export type TypeRemise = "POURCENTAGE" | "MONTANT_FIXE"

// Interfaces enrichies (exemple pour un système e-commerce complet)
export interface Produit {
  id: number
  nom: string
  slug: string
  description?: string
  description_courte?: string
  prix_fcfa: number
  prix_comparaison_fcfa?: number
  prix_cout_fcfa?: number
  sku?: string
  code_barre?: string
  categorie_id: number
  marque?: string
  poids?: number
  dimensions?: any
  est_actif: boolean
  est_vedette: boolean
  titre_seo?: string
  description_seo?: string
  date_creation: string
  date_modification: string
  images: { url: string }[]
  variantes: {
    id: number
    couleur: string
    taille: string
    stock: number
  }[]
}

export interface Categorie {
  id: number
  nom: string
  slug: string
  description?: string
  parent_id?: number
  url_image?: string
  est_active: boolean
  ordre_tri: number
  date_creation: string
}

export interface Commande {
  id: number
  numero_commande: string
  client_id: number
  statut: StatutCommande
  statut_paiement: StatutPaiement
  sous_total_fcfa: number
  taxes_fcfa: number
  livraison_fcfa: number
  remise_fcfa: number
  total_fcfa: number
  devise: string
  methode_paiement?: string
  reference_paiement?: string
  adresse_livraison?: any
  adresse_facturation?: any
  notes?: string
  date_creation: string
  date_modification: string
}

// Types d'erreur améliorés
export interface ApiError {
  message: string
  code?: string
  status?: number
  details?: any
}

// Helper fetch avec gestion d'erreurs améliorée
export async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  // Default fetch behavior for other endpoints (will likely fail without a real backend)
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorMessage: string
      let errorCode: string | undefined
      try {
        const errorJson = JSON.parse(errorText)
        errorMessage = errorJson.message || errorText
        errorCode = errorJson.code
      } catch {
        errorMessage = errorText
      }
      const error: ApiError = {
        message: errorMessage,
        code: errorCode,
        status: response.status,
      }
      // Gestion spécifique des codes d'erreur HTTP
      switch (response.status) {
        case 401:
          error.message = "Non autorisé. Veuillez vous reconnecter."
          break
        case 403:
          error.message = "Accès refusé. Vous n'avez pas les permissions nécessaires."
          break
        case 404:
          error.message = "Ressource non trouvée."
          break
        case 409:
          error.message = "Conflit. Cette ressource existe déjà."
          break
        case 422:
          error.message = "Données invalides. Veuillez vérifier vos informations."
          break
        case 500:
          error.message = "Erreur serveur. Veuillez réessayer plus tard."
          break
      }
      throw error
    }
    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error && "message" in error) {
      throw error
    }
    throw new Error("Une erreur inattendue s'est produite")
  }
}

// Fonctions API génériques pour les produits
export const fetchProduits = () => fetchApi<Produit[]>("/products")
export const fetchProduitById = (id: number) => fetchApi<Produit>(`/products/${id}`)

// Fonctions API pour les catégories
export const fetchCategories = () => fetchApi<Categorie[]>("/categories")
export const fetchCategorieById = (id: number) => fetchApi<Categorie>(`/categories/${id}`)

// Fonctions API pour les commandes
export const fetchCommandes = (token: string) =>
  fetchApi<Commande[]>("/orders", {
    headers: { Authorization: `Bearer ${token}` },
  })
export const fetchCommandeById = (id: number, token: string) =>
  fetchApi<Commande>(`/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
export const createCommande = (data: Partial<Commande>, token: string) =>
  fetchApi<Commande>("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

// Helper pour la pagination
export async function fetchPaginated<T>(
  url: string,
  page = 1,
  limit = 20,
  options?: RequestInit,
): Promise<{ data: T[]; total: number; page: number; limit: number }> {
  const response = await fetch(`${API_BASE_URL}${url}?page=${page}&limit=${limit}`, options)
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText)
  }
  return response.json()
}

// Fonctions utilitaires pour l'authentification
export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

export const getAuthUser = (): User | null => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  }
  return null
}

export const getUserRole = (): "client" | "admin" | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userRole") as "client" | "admin" | null
  }
  return null
}

export const clearAuth = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("userRole")
  }
}

// Fonction pour créer des headers d'authentification
export const createAuthHeaders = (token?: string): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  } else {
    const storedToken = getAuthToken()
    if (storedToken) {
      headers.Authorization = `Bearer ${storedToken}`
    }
  }

  return headers
}

// Fonction pour vérifier si l'utilisateur est authentifié
export const isAuthenticated = (): boolean => {
  return !!getAuthToken()
}

// Fonction pour vérifier le rôle de l'utilisateur
export const isAdmin = (): boolean => {
  return getUserRole() === "admin"
}
export const isClient = (): boolean => {
  return getUserRole() === "client"
}

// Fonction pour gérer les erreurs d'authentification
export const handleAuthError = (error: ApiError): void => {
  if (error.status === 401 || error.status === 403) {
    clearAuth()
    // Rediriger vers la page de connexion si nécessaire
    if (typeof window !== "undefined") {
      window.location.href = "/login"
    }
  }
}
