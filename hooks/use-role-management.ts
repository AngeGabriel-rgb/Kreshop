import { useState, useCallback } from "react"
import { useUser } from "@clerk/nextjs"
import { useClerkAuth } from "@/hooks/use-clerk-auth" // Use new Clerk auth hook
import { useClient } from "@/components/client-provider"

export function useRoleManagement() {
  const { user } = useUser()
  const { getToken } = useClerkAuth()
  const { showSuccess, showError } = useClient()
  const [isLoading, setIsLoading] = useState(false)

  const assignRole = useCallback(async (email: string, role: "admin" | "client") => {
    if (!user) {
      showError("Vous devez être connecté pour attribuer des rôles")
      return false
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/assign-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`
        },
        body: JSON.stringify({ email, role })
      })

      if (response.ok) {
        const result = await response.json()
        showSuccess(result.message)
        return true
      } else {
        const error = await response.json()
        showError(error.error || "Erreur lors de l'attribution du rôle")
        return false
      }
    } catch (error) {
      showError("Erreur lors de la communication avec le serveur")
      return false
    } finally {
      setIsLoading(false)
    }
  }, [user, showSuccess, showError])

  const assignAdminRole = useCallback(async (email: string) => {
    return await assignRole(email, "admin")
  }, [assignRole])

  const assignClientRole = useCallback(async (email: string) => {
    return await assignRole(email, "client")
  }, [assignRole])

  const assignRoleToSelf = useCallback(async (role: "admin" | "client") => {
    if (!user?.emailAddresses[0]?.emailAddress) {
      showError("Email non disponible")
      return false
    }

    const success = await assignRole(user.emailAddresses[0].emailAddress, role)
    if (success) {
      // Recharger la page pour mettre à jour l'interface
      setTimeout(() => window.location.reload(), 1000)
    }
    return success
  }, [user, assignRole, showError])

  const getUserInfo = useCallback(async (email: string) => {
    try {
      const response = await fetch(`/api/admin/assign-role?email=${encodeURIComponent(email)}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })

      if (response.ok) {
        return await response.json()
      } else {
        const error = await response.json()
        showError(error.error || "Erreur lors de la récupération des informations")
        return null
      }
    } catch (error) {
      showError("Erreur lors de la communication avec le serveur")
      return null
    }
  }, [user, showError])

  return {
    isLoading,
    assignRole,
    assignAdminRole,
    assignClientRole,
    assignRoleToSelf,
    getUserInfo,
    canManageRoles: user?.publicMetadata?.role === "admin"
  }
}
