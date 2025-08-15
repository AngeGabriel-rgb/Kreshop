"use client"
 
import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingBag, Menu, User, Heart, MessageCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/lib/auth-context"
import { useCartStore } from "@/lib/cart-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)
  const { getTotalItems } = useCartStore()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    setIsHydrated(true)
    setCartCount(getTotalItems())
  }, [getTotalItems])

  useEffect(() => {
    if (isHydrated) {
      setCartCount(getTotalItems())
    }
  }, [getTotalItems, isHydrated])


  const navigationItems = [
    { name: "Produits", href: "/produits" },
    { name: "Catégories", href: "/categories" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
                        {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-charcoal-black">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-cream-white">
              <SheetHeader>
                <SheetTitle className="text-charcoal-black">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-charcoal-black hover:text-sage-green transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-sage-green/20 pt-4 mt-6">
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/compte"
                        className="flex items-center space-x-2 text-lg font-medium text-charcoal-black hover:text-sage-green transition-colors"
                      >
                        <User className="h-5 w-5" />
                        <span>Mon Compte</span>
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center space-x-2 text-lg font-medium text-charcoal-black hover:text-sage-green transition-colors w-full text-left mt-4"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Se déconnecter</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/connexion"
                        className="flex items-center space-x-2 text-lg font-medium text-charcoal-black hover:text-sage-green transition-colors"
                      >
                        <User className="h-5 w-5" />
                        <span>Se connecter</span>
                      </Link>
                      <Link
                        href="/inscription"
                        className="flex items-center space-x-2 text-lg font-medium text-charcoal-black hover:text-sage-green transition-colors mt-4"
                      >
                        <User className="h-5 w-5" />
                        <span>Créer un compte</span>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>

       
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground rounded-lg p-2">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <span className="font-sans font-bold text-xl hidden sm:block">KRESHOP</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-sm font-medium transition-all duration-300 text-charcoal-black hover:text-sage-green group overflow-hidden px-4 py-2 rounded-lg"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-golden-yellow transition-all duration-300 group-hover:w-full"></div>
                <div className="absolute inset-0 bg-sage-green/10 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left rounded-lg"></div>
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-black/60 h-4 w-4" />
              <Input
                type="search"
                placeholder="Rechercher des produits..."
                className="pl-10 pr-4 border-sage-green/20 focus:border-sage-green bg-white"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-charcoal-black"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Rechercher</span>
            </Button>

            {/* WhatsApp Contact */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://wa.me/+24162489699?text=Bonjour, j'ai une question sur vos produits" target="_blank">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">Contacter sur WhatsApp</span>
              </Link>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" asChild className="text-charcoal-black hover:text-sage-green">
              <Link href="/favoris">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favoris</span>
              </Link>
            </Button>

            {/* Account - Desktop */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden sm:flex">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Mon compte</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user?.prenom} {user?.nom}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/compte">Mon compte</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/compte?tab=orders">Mes commandes</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/compte?tab=favorites">Mes favoris</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
                <Link href="/connexion">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Se connecter</span>
                </Link>
              </Button>
            )}
            
                        {/* Cart */}
            <Button variant="ghost" size="icon" asChild className="relative text-charcoal-black hover:text-sage-green">
              <Link href="/panier">
                <ShoppingBag className="h-5 w-5" />
                {isHydrated && cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-golden-yellow text-charcoal-black animate-pulse">
                    {cartCount}
                  </Badge>
                )}
                <span className="sr-only">Panier ({cartCount})</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t border-sage-green/20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-black/60 h-4 w-4" />
              <Input
                type="search"
                placeholder="Rechercher des produits..."
                className="pl-10 pr-4 border-sage-green/20 focus:border-sage-green bg-white"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
