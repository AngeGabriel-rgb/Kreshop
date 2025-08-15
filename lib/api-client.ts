// KRE SHOP API Configuration
const API_BASE_URL = "https://kreshop.onrender.com"

export interface AuthResponse {
  user: {
    id: number
    email: string
    prenom: string
    nom: string
    telephone?: string
    est_actif: boolean
    date_creation: string
    role: "client" | "admin"
  }
  token: string
  role: "client" | "admin"
  message: string
  success: boolean
  expiresIn: string
}

export interface LoginRequest {
  email: string
  password: string // Utilise 'password' au lieu de 'mot_de_passe' pour correspondre au backend
}

export interface RegisterClientRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

export interface Product {
  id: number
  nom: string
  slug: string
  description?: string
  prix_fcfa: number
  prix_promo_fcfa?: number
  stock_disponible: number
  stock_reserve: number
  stock_total: number
  seuil_stock_bas: number
  statut_stock: "EN_STOCK" | "STOCK_FAIBLE" | "RUPTURE_STOCK"
  est_actif: boolean
  categorie_id: number
  date_creation: string
  date_modification: string
  categorie?: Category
  images?: ProductImage[]
  variantes?: ProductVariant[]
  stock_info?: {
    total_disponible: number
    has_low_stock: boolean
    is_out_of_stock: boolean
    statut_global: string
  }
}

export interface ProductVariant {
  id: number
  produit_id: number
  nom: string
  valeur: string
  prix_supplement_fcfa: number
  stock_disponible: number
  stock_reserve: number
  seuil_stock_bas: number
  statut_stock: "EN_STOCK" | "STOCK_FAIBLE" | "RUPTURE_STOCK"
  est_active: boolean
  date_creation: string
  images?: ProductImage[]
}

export interface ProductImage {
  id: number
  produit_id?: number
  variante_id?: number
  url_image: string
  alt_text?: string
  ordre_tri: number
  est_principale: boolean
  date_creation: string
}

export interface Category {
  id: number
  nom: string
  slug: string
  description?: string
  parent_id?: number
  url_image?: string
  est_active: boolean
  ordre_tri: number
  parent?: Category
  sous_categories?: Category[]
  produits?: Product[]
}

export interface Order {
  id: number
  client_id: number
  statut: "EN_ATTENTE" | "CONFIRMEE" | "EXPEDIEE" | "LIVREE" | "ANNULEE"
  total_fcfa: number
  frais_livraison_fcfa: number
  adresse_livraison: string
  telephone_livraison: string
  mode_paiement: "MOBILE_MONEY" | "VIREMENT" | "E_BILLING" | "ESPECES"
  statut_paiement: "EN_ATTENTE" | "PAYE" | "ECHEC"
  date_creation: string
  date_modification: string
  articles?: OrderItem[]
  client?: {
    id: number
    email: string
    prenom: string
    nom: string
    telephone?: string
  }
}

export interface OrderItem {
  id: number
  commande_id: number
  produit_id: number
  variante_id?: number
  quantite: number
  prix_unitaire_fcfa: number
  prix_total_fcfa: number
  produit?: Product
  variante?: ProductVariant
}

export interface CartItem {
  id: number
  client_id: number
  produit_id: number
  variante_id?: number
  quantite: number
  date_creation: string
  date_modification: string
  produit?: Product
  variante?: ProductVariant
}

export interface CreateOrderRequest {
  client_id: number
  statut: "EN_ATTENTE"
  total_fcfa: number
  frais_livraison_fcfa: number
  adresse_livraison: string
  telephone_livraison: string
  mode_paiement: "MOBILE_MONEY" | "VIREMENT" | "E_BILLING" | "ESPECES"
  statut_paiement: "EN_ATTENTE"
}

export interface CreateCartItemRequest {
  client_id: number
  produit_id: number
  variante_id?: number
  quantite: number
}

export interface Address {
  id: number
  client_id: number
  nom_complet: string
  telephone: string
  adresse_ligne_1: string
  adresse_ligne_2?: string
  ville: string
  quartier: string
  code_postal?: string
  pays: string
  est_principale: boolean
  type_adresse: "DOMICILE" | "BUREAU" | "AUTRE"
  date_creation: string
  date_modification: string
}

