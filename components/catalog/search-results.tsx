import { Badge } from "@/components/ui/badge"

interface SearchResultsProps {
  query: string
  resultCount: number
}

export function SearchResults({ query, resultCount }: SearchResultsProps) {
  return (
    <div className="bg-muted/50 rounded-lg p-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm">Résultats pour:</span>
        <Badge variant="secondary" className="font-medium">
          "{query}"
        </Badge>
        <span className="text-sm text-muted-foreground">
          ({resultCount} produit{resultCount !== 1 ? "s" : ""} trouvé{resultCount !== 1 ? "s" : ""})
        </span>
      </div>
    </div>
  )
}
