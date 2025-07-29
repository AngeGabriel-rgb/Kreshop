"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
  requireClient?: boolean
  redirectTo?: string
}

export default function ProtectedRoute({
  children,
  requireAuth = false,
  requireAdmin = false,
  requireClient = false,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated, isAdmin, isClient } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      if (requireAuth && !isAuthenticated()) {
        router.push(redirectTo)
        return
      }

      if (requireAdmin && !isAdmin()) {
        router.push("/unauthorized")
        return
      }

      if (requireClient && !isClient()) {
        router.push("/unauthorized")
        return
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [requireAuth, requireAdmin, requireClient, isAuthenticated, isAdmin, isClient, router, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}
