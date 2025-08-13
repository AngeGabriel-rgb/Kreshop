// lib/types.ts
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
  images: { url: string; alt?: string }[] // Ajout de alt pour les images
  variantes: {
    id: number
    couleur: string
    taille: string
    stock: number
    prix_supplementaire: number // Ajout de prix_supplementaire
    images?: { id: number; url: string; est_principale: boolean; ordre_tri: number }[] // Ajout d'images pour les variantes
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

// Interface pour les métriques du tableau de bord
export interface DashboardMetrics {
  totalSales: number
  pendingOrders: number
  activeClients: number
  lowStockProducts: number
  salesGrowth: number // en pourcentage
  clientsGrowth: number // en pourcentage
}

// Interface pour les métriques d'analyse
export interface AnalyticsMetrics {
  totalSalesMonth: number
  processedOrders: number
  newClients: number
  conversionRate: number
  salesGrowthMonth: number
  clientsGrowthMonth: number
}

// Types d'erreur améliorés
export interface ApiError {
  message: string
  code?: string
  status?: number
  details?: any
}

export interface CartItem {
  productId: number
  variantId?: number
  name: string
  price: number
  quantity: number
  image: string
  slug: string
  color?: string
  size?: string
}
