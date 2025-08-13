"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Types pour l'authentification
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

export interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isAdmin: boolean
  isClient: boolean
  login: (email: string, password: string, role?: "client" | "admin") => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  getToken: () => string | null
  loading: boolean
}

export interface RegisterData {
  email: string
  password: string
  prenom: string
  nom: string
  telephone?: string
  role?: "client" | "admin"
}

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook pour utiliser le contexte d'authentification
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Provider d'authentification
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setToken(storedToken)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing stored user data:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  // Fonction de connexion
  const login = async (email: string, password: string, role: "client" | "admin" = "client") => {
    try {
      const endpoint = role === "admin" ? "/auth/admin/login" : "/auth/client/login"
      const response = await fetch(`https://kreshop.onrender.com${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Échec de la connexion")
      }

      const data = await response.json()
      const { token: authToken, user: userData } = data

      // Stocker les données d'authentification
      localStorage.setItem("token", authToken)
      localStorage.setItem("user", JSON.stringify(userData))
      localStorage.setItem("userRole", role)

      setToken(authToken)
      setUser(userData)

      // Redirection selon le rôle
      if (role === "admin") {
        router.push("/admin")
      } else {
        router.push("/account")
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  // Fonction d'inscription
  const register = async (userData: RegisterData) => {
    try {
      const role = userData.role || "client"
      const endpoint = role === "admin" ? "/auth/admin/register" : "/auth/client/register"

      const response = await fetch(`https://kreshop.onrender.com${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Échec de l'inscription")
      }

      const data = await response.json()
      const { token: authToken, user: newUser } = data

      // Stocker les données d'authentification
      localStorage.setItem("token", authToken)
      localStorage.setItem("user", JSON.stringify(newUser))
      localStorage.setItem("userRole", role)

      setToken(authToken)
      setUser(newUser)

      // Redirection selon le rôle
      if (role === "admin") {
        router.push("/admin")
      } else {
        router.push("/account")
      }
    } catch (error) {
      console.error("Register error:", error)
      throw error
    }
  }

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("userRole")
    setToken(null)
    setUser(null)
    router.push("/")
  }

  // Fonction pour obtenir le token
  const getToken = () => {
    return token || localStorage.getItem("token")
  }

  // Valeurs calculées
  const isAuthenticated = !!token && !!user
  const isAdmin = user?.role === "admin"
  const isClient = user?.role === "client"

  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isAdmin,
    isClient,
    login,
    register,
    logout,
    getToken,
    loading,
  }

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
