"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, ThumbsUp, Camera } from "lucide-react"

interface ProductReviewsProps {
  productId: number
  rating: number
  reviewCount: number
}

const mockReviews = [
  {
    id: 1,
    author: "Marie N.",
    location: "Libreville",
    rating: 5,
    date: "2024-01-15",
    comment:
      "Magnifique robe ! La qualité du tissu wax est exceptionnelle et la coupe est parfaite. Je la recommande vivement.",
    verified: true,
    helpful: 12,
    images: ["/placeholder.svg?height=100&width=100"],
  },
  {
    id: 2,
    author: "Sylvie M.",
    location: "Akanda",
    rating: 4,
    date: "2024-01-10",
    comment:
      "Très belle robe, conforme à la description. Livraison rapide. Juste un peu serrée au niveau des hanches pour moi.",
    verified: true,
    helpful: 8,
    images: [],
  },
  {
    id: 3,
    author: "Grace O.",
    location: "Owendo",
    rating: 5,
    date: "2024-01-05",
    comment: "Parfaite pour les occasions spéciales ! Le motif wax est authentique et les finitions sont soignées.",
    verified: true,
    helpful: 15,
    images: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
  },
]

export function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">("recent")

  const sortedReviews = [...mockReviews].sort((a, b) => {
    switch (sortBy) {
      case "helpful":
        return b.helpful - a.helpful
      case "rating":
        return b.rating - a.rating
      case "recent":
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  const ratingDistribution = [
    { stars: 5, count: 18, percentage: 75 },
    { stars: 4, count: 4, percentage: 17 },
    { stars: 3, count: 2, percentage: 8 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 },
  ]

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Avis clients</span>
            <Button variant="outline" size="sm">
              Écrire un avis
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{rating}</div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(rating) ? "fill-secondary text-secondary" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Basé sur {reviewCount} avis</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center space-x-2 text-sm">
                  <span className="w-8">{item.stars}★</span>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                  <span className="w-8 text-muted-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sort Options */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Trier par:</span>
        <Button variant={sortBy === "recent" ? "default" : "ghost"} size="sm" onClick={() => setSortBy("recent")}>
          Plus récents
        </Button>
        <Button variant={sortBy === "helpful" ? "default" : "ghost"} size="sm" onClick={() => setSortBy("helpful")}>
          Plus utiles
        </Button>
        <Button variant={sortBy === "rating" ? "default" : "ghost"} size="sm" onClick={() => setSortBy("rating")}>
          Meilleures notes
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                  <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{review.author}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Achat vérifié
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-secondary text-secondary" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(review.date).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground">{review.comment}</p>

                  {/* Review Images */}
                  {review.images.length > 0 && (
                    <div className="flex space-x-2">
                      {review.images.map((image, index) => (
                        <div key={index} className="relative w-16 h-16 rounded-md overflow-hidden border">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Avis ${review.id} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Camera className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center space-x-4 text-sm">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Utile ({review.helpful})
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
