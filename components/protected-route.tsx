"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Skeleton } from "@/components/ui/skeleton"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ("client" | "admin")[]
  redirectPath?: string
}

export function ProtectedRoute({ children, allowedRoles, redirectPath = "/login" }: ProtectedRouteProps) {
  const { user, isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(redirectPath)
    } else if (isLoaded && isSignedIn && allowedRoles && user) {
      const userRole = user.publicMetadata?.role as string
      if (!userRole || !allowedRoles.includes(userRole as "client" | "admin")) {
        // If authenticated but role not allowed, redirect to a default page or access denied
        router.push("/") // Redirect to home or an access denied page
      }
    }
  }, [isSignedIn, isLoaded, user, allowedRoles, redirectPath, router])

  if (!isLoaded) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-beige-creme">
        <Skeleton className="h-16 w-16 rounded-full" />
      </div>
    )
  }

  if (!isSignedIn) {
    return null // Or a loading spinner
  }

  if (allowedRoles && user) {
    const userRole = user.publicMetadata?.role as string
    if (!userRole || !allowedRoles.includes(userRole as "client" | "admin")) {
      return (
        <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-beige-creme p-4 text-brun-chocolat">
          <h1 className="mb-4 text-4xl font-bold">Accès Refusé</h1>
          <p className="text-lg">Vous n&apos;avez pas les permissions nécessaires pour accéder à cette page.</p>
          <Button asChild className="mt-6 bg-corail-intensifie text-white hover:bg-corail-doux">
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
        </div>
      )
    }
  }

  return <>{children}</>
}
