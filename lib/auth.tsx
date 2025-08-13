// lib/auth.ts
"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { fetchApi, type User, getAuthToken, clearAuth, isAuthenticated, isAdmin, isClient } from "./api" // Import from the new api.ts

// Types spécifiques à l'authentification
export interface AuthResponse {
  user: User
  token: string
  role: "client" | "admin"
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
  prenom: string // Changed from firstName
  nom: string // Changed from lastName
  telephone: string
}

export interface RegisterAdminPayload {
  email: string
  password: string
  prenom: string // Changed from firstName
  nom: string // Changed from lastName
  telephone?: string
  adminKey?: string
}

export interface ProfileResponse extends User {} // ProfileResponse is now directly User

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
  console.log("registerClient appelé avec:", data)
  try {
    const response = await fetchApi<AuthResponse>("/auth/register/client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    console.log("registerClient réponse:", response)
    return response
  } catch (error) {
    console.error("registerClient erreur:", error)
    throw error
  }
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
export const verifyToken = async (token: string): Promise<{ valid: boolean; user?: User }> => {
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
  clearAuth()
}

// Hook personnalisé pour l'authentification
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  isClient: boolean
  login: (email: string, password: string, role: "client" | "admin") => Promise<{ success: boolean; message: string }>
  register: (
    name: string,
    email: string,
    password: string,
    phone: string,
    role: "client" | "admin",
  ) => Promise<{ success: boolean; message: string }>
  logout: () => void
  getToken: () => string | null
  getUser: () => User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const storedToken = getAuthToken()
      if (storedToken) {
        try {
          const { valid, user: fetchedUser } = await verifyToken(storedToken)
          if (valid && fetchedUser) {
            setUser(fetchedUser)
          } else {
            clearAuth()
          }
        } catch (error) {
          console.error("Failed to verify token:", error)
          clearAuth()
        }
      }
      setLoading(false)
    }
    loadUserFromStorage()
  }, [])

  const setAuthData = useCallback((authResponse: AuthResponse): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", authResponse.token)
      localStorage.setItem("user", JSON.stringify(authResponse.user))
      localStorage.setItem("userRole", authResponse.role)
    }
  }, [])

  const login = useCallback(
    async (email: string, password: string, role: "client" | "admin") => {
      setLoading(true)
      try {
        let authResponse: AuthResponse
        if (role === "admin") {
          authResponse = await loginAdmin({ email, password })
        } else {
          authResponse = await loginClient({ email, password })
        }

        setAuthData(authResponse)
        setUser(authResponse.user)
        return { success: true, message: authResponse.message || "Connexion réussie !" }
      } catch (error: any) {
        console.error("Login error:", error)
        clearAuth()
        return { success: false, message: error.message || "Email ou mot de passe incorrect." }
      } finally {
        setLoading(false)
      }
    },
    [setAuthData],
  )

  const register = useCallback(
    async (name: string, email: string, password: string, phone: string, role: "client" | "admin") => {
      setLoading(true)
      try {
        let authResponse: AuthResponse
        const [prenom, nom] = name.split(" ", 2) // Simple split for name

        // Validation des données avant envoi
        if (!prenom || !nom || !email || !password || !phone) {
          return { 
            success: false, 
            message: "Tous les champs sont obligatoires." 
          }
        }

        if (password.length < 6) {
          return { 
            success: false, 
            message: "Le mot de passe doit contenir au moins 6 caractères." 
          }
        }

        console.log("Tentative d'inscription avec les données:", { prenom, nom, email, telephone: phone, role })

        if (role === "admin") {
          authResponse = await registerAdmin({ prenom, nom: nom || "", email, password, telephone: phone })
        } else {
          authResponse = await registerClient({ prenom, nom: nom || "", email, password, telephone: phone })
        }

        setAuthData(authResponse)
        setUser(authResponse.user)
        return { success: true, message: authResponse.message || "Inscription réussie !" }
      } catch (error: any) {
        console.error("Register error details:", {
          message: error.message,
          status: error.status,
          code: error.code,
          details: error.details
        })
        
        // Gestion spécifique des erreurs
        let errorMessage = "Erreur d'inscription."
        
        if (error.status === 500) {
          errorMessage = "Erreur serveur. Le service d'inscription est temporairement indisponible."
        } else if (error.status === 409) {
          errorMessage = "Un compte avec cet email existe déjà."
        } else if (error.status === 422) {
          errorMessage = "Données invalides. Vérifiez vos informations."
        } else if (error.message) {
          errorMessage = error.message
        }
        
        clearAuth()
        return { success: false, message: errorMessage }
      } finally {
        setLoading(false)
      }
    },
    [setAuthData],
  )

  const handleLogout = useCallback(async () => {
    const token = getAuthToken()
    await logout(token || undefined)
    setUser(null)
  }, [])

  const currentIsAuthenticated = isAuthenticated()
  const currentIsAdmin = isAdmin()
  const currentIsClient = isClient()

  const getToken = useCallback(() => {
    return getAuthToken()
  }, [])

  const contextValue = React.useMemo(
    () => ({
      user,
      isAuthenticated: currentIsAuthenticated,
      isAdmin: currentIsAdmin,
      isClient: currentIsClient,
      login,
      register,
      logout: handleLogout,
      getToken,
      getUser: () => user, // Return current user state
    }),
    [user, currentIsAuthenticated, currentIsAdmin, currentIsClient, login, register, handleLogout],
  )

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-beige-creme">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-corail-intensifie"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
