"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ShoppingBag, User, Menu, X, Heart, MapPin, LogOut, Settings, UserCheck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { useAuth, logout } from "@/lib/auth"
import { useCart } from "@/context/cart-context" // Import useCart

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { getUser, isAuthenticated, isAdmin, isClient: isClientRole } = useAuth()
  const router = useRouter()
  const { cartItemsCount, setIsCartOpen } = useCart() // Get cart state from context

  const [hasMounted, setHasMounted] = useState(false) // NEW: Add hasMounted state

  const categories = ["Vêtements", "Accessoires", "Chaussures", "Autres"]

  // Load user data on initial load
  useEffect(() => {
    setHasMounted(true) // NEW: Set to true after component mounts on client
    if (isAuthenticated()) {
      setUser(getUser())
    }
  }, [isAuthenticated, getUser])

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await logout()
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCartClick = () => {
    setIsCartOpen(true) // Open cart sidebar using context
  }

  const userIsAuthenticated = hasMounted && isAuthenticated()
  const userIsAdmin = hasMounted && isAdmin()
  const userIsClient = hasMounted && isClientRole()

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden transition-all duration-200 hover:scale-105 focus:ring-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          <Link href="/" className="flex items-center space-x-2 cursor-pointer" aria-label="Accueil">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110">
              <span className="text-primary-foreground font-bold text-lg">K</span>
            </div>
            <span className="font-bold text-xl">KreShop</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/product" className="hover:text-primary transition-colors font-medium relative group">
              Produits
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/categories" className="hover:text-primary transition-colors font-medium relative group">
              Catégories
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {hasMounted && userIsAuthenticated && (
              <Link
                href={userIsAdmin ? "/admin" : "/client/dashboard"}
                className="hover:text-primary transition-colors font-medium relative group"
              >
                Dashboard
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Rechercher des produits..." className="pl-10 focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Libreville</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden transition-all duration-200 hover:scale-105 focus:ring-2"
            >
              <Search className="h-5 w-5" />
            </Button>

            {hasMounted && userIsAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                className="transition-all duration-200 hover:scale-105 focus:ring-2"
                onClick={() => router.push("/wishlist")}
              >
                <Heart className="h-5 w-5" />
              </Button>
            )}

            {hasMounted && userIsAuthenticated && userIsClient && (
              <Button
                variant="ghost"
                size="icon"
                className="relative transition-all duration-200 hover:scale-105 focus:ring-2"
                onClick={handleCartClick}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            )}

            {hasMounted ? (
              userIsAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="transition-all duration-200 hover:scale-105 focus:ring-2"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>
                      <div className="px-2 py-1.5 text-sm font-medium">
                        {user.prenom} {user.nom}
                        <div className="flex items-center mt-1">
                          {userIsAdmin ? (
                            <Badge variant="default" className="text-xs">
                              <Shield className="h-3 w-3 mr-1" />
                              Admin
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              <UserCheck className="h-3 w-3 mr-1" />
                              Client
                            </Badge>
                          )}
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link href={userIsAdmin ? "/admin" : "/client/dashboard"}>Dashboard</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/profile">Mon Compte</Link>
                    </DropdownMenuItem>

                    {/* Corrected conditional rendering for multiple DropdownMenuItems */}
                    {userIsClient && (
                      <DropdownMenuItem asChild>
                        <Link href="/orders">Mes Commandes</Link>
                      </DropdownMenuItem>
                    )}
                    {userIsClient && (
                      <DropdownMenuItem asChild>
                        <Link href="/wishlist">Mes Favoris</Link>
                      </DropdownMenuItem>
                    )}

                    {userIsAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/register/admin">Créer Admin</Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem asChild>
                      <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Paramètres
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="text-red-600 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {isLoading ? "Déconnexion..." : "Déconnexion"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="transition-all duration-200 hover:scale-105 focus:ring-2"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/login">Connexion Client</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/login">Connexion Admin</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register/client">S'inscrire Client</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            ) : (
              <Button variant="ghost" size="icon" className="transition-all duration-200 hover:scale-105 focus:ring-2">
                <User className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Rechercher..." className="pl-10 focus:ring-2 focus:ring-primary" />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-muted/50 border-t">
          <nav className="container mx-auto px-4 py-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/product"
                  className="hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Produits
                </Link>
                <Link
                  href="/categories"
                  className="hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Catégories
                </Link>
                {userIsAuthenticated && (
                  <Link
                    href={userIsAdmin ? "/admin" : "/client/dashboard"}
                    className="hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Catégories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/categories/${category.toLowerCase()}`}
                      className="text-muted-foreground hover:text-primary transition-colors py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              {hasMounted && !userIsAuthenticated && (
                <div className="border-t pt-4 space-y-2">
                  <Button asChild className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/login">Connexion Client</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href="/admin/login">Connexion Admin</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href="/register/client">S'inscrire Client</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
