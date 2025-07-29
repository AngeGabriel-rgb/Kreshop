const API_BASE_URL = "https://kreshop.onrender.com"

// Types de base pour l'authentification
export interface User {
  id: number
  email: string
  prenom: string
  nom: string
  telephone?: string
  est_actif?: boolean
  date_creation: string
  date_modification: string // Ajouté pour la mise à jour
}

export interface Client extends User {
  // Champs spécifiques aux clients
}

export interface Admin extends User {
  // Champs spécifiques aux admins
}

// Types d'énumérations
export type StatutCommande = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
export type StatutPaiement = "pending" | "paid" | "failed" | "refunded"
export type TypeAdresse = "shipping" | "billing"
export type TypeRemise = "percentage" | "fixed_amount"

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

// Helper fetch avec gestion d'erreurs améliorée
export async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
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
      let errorMessage

      try {
        const errorJson = JSON.parse(errorText)
        errorMessage = errorJson.message || errorText
      } catch {
        errorMessage = errorText
      }

      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Une erreur inattendue s'est produite")
  }
}

// Fonctions API génériques pour les produits (exemple)
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

// Helper pour obtenir le token depuis localStorage
export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

// Helper pour obtenir l'utilisateur depuis localStorage
export const getAuthUser = (): User | null => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  }
  return null
}

// Helper pour nettoyer l'authentification
export const clearAuth = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }
}
