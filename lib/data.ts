// lib/data.ts
import {
  fetchProduits,
  fetchProduitById,
  fetchCategories,
  fetchCommandes,
  fetchCommandeById,
  fetchDashboardMetrics,
  fetchAnalyticsMetrics,
  fetchClients,
  fetchProductBySlug,
  fetchCategorieById, // Added import for fetchCategorieById
} from "./api"
import type { Produit, Categorie, Commande, User, DashboardMetrics, AnalyticsMetrics } from "./types"

// Helper to find category by slug (since API doesn't have direct endpoint)
async function getCategoryBySlug(slug: string): Promise<Categorie | undefined> {
  const categories = await fetchCategories()
  return categories.find((cat) => cat.slug === slug)
}

// Products
export async function getProducts(page = 1, limit = 20): Promise<{ products: Produit[]; total: number }> {
  const { data, total } = await fetchProduits(page, limit)
  return { products: data, total }
}

export async function getProductById(id: number): Promise<Produit | undefined> {
  try {
    return await fetchProduitById(id)
  } catch (error) {
    console.error(`Error fetching product by ID ${id}:`, error)
    return undefined
  }
}

export async function getProductBySlug(slug: string): Promise<Produit | undefined> {
  try {
    const response = await fetchProductBySlug(slug)
    return response.data
  } catch (error) {
    console.error(`Error fetching product by slug ${slug}:`, error)
    return undefined
  }
}

export async function getProductsByCategorySlug(slug: string): Promise<Produit[]> {
  try {
    const category = await getCategoryBySlug(slug)
    if (!category) {
      return []
    }
    // Fetch all products and filter by category_id if API doesn't support direct category filtering
    const { data: allProducts } = await fetchProduits(1, 1000) // Fetch a large number to cover all products
    return allProducts.filter((product) => product.categorie_id === category.id)
  } catch (error) {
    console.error(`Error fetching products by category slug ${slug}:`, error)
    return []
  }
}

// Featured Products
export async function getFeaturedProducts(limit: number = 4): Promise<Produit[]> {
  try {
    // Fetch all products and filter by est_vedette flag
    const { data: allProducts } = await fetchProduits(1, 1000) // Fetch a large number to cover all products
    const featuredProducts = allProducts.filter((product) => product.est_vedette)
    return featuredProducts.slice(0, limit)
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

// Categories
export async function getCategories(): Promise<Categorie[]> {
  try {
    return await fetchCategories()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getCategoryById(id: number): Promise<Categorie | undefined> {
  try {
    return await fetchCategorieById(id) // Updated to use fetchCategorieById
  } catch (error) {
    console.error(`Error fetching category by ID ${id}:`, error)
    return undefined
  }
}

export async function getCategoryBySlugData(slug: string): Promise<Categorie | undefined> {
  try {
    return await getCategoryBySlug(slug)
  } catch (error) {
    console.error(`Error fetching category by slug ${slug}:`, error)
    return undefined
  }
}

// Orders
export async function getOrders(token: string): Promise<Commande[]> {
  try {
    return await fetchCommandes(token)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return []
  }
}

export async function getOrderById(id: number, token: string): Promise<Commande | undefined> {
  try {
    return await fetchCommandeById(id, token)
  } catch (error) {
    console.error(`Error fetching order by ID ${id}:`, error)
    return undefined
  }
}

// Users (Clients)
export async function getClients(token: string): Promise<User[]> {
  try {
    return await fetchClients(token)
  } catch (error) {
    console.error("Error fetching clients:", error)
    return []
  }
}

// Dashboard Metrics
export async function getDashboardMetrics(token: string): Promise<DashboardMetrics | undefined> {
  try {
    return await fetchDashboardMetrics(token)
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error)
    return undefined
  }
}

// Analytics Metrics
export async function getAnalyticsMetrics(token: string): Promise<AnalyticsMetrics | undefined> {
  try {
    return await fetchAnalyticsMetrics(token)
  } catch (error) {
    console.error("Error fetching analytics metrics:", error)
    return undefined
  }
}
