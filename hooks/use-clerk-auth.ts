import { useUser } from "@clerk/nextjs"
import { useCallback } from "react"

export function useClerkAuth() {
  const { user, isSignedIn, isLoaded } = useUser()

  const isAuthenticated = isSignedIn
  const isAdmin = user?.publicMetadata?.role === "admin"
  const isClient = user?.publicMetadata?.role === "client" || (!user?.publicMetadata?.role && isSignedIn)

  const getUser = useCallback(() => {
    if (!user) return null
    
    return {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || "",
      prenom: user.firstName || "",
      nom: user.lastName || "",
      telephone: user.publicMetadata?.telephone as string || "",
      role: user.publicMetadata?.role as "client" | "admin" || "client",
      est_actif: true,
      date_creation: user.createdAt?.toISOString() || "",
    }
  }, [user])

  const getToken = useCallback(async () => {
    if (!user) return null
    return await user.getToken()
  }, [user])

  return {
    user: getUser(),
    isAuthenticated,
    isAdmin,
    isClient,
    isLoaded,
    getToken,
    getUser,
  }
}
