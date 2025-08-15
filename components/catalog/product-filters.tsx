"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { Filters, Product } from "./product-catalog"

interface ProductFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  products: Product[]
}

function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("fr-FR", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price) + " FCFA"
  )
}

export function ProductFilters({ filters, onFiltersChange, products }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState(filters.priceRange)

  // Extract unique values from products
  const categories = [...new Set(products.map((p) => p.category))]
  const sizes = [...new Set(products.flatMap((p) => p.sizes))]
  const colors = [...new Set(products.flatMap((p) => p.colors))]

  const updateFilters = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key: "category" | "sizes" | "colors", value: string) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilters(key, newArray)
  }

  const clearAllFilters = () => {
    onFiltersChange({
      category: [],
      priceRange: [0, 100000],
      sizes: [],
      colors: [],
      inStock: false,
      isNew: false,
    })
    setPriceRange([0, 100000])
  }

  const hasActiveFilters =
    filters.category.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.inStock ||
    filters.isNew ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 100000

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Filtres actifs</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Tout effacer
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {filters.category.map((cat) => (
                <Badge key={cat} variant="secondary" className="cursor-pointer">
                  {cat}
                  <X className="h-3 w-3 ml-1" onClick={() => toggleArrayFilter("category", cat)} />
                </Badge>
              ))}
              {filters.sizes.map((size) => (
                <Badge key={size} variant="secondary" className="cursor-pointer">
                  {size}
                  <X className="h-3 w-3 ml-1" onClick={() => toggleArrayFilter("sizes", size)} />
                </Badge>
              ))}
              {filters.colors.map((color) => (
                <Badge key={color} variant="secondary" className="cursor-pointer">
                  {color}
                  <X className="h-3 w-3 ml-1" onClick={() => toggleArrayFilter("colors", color)} />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Prix (FCFA)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            onValueCommit={(value) => updateFilters("priceRange", value)}
            max={100000}
            min={0}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Catégories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.category.includes(category)}
                onCheckedChange={() => toggleArrayFilter("category", category)}
              />
              <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Tailles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={filters.sizes.includes(size) ? "default" : "outline"}
                size="sm"
                className="h-8 text-xs"
                onClick={() => toggleArrayFilter("sizes", size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Couleurs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={filters.colors.includes(color)}
                onCheckedChange={() => toggleArrayFilter("colors", color)}
              />
              <Label htmlFor={`color-${color}`} className="text-sm cursor-pointer">
                {color}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Disponibilité</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock}
              onCheckedChange={(checked) => updateFilters("inStock", checked)}
            />
            <Label htmlFor="in-stock" className="text-sm cursor-pointer">
              En stock uniquement
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is-new"
              checked={filters.isNew}
              onCheckedChange={(checked) => updateFilters("isNew", checked)}
            />
            <Label htmlFor="is-new" className="text-sm cursor-pointer">
              Nouveautés
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
