"use client"

import { fetchApi } from "./api"
import { useCallback } from "react"

// Types spécifiques à l'authentification
export interface AuthResponse {
  token: string
  client?: any
  admin?: any
  user?: any
  success?: boolean
  message?: string
  expiresIn?: string
  role?: string // Ajout du champ role
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
}

export interface ProfileResponse {
  id: number
  email: string
  prenom: string
  nom: string
  telephone?: string
  est_actif?: boolean
  date_creation: string
}

// Fonction de connexion
export const login = async (data: LoginPayload): Promise<AuthResponse> => {
  return fetchApi<AuthResponse>("/auth/login", {
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

// Fonction d'inscription admin (nécessite un token d'admin)
export const registerAdmin = async (data: RegisterAdminPayload, token: string): Promise<AuthResponse> => {
  return fetchApi<AuthResponse>("/auth/register/admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
  }
}

// Hook personnalisé pour l'authentification (optionnel)
export const useAuth = () => {
  const getToken = useCallback((): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")
    }
    return null
  }, [])

  const getUser = useCallback((): any | null => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user")
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  }, [])

  const isAuthenticated = useCallback((): boolean => {
    return !!getToken()
  }, [getToken]) // Dependency on getToken

  const isAdmin = useCallback((): boolean => {
    const user = getUser()
    // Utilise le champ 'role' directement si disponible, sinon l'ancienne logique
    return user?.role === "admin" || !!user?.admin
  }, [getUser])

  const isClient = useCallback((): boolean => {
    const user = getUser()
    // Utilise le champ 'role' directement si disponible, sinon l'ancienne logique
    return user?.role === "client" || !!user?.client
  }, [getUser])

  return {
    getToken,
    getUser,
    isAuthenticated,
    isAdmin,
    isClient,
    logout,
  }
}
