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
  fetchCategorieById,
  createProduit,
  updateProduit,
  deleteProduit,
  createCategorie,
  updateCategorie,
  deleteCategorie,
  updateCommande,
  deleteCommande,
  getAuthToken,
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

export async function addProduct(productData: Partial<Produit>): Promise<Produit> {
  const token = getAuthToken()
  if (!token) throw new Error("Authentication token not found.")
  return createProduit(productData, token)
}

export async function modifyProduct(id: number, productData: Partial<Produit>): Promise<Produit> {
  const token = getAuthToken()
  if (!token) throw new Error("Authentication token not found.")
  return updateProduit(id, productData, token)
}

export async function removeProduct(id: number): Promise<{ success: boolean; message: string }> {
  const token = getAuthToken()
  if (!token) throw new Error("Authentication token not found.")
  return deleteProduit(id, token)
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
    return await fetchCategorieById(id)
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

export async function addCategory(categoryData: Partial<Categorie>): Promise<Categorie> {
  const token = getAuthToken()
  if (!token) throw new Error("Authentication token not found.")
  return createCategorie(categoryData, token)
}

export async function modifyCategory(id: number, categoryData: Partial<Categorie>): Promise<Categorie> {
  const token = getAuthToken()
  if (!token) throw new Error("Authentication token not found.")
  return updateCategorie(id, categoryData, token)
}

export async function removeCategory(id: number): Promise<{ message: string }> {
  const token = getAuthToken()
  if (!token) throw new Error("Authentication token not found.")
  return deleteCategorie(id, token)
}

// Orders
export async function getOrders(): Promise<Commande[]> {
  try {
    const token = getAuthToken()
    if (!token) throw new Error("Authentication token not found.")
    return await fetchCommandes(token)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return []
  }
}

export async function getOrderById(id: number): Promise<Commande | undefined> {
  try {
    const token = getAuthToken()
    if (!token) throw new Error("Authentication token not found.")
    return await fetchCommandeById(id, token)
  } catch (error) {
    console.error(`Error fetching order by ID ${id}:`, error)
    return undefined
  }
}

export async function modifyOrder(id: number, orderData: Partial<Commande>): Promise<Commande> {
  const token = getAuthToken()
  if (!token) throw new Error("Authentication token not found.")
  return updateCommande(id, orderData, token)
}

export async function removeOrder(id: number): Promise<{ message: string }> {
  const token = getAuthToken()
  if (!token) throw new Error("Authentication token not found.")
  return deleteCommande(id, token)
}

// Users (Clients)
export async function getClients(): Promise<User[]> {
  try {
    const token = getAuthToken()
    if (!token) throw new Error("Authentication token not found.")
    return await fetchClients(token)
  } catch (error) {
    console.error("Error fetching clients:", error)
    return []
  }
}

// Dashboard Metrics
export async function getDashboardMetrics(): Promise<DashboardMetrics | undefined> {
  try {
    const token = getAuthToken()
    if (!token) throw new Error("Authentication token not found.")
    return await fetchDashboardMetrics(token)
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error)
    return undefined
  }
}

// Analytics Metrics
export async function getAnalyticsMetrics(): Promise<AnalyticsMetrics | undefined> {
  try {
    const token = getAuthToken()
    if (!token) throw new Error("Authentication token not found.")
    return await fetchAnalyticsMetrics(token)
  } catch (error) {
    console.error("Error fetching analytics metrics:", error)
    return undefined
  }
}
