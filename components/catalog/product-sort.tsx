"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SortOption } from "./product-catalog"

interface ProductSortProps {
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
}

export function ProductSort({ sortBy, onSortChange }: ProductSortProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground hidden sm:block">Trier par:</span>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popularity">Popularité</SelectItem>
          <SelectItem value="newest">Nouveautés</SelectItem>
          <SelectItem value="price-asc">Prix croissant</SelectItem>
          <SelectItem value="price-desc">Prix décroissant</SelectItem>
          <SelectItem value="rating">Meilleures notes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
