"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
  redirectTo?: string
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
  requireAdmin = false,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Vérification immédiate sans dépendances problématiques
    if (requireAuth && !isAuthenticated()) {
      router.push(redirectTo)
    } else if (requireAdmin && !isAdmin()) {
      router.push("/unauthorized")
    } else {
      setIsLoading(false)
    }
  }, []) // Aucune dépendance - se déclenche une seule fois au montage

  if (isLoading || (requireAuth && !isAuthenticated()) || (requireAdmin && !isAdmin())) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return <>{children}</>
}
