"use client"

import { useState } from "react"
import { Search, ShoppingBag, User, Menu, X, Heart, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HeaderProps {
  cartItemsCount: number
  onCartClick: () => void
}

export function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const categories = ["Vêtements", "Accessoires", "Chaussures", "Autres"]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-beige-rose shadow-sm">
   
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-brun-chocolat transition-all duration-200 hover:scale-105 hover:bg-corail-doux/10 focus:ring-2 focus:ring-corail-doux"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 cursor-pointer" aria-label="Accueil">
            <div className="w-8 h-8 bg-corail-doux rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110">
              <span className="text-white font-bold text-lg"></span>
            </div>
            <span className="font-display text-xl font-bold text-brun-chocolat">KreShop</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/product" className="text-brun-chocolat hover:text-corail-doux transition-colors font-medium relative group">
              Produits
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-corail-doux transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/categories" className="text-brun-chocolat hover:text-corail-doux transition-colors font-medium relative group">
              Catégories
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-corail-doux transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taupe-fonce h-4 w-4" />
              <Input
                placeholder="Rechercher des vêtements..."
                className="pl-10 border-taupe-rose focus:border-corail-doux"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Location */}
            <div className="hidden lg:flex items-center text-sm text-taupe-fonce">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Libreville</span>
            </div>

            {/* Search Mobile */}
            <Button variant="ghost" size="icon" className="md:hidden text-brun-chocolat transition-all duration-200 hover:scale-105 hover:bg-corail-doux/10 focus:ring-2 focus:ring-corail-doux">
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="text-brun-chocolat transition-all duration-200 hover:scale-105 hover:bg-corail-doux/10 focus:ring-2 focus:ring-corail-doux">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative text-brun-chocolat transition-all duration-200 hover:scale-105 hover:bg-corail-doux/10 focus:ring-2 focus:ring-corail-doux" onClick={onCartClick}>
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-corail-doux text-white text-xs flex items-center justify-center">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-brun-chocolat transition-all duration-200 hover:scale-105 hover:bg-corail-doux/10 focus:ring-2 focus:ring-corail-doux">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Mon Compte</DropdownMenuItem>
                <DropdownMenuItem>Mes Favoris</DropdownMenuItem>
                <DropdownMenuItem>Paramètres</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Déconnexion</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taupe-fonce h-4 w-4" />
            <Input placeholder="Rechercher..." className="pl-10 border-taupe-rose focus:border-corail-doux" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-beige-rose border-t border-taupe-rose">
          <nav className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <a
                  key={category}
                  href="#"
                  className="text-brun-chocolat hover:text-corail-doux transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