export interface CreateAddressRequest {
  client_id: number
  nom_complet: string
  telephone: string
  adresse_ligne_1: string
  adresse_ligne_2?: string
  ville: string
  quartier: string
  code_postal?: string
  pays: string
  est_principale: boolean
  type_adresse: "DOMICILE" | "BUREAU" | "AUTRE"
}

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("kre-shop-token")
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("kre-shop-token", token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("kre-shop-token")
      localStorage.removeItem("kre-shop-user")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Authentication API
  async loginClient(credentials: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login/client", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  async registerClient(userData: RegisterClientRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/register/client", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async getProducts(params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
    sort?: string
    minPrice?: number
    maxPrice?: number
    stockStatus?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    return this.request<{
      success: boolean
      data: Product[]
      meta: {
        pagination: {
          page: number
          limit: number
          total: number
          pages: number
        }
        filters: any
      }
    }>(`/products?${searchParams.toString()}`)
  }

  async getProduct(id: string) {
    return this.request<{
      success: boolean
      data: Product
    }>(`/products/${id}`)
  }

  async getProductBySlug(slug: string) {
    return this.request<{
      success: boolean
      data: Product
    }>(`/products/slug/${slug}`)
  }

  async getCategories() {
    return this.request<Category[]>("/categories")
  }

  async getCategory(id: string) {
    return this.request<Category>(`/categories/${id}`)
  }

  async getOrders(): Promise<Order[]> {
    // Cette méthode est réservée aux admins - ne pas utiliser pour les clients
    throw new Error("Accès réservé aux administrateurs. Utilisez getClientOrders() pour les clients.")
  }

  async getOrder(id: number): Promise<Order> {
    return this.request<Order>(`/orders${id}`)
  }

  async getClientOrders(): Promise<Order[]> {
    try {
      const user = JSON.parse(localStorage.getItem("user_data") || "{}")
      if (!user.id) {
        throw new Error("Utilisateur non connecté")
      }

      // Pour l'instant, on récupère une commande spécifique par ID si on en a une
      // En attendant que le backend ajoute un endpoint /orders/client
      return []
    } catch (error) {
      console.warn("Impossible de récupérer les commandes du client:", error)
      return []
    }
  }

  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    return this.request<Order>("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  }

  async updateOrder(id: number, updateData: Partial<Order>): Promise<Order> {
    return this.request<Order>(`/orders${id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    })
  }

  async getOrderItems(): Promise<OrderItem[]> {
    return this.request<OrderItem[]>("/articles")
  }

  async getOrderItem(id: number): Promise<OrderItem> {
    return this.request<OrderItem>(`/articles${id}`)
  }

  async createOrderItem(itemData: Omit<OrderItem, "id">): Promise<OrderItem> {
    return this.request<OrderItem>("/articles", {
      method: "POST",
      body: JSON.stringify(itemData),
    })
  }

  async getCartItems(): Promise<CartItem[]> {
    return this.request<CartItem[]>("/panier")
  }

  async getCartItem(id: number): Promise<CartItem> {
    return this.request<CartItem>(`/panier${id}`)
  }

  async addToCart(itemData: CreateCartItemRequest): Promise<CartItem> {
    return this.request<CartItem>("/panier", {
      method: "POST",
      body: JSON.stringify(itemData),
    })
  }

  async updateCartItem(id: number, updateData: Partial<CartItem>): Promise<CartItem> {
    return this.request<CartItem>(`/panier${id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    })
  }

  async removeFromCart(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/panier/${id}`, {
      method: "DELETE",
    })
  }

  async getAddresses(): Promise<Address[]> {
    return this.request<Address[]>("/adresses")
  }

  async getAddress(id: number): Promise<Address> {
    return this.request<Address>(`/adresses${id}`)
  }

  async createAddress(addressData: CreateAddressRequest): Promise<Address> {
    return this.request<Address>("/adresses", {
      method: "POST",
      body: JSON.stringify(addressData),
    })
  }

  async updateAddress(id: number, updateData: Partial<Address>): Promise<Address> {
    return this.request<Address>(`/adresses${id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    })
  }

  async deleteAddress(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/adresses${id}`, {
      method: "DELETE",
    })
  }

  async getMyAddresses(): Promise<Address[]> {
    try {
      const addresses = await this.getAddresses()
      const user = JSON.parse(localStorage.getItem("user_data") || "{}")

      if (user.id) {
        // Filtre les adresses du client connecté
        return addresses.filter((address) => address.client_id === user.id)
      }

      return []
    } catch (error) {
      console.error("Erreur lors de la récupération des adresses:", error)
      return []
    }
  }

  async getPrimaryAddress(): Promise<Address | null> {
    try {
      const addresses = await this.getMyAddresses()
      return addresses.find((address) => address.est_principale) || null
    } catch (error) {
      console.error("Erreur lors de la récupération de l'adresse principale:", error)
      return null
    }
  }

  async setPrimaryAddress(addressId: number): Promise<void> {
    try {
      const addresses = await this.getMyAddresses()

      // Désactive toutes les adresses principales
      await Promise.all(
        addresses
          .filter((addr) => addr.est_principale && addr.id !== addressId)
          .map((addr) => this.updateAddress(addr.id, { est_principale: false })),
      )

      // Active la nouvelle adresse principale
      await this.updateAddress(addressId, { est_principale: true })
    } catch (error) {
      console.error("Erreur lors de la définition de l'adresse principale:", error)
      throw error
    }
  }

  // Méthodes utilitaires
  async getFeaturedProducts() {
    return this.getProducts({ limit: 8, sort: "date_creation" })
  }

  async getNewProducts() {
    return this.getProducts({ limit: 12, sort: "date_creation" })
  }

  async getBestSellers() {
    return this.getProducts({ limit: 8, sort: "popularite" })
  }

  async getMyOrders(): Promise<Order[]> {
    return this.getClientOrders()
  }

  async getMyCart(): Promise<CartItem[]> {
    return this.getCartItems()
  }

  async clearCart(): Promise<void> {
    const cartItems = await this.getCartItems()
    await Promise.all(cartItems.map((item) => this.removeFromCart(item.id)))
  }
}

export const api = new ApiClient(API_BASE_URL)
export const apiClient = api
export default api
