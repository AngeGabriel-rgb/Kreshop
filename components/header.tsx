"use client"
import * as React from "react"
import Link from "next/link"
import { Search, User2, Menu, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/lib/auth"
import { CartBadge } from "./cart-badge" // Import du nouveau composant

export function Header() {
  const { isAuthenticated, getUser, logout, clearAuthData } = useAuth()
  const user = getUser()

  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    clearAuthData()
    window.location.href = "/"
  }

  const navLinks = [
    { href: "/products", label: "Produits" },
    { href: "/categories", label: "Catégories" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <span className="font-serif text-xl font-bold text-corail-doux">KreShop</span>
          <span className="sr-only">KreShop</span>
        </Link>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative text-muted-foreground transition-colors hover:text-foreground group"
          >
            {link.label}
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-corail-doux transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 bg-transparent md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <span className="font-serif text-xl font-bold text-corail-doux">KreShop</span>
              <span className="sr-only">KreShop</span>
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            {isMounted ? (
              isAuthenticated() ? (
                <>
                  <Link
                    href="/dashboard"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    Mon Dashboard
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 justify-start text-muted-foreground hover:text-foreground"
                  >
                    Déconnexion
                  </Button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  Connexion
                </Link>
              )
            ) : (
              <div className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground">
                Chargement...
              </div>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher des produits..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <Link href="/panier">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <CartBadge /> {/* Intégration de la pastille du panier */}
            <span className="sr-only">Panier</span>
          </Button>
        </Link>
        {isMounted ? (
          isAuthenticated() ? (
            <Link href="/account">
              <Button variant="secondary" size="icon" className="rounded-full">
                <User2 className="h-5 w-5" />
                <span className="sr-only">Mon Compte</span>
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="secondary" size="sm">
                Connexion
              </Button>
            </Link>
          )
        ) : (
          <Button variant="secondary" size="icon" className="rounded-full animate-pulse">
            <User2 className="h-5 w-5" />
            <span className="sr-only">Chargement...</span>
          </Button>
        )}
      </div>
    </header>
  )
}
