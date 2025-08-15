"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, Star } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import type { Product, ViewMode } from "./product-catalog"

interface ProductGridProps {
  products: Product[]
  viewMode: ViewMode
  searchQuery: string
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("fr-FR", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price) + " FCFA"
  )
}

function highlightText(text: string, query: string) {
  if (!query) return text

  const regex = new RegExp(`(${query})`, "gi")
  const parts = text.split(regex)

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-secondary/50 px-1 rounded">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

export function ProductGrid({
  products,
  viewMode,
  searchQuery,
  currentPage,
  totalPages,
  onPageChange,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Aucun produit trouvé</p>
          <p className="text-sm">Essayez de modifier vos filtres ou votre recherche</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Products Grid/List */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} viewMode={viewMode} searchQuery={searchQuery} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) onPageChange(currentPage - 1)
                  }}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const page = i + 1
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        onPageChange(page)
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              {totalPages > 5 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) onPageChange(currentPage + 1)
                  }}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

function ProductCard({
  product,
  viewMode,
  searchQuery,
}: { product: Product; viewMode: ViewMode; searchQuery: string }) {
  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-0">
          <div className="flex gap-4 p-4">
            <div className="relative w-32 h-32 flex-shrink-0">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-md"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                  <span className="text-white text-xs font-medium">Rupture</span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <h3 className="font-semibold text-lg leading-tight">{highlightText(product.name, searchQuery)}</h3>
                </div>
                <Button variant="ghost" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                  <span className="text-sm ml-1">{product.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
                </div>
                {product.isNew && <Badge variant="secondary">Nouveau</Badge>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="price-fcfa text-primary text-lg">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/produit/${product.id}`}>Voir</Link>
                  </Button>
                  <Button size="sm" className="btn-primary" disabled={!product.inStock}>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    {product.inStock ? "Ajouter" : "Rupture"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={400}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.isNew && (
            <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">Nouveau</Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium">Rupture de stock</span>
            </div>
          )}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="outline" size="icon" className="bg-background/80 hover:bg-background">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 space-y-3">
        <div className="w-full">
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <h3 className="font-semibold text-lg leading-tight">{highlightText(product.name, searchQuery)}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-secondary text-secondary" />
              <span className="text-sm ml-1">{product.rating}</span>
              <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <span className="price-fcfa text-primary text-lg">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
        <div className="flex space-x-2 w-full">
          <Button asChild variant="outline" className="flex-1 bg-transparent">
            <Link href={`/produit/${product.id}`}>Voir</Link>
          </Button>
          <Button className="btn-primary flex-1" disabled={!product.inStock}>
            <ShoppingBag className="h-4 w-4 mr-2" />
            {product.inStock ? "Ajouter" : "Rupture"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
