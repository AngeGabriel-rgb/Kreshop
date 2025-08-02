"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/lib/auth"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ("client" | "admin")[]
  redirectPath?: string
}

export function ProtectedRoute({ children, allowedRoles, redirectPath = "/login" }: ProtectedRouteProps) {
  const { isAuthenticated, getUserRole } = useAuth()
  const router = useRouter()
  const [isChecking, setIsChecking] = React.useState(true)

  React.useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        router.push(redirectPath)
        return
      }

      if (allowedRoles) {
        const userRole = getUserRole()
        if (!userRole || !allowedRoles.includes(userRole)) {
          router.push(redirectPath) // Or a specific unauthorized page
          return
        }
      }
      setIsChecking(false)
    }

    checkAuth()
  }, [isAuthenticated, getUserRole, allowedRoles, redirectPath, router])

  if (isChecking) {
    return (
      <div className="flex min-h-[calc(100svh-12rem)] items-center justify-center">
        <p className="text-lg text-muted-foreground">Chargement de la page sécurisée...</p>
      </div>
    )
  }

  return <>{children}</>
}
