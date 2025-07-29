"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth, logout } from "@/lib/auth"
import { User, LogOut, Shield, UserCheck, Home, UserPlus, Settings } from "lucide-react"

export default function Navigation() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { getUser, isAuthenticated, isAdmin, isClient } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getUser())
    }
  }, [pathname])

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await logout()
      setUser(null)
      router.push("/login")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6" />
              <span className="font-bold text-xl">KreShop</span>
            </Link>

            {!isAuthenticated() && (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/login"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === "/login" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Connexion
                </Link>
                <Link
                  href="/register/client"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === "/register/client" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Inscription Client
                </Link>
              </div>
            )}

            {isAuthenticated() && (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href={isAdmin() ? "/admin/dashboard" : "/client/dashboard"}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname.includes("/dashboard") ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Dashboard
                </Link>
                {isAdmin() && (
                  <Link
                    href="/register/admin"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === "/register/admin" ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    Créer Admin
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated() && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">
                      {user.prenom} {user.nom}
                    </span>
                    <Badge variant={isAdmin() ? "default" : "secondary"} className="ml-2">
                      {isAdmin() ? (
                        <>
                          <Shield className="h-3 w-3 mr-1" />
                          Admin
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-3 w-3 mr-1" />
                          Client
                        </>
                      )}
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Paramètres
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {isLoading ? "Déconnexion..." : "Se déconnecter"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost">
                  <Link href="/login">Connexion</Link>
                </Button>
                <Button asChild>
                  <Link href="/register/client">
                    <UserPlus className="mr-2 h-4 w-4" />
                    S'inscrire
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
 