// components/header.tsx
"use client"

import Link from "next/link"
import { Menu, X, LogIn, LogOut, Package2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useUser, SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs"
import { CartBadge } from "./cart-badge"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isSignedIn } = useUser()

  const isAdmin = user?.publicMetadata?.role === "admin"

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Produits", href: "/products" },
    { name: "Catégories", href: "/categories" },
    // Only show "Mon Compte" if authenticated
    ...(isSignedIn ? [{ name: "Mon Compte", href: "/account" }] : []),
    // Only show "Admin" if admin
    ...(isAdmin ? [{ name: "Admin", href: "/admin" }] : []),
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-beige-creme/95 backdrop-blur-sm supports-[backdrop-filter]:bg-beige-creme/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-brun-chocolat">
          <Package2 className="h-6 w-6" />
          <span>KreShop</span>
          <span className="sr-only">Retour à l&apos;accueil</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-4 md:flex lg:space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-md font-medium text-brun-chocolat transition-colors hover:text-corail-intensifie"
            >
              {link.name}
            </Link>
          ))}
          <CartBadge />
          {isSignedIn ? (
            <SignOutButton>
              <Button variant="ghost" className="text-brun-chocolat hover:text-corail-intensifie">
                <LogOut className="h-5 w-5 mr-2" /> Déconnexion
            </Button>
            </SignOutButton>
          ) : (
            <>
              <SignInButton>
                <Button variant="ghost" className="text-brun-chocolat hover:text-corail-intensifie">
                  <LogIn className="h-5 w-5 mr-2" /> Connexion
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-corail-intensifie text-white hover:bg-corail-doux">Inscription</Button>
              </SignUpButton>
            </>
          )}
        </nav>

        {/* Mobile Navigation (Sheet) */}
        <div className="flex items-center gap-2 md:hidden">
          <CartBadge />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-brun-chocolat">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu mobile</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-3/4 flex-col bg-beige-creme sm:max-w-xs">
              <div className="flex items-center justify-between border-b pb-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-bold text-brun-chocolat"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Package2 className="h-6 w-6" />
                  <span>KreShop</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Fermer le menu</span>
                </Button>
              </div>
              <nav className="flex flex-col gap-4 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-brun-chocolat hover:text-corail-intensifie"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-4 border-t pt-4">
                  {isSignedIn ? (
                    <SignOutButton>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-lg text-brun-chocolat hover:text-corail-intensifie"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <LogOut className="h-5 w-5 mr-2" /> Déconnexion
                      </Button>
                    </SignOutButton>
                  ) : (
                    <>
                      <SignInButton>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-lg text-brun-chocolat hover:text-corail-intensifie"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <LogIn className="h-5 w-5 mr-2" /> Connexion
                        </Button>
                      </SignInButton>
                      <SignUpButton>
                        <Button
                          className="mt-2 w-full justify-center bg-corail-intensifie text-lg text-white hover:bg-corail-doux"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Inscription
                        </Button>
                      </SignUpButton>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
