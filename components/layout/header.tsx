"use client"

import type React from "react"

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
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
  gradient: string
  iconColor: string
}

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: "easeInOut" },
      scale: { duration: 0.5, type: "spring" as const, stiffness: 300, damping: 25 },
    },
  },
}

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
}

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)
  const { getTotalItems } = useCartStore()
  const { user, isAuthenticated, logout } = useAuth()
  const { theme } = useTheme()

  useEffect(() => {
    setIsHydrated(true)
    setCartCount(getTotalItems())
  }, [getTotalItems])

  useEffect(() => {
    if (isHydrated) {
      setCartCount(getTotalItems())
    }
  }, [getTotalItems, isHydrated])

  const navigationItems: MenuItem[] = [
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      label: "Produits",
      href: "/produits",
      gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
      iconColor: "text-sage-green",
    },
    {
      icon: <Menu className="h-5 w-5" />,
      label: "Catégories",
      href: "/categories",
      gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
      iconColor: "text-golden-yellow",
    },
  ]

  const isDarkTheme = theme === "dark"

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
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-background border-border">
              <SheetHeader>
                <SheetTitle className="text-foreground">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center space-x-2 text-lg font-medium text-foreground hover:text-sage-green transition-all duration-300 group px-2 py-1 relative"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-golden-yellow transition-all duration-300 group-hover:w-full"></div>
                  </Link>
                ))}
                <div className="border-t border-border pt-4 mt-6">
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/compte"
                        className="flex items-center space-x-2 text-lg font-medium text-foreground hover:text-sage-green transition-all duration-300 group px-2 py-1 relative"
                      >
                        <User className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                        <span className="relative z-10">Mon Compte</span>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-golden-yellow transition-all duration-300 group-hover:w-full"></div>
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center space-x-2 text-lg font-medium text-foreground hover:text-sage-green transition-all duration-300 w-full text-left mt-4 group px-2 py-1 relative"
                      >
                        <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                        <span className="relative z-10">Se déconnecter</span>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-golden-yellow transition-all duration-300 group-hover:w-full"></div>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/connexion"
                        className="flex items-center space-x-2 text-lg font-medium text-foreground hover:text-sage-green transition-all duration-300 group px-2 py-1 relative"
                      >
                        <User className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                        <span className="relative z-10">Se connecter</span>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-golden-yellow transition-all duration-300 group-hover:w-full"></div>
                      </Link>
                      <Link
                        href="/inscription"
                        className="flex items-center space-x-2 text-lg font-medium text-foreground hover:text-sage-green transition-all duration-300 mt-4 group px-2 py-1 relative"
                      >
                        <User className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                        <span className="relative z-10">Créer un compte</span>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-golden-yellow transition-all duration-300 group-hover:w-full"></div>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              className="bg-gradient-to-br from-sage-green to-golden-yellow text-white rounded-xl p-2.5 shadow-lg group-hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="h-6 w-6" />
            </motion.div>
            <motion.span
              className="font-sans font-bold text-xl text-foreground group-hover:text-sage-green transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
            >
              KRESHOP
            </motion.span>
          </Link>

          {/* Animated Navigation */}
          <motion.nav
            className="hidden md:flex p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg relative overflow-hidden"
            initial="initial"
            whileHover="hover"
          >
            <motion.div
              className={`absolute -inset-2 bg-gradient-radial from-transparent ${
                isDarkTheme
                  ? "via-sage-green/30 via-30% via-golden-yellow/30 via-60% via-sage-green/30 via-90%"
                  : "via-sage-green/20 via-30% via-golden-yellow/20 via-60% via-sage-green/20 via-90%"
              } to-transparent rounded-3xl z-0 pointer-events-none`}
              variants={navGlowVariants}
            />
            <ul className="flex items-center gap-2 relative z-10">
              {navigationItems.map((item) => (
                <motion.li key={item.label} className="relative">
                  <motion.div
                    className="block rounded-xl overflow-visible group relative"
                    style={{ perspective: "600px" }}
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.div
                      className="absolute inset-0 z-0 pointer-events-none"
                      variants={glowVariants}
                      style={{
                        background: item.gradient,
                        opacity: 0,
                        borderRadius: "16px",
                      }}
                    />
                    <motion.a
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent text-charcoal-black group-hover:text-sage-green transition-colors rounded-xl"
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
                    >
                      <span className={`transition-colors duration-300 group-hover:${item.iconColor}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </motion.a>
                    <motion.a
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent text-charcoal-black group-hover:text-sage-green transition-colors rounded-xl"
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
                    >
                      <span className={`transition-colors duration-300 group-hover:${item.iconColor}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </motion.a>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

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
            <Button variant="ghost" size="icon" asChild className="relative group overflow-hidden">
              <Link href="https://wa.me/+24162489699?text=Bonjour, j'ai une question sur vos produits" target="_blank">
                <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-green-500/10 scale-0 transition-transform duration-300 group-hover:scale-100 rounded-md"></div>
                <span className="sr-only">Contacter sur WhatsApp</span>
              </Link>
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative group overflow-hidden text-charcoal-black hover:text-sage-green"
            >
              <Link href="/favoris">
                <Heart className="h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:fill-red-500 group-hover:text-red-500" />
                <div className="absolute inset-0 bg-red-500/10 scale-0 transition-transform duration-300 group-hover:scale-100 rounded-md"></div>
                <span className="sr-only">Favoris</span>
              </Link>
            </Button>

            {/* Account - Desktop */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden sm:flex relative group overflow-hidden">
                    <User className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-sage-green/10 scale-0 transition-transform duration-300 group-hover:scale-100 rounded-md"></div>
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
              <Button variant="ghost" size="icon" asChild className="hidden sm:flex relative group overflow-hidden">
                <Link href="/connexion">
                  <User className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-sage-green/10 scale-0 transition-transform duration-300 group-hover:scale-100 rounded-md"></div>
                  <span className="sr-only">Se connecter</span>
                </Link>
              </Button>
            )}

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative group overflow-hidden text-charcoal-black hover:text-sage-green"
            >
              <Link href="/panier">
                <ShoppingBag className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-golden-yellow/10 scale-0 transition-transform duration-300 group-hover:scale-100 rounded-md"></div>
                {isHydrated && cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-golden-yellow text-charcoal-black animate-pulse transition-transform duration-300 group-hover:scale-110">
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
          <div className="md:hidden py-4 border-t border-border">
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
