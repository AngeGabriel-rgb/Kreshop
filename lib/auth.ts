import { fetchApi } from "./api"

// Types spécifiques à l'authentification
export interface AuthResponse {
  user: any
  token: string
  role: 'client' | 'admin'
  message: string
  success?: boolean
  expiresIn?: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterClientPayload {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}

export interface RegisterAdminPayload {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  adminKey?: string // Clé secrète pour créer le premier admin
}

export interface ProfileResponse {
  id: number
  email: string
  prenom: string
  nom: string
  telephone?: string
  est_actif?: boolean
  date_creation: string
  role?: 'client' | 'admin'
}

// Fonction de connexion client
export const loginClient = async (data: LoginPayload): Promise<AuthResponse> => {
  return fetchApi<AuthResponse>("/auth/login/client", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}

// Fonction de connexion admin
export const loginAdmin = async (data: LoginPayload): Promise<AuthResponse> => {
  return fetchApi<AuthResponse>("/auth/login/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}

// Fonction d'inscription client
export const registerClient = async (data: RegisterClientPayload): Promise<AuthResponse> => {
  return fetchApi<AuthResponse>("/auth/register/client", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}

// Fonction d'inscription admin (peut utiliser une clé secrète ou un token d'admin)
export const registerAdmin = async (data: RegisterAdminPayload, token?: string): Promise<AuthResponse> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
  
  // Si un token est fourni, l'utiliser pour l'autorisation
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return fetchApi<AuthResponse>("/auth/register/admin", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
}

// Fonction pour récupérer le profil utilisateur
export const getProfile = async (token: string): Promise<ProfileResponse> => {
  return fetchApi<ProfileResponse>("/auth/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// Fonction pour vérifier si un token est valide
export const verifyToken = async (token: string): Promise<{ valid: boolean; user?: any }> => {
  try {
    const profile = await getProfile(token)
    return { valid: true, user: profile }
  } catch (error) {
    return { valid: false }
  }
}

// Fonction pour déconnecter l'utilisateur
export const logout = async (token?: string): Promise<void> => {
  // Si votre API a un endpoint de déconnexion
  if (token) {
    try {
      await fetchApi("/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      // Ignorer les erreurs de déconnexion côté serveur
      console.warn("Erreur lors de la déconnexion côté serveur:", error)
    }
  }

  // Nettoyer le localStorage
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("userRole")
  }
}

// Hook personnalisé pour l'authentification
export const useAuth = () => {
  const getToken = (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")
    }
    return null
  }

  const getUser = (): any | null => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user")
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  }

  const getUserRole = (): 'client' | 'admin' | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userRole") as 'client' | 'admin' | null
    }
    return null
  }

  const isAuthenticated = (): boolean => {
    return !!getToken()
  }

  const isAdmin = (): boolean => {
    const role = getUserRole()
    return role === "admin"
  }

  const isClient = (): boolean => {
    const role = getUserRole()
    return role === "client"
  }

  const setAuthData = (authResponse: AuthResponse): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", authResponse.token)
      localStorage.setItem("user", JSON.stringify(authResponse.user))
      localStorage.setItem("userRole", authResponse.role)
    }
  }

  const clearAuthData = (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("userRole")
    }
  }

  return {
    getToken,
    getUser,
    getUserRole,
    isAuthenticated,
    isAdmin,
    isClient,
    setAuthData,
    clearAuthData,
    logout,
  }
}
