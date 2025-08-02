"use client"
import * as React from "react" // Assurez-vous que React est importé pour useState et useEffect
import Link from "next/link"
import { Search, User2, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/lib/auth"

import { CartSidebar } from "./cart-sidebar"

export function Header() {
  const { isAuthenticated, getUser, logout, clearAuthData } = useAuth()
  const user = getUser()

  // État pour contrôler le rendu du contenu dépendant du client
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    clearAuthData()
    window.location.href = "/" // Rediriger vers l'accueil après la déconnexion
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <span className="font-serif text-xl font-bold text-corail-doux">KreShop</span>
          <span className="sr-only">KreShop</span>
        </Link>
        <Link href="/products" className="text-muted-foreground transition-colors hover:text-foreground">
          Produits
        </Link>
        <Link href="/categories" className="text-muted-foreground transition-colors hover:text-foreground">
          Catégories
        </Link>
        <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
          Contact
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-transparent">
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
            <Link
              href="/products"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              Produits
            </Link>
            <Link
              href="/categories"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              Catégories
            </Link>
            <Link
              href="/contact"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
            {/* Rendre cette section uniquement après le montage côté client */}
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
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground justify-start"
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
              // Placeholder pendant le montage pour éviter le décalage d'hydratation
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
        <CartSidebar />
        {/* Rendre cette section uniquement après le montage côté client */}
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
          // Placeholder pendant le montage pour éviter le décalage d'hydratation
          <Button variant="secondary" size="icon" className="rounded-full animate-pulse">
            <User2 className="h-5 w-5" />
            <span className="sr-only">Chargement...</span>
          </Button>
        )}
      </div>
    </header>
  )
}
