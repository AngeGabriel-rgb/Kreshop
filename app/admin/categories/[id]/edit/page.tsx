"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { fetchCategorieById, updateCategorie } from "@/lib/api" // Use new API functions
import { useAuth } from "@/lib/auth" // Use new auth hook
import type { Categorie } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

interface AdminEditCategoryPageProps {
  params: { id: string }
}

export default function AdminEditCategoryPage({ params }: AdminEditCategoryPageProps) {
  const categoryId = Number.parseInt(params.id)
  const router = useRouter()
  const { toast } = useToast()
  const { getToken } = useAuth()

  const [categoryData, setCategoryData] = useState<Partial<Categorie> | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true)
      setError(null)
      const token = getToken()
      if (!token) {
        setError("Authentication token not found. Please log in.")
        setLoading(false)
        return
      }
      try {
        const fetchedCategory = await fetchCategorieById(categoryId, token)
        setCategoryData(fetchedCategory || null)
      } catch (err: any) {
        setError(err.message || "Failed to fetch category details.")
        console.error("Error fetching category details:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchCategoryData()
  }, [categoryId, getToken])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setCategoryData((prev) => {
      if (!prev) return null
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : name === "ordre_tri" ? Number.parseInt(value) : value,
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const token = getToken()
    if (!token) {
      toast({
        title: "Erreur d'authentification",
        description: "Vous devez être connecté pour modifier une catégorie.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (!categoryData) {
      toast({
        title: "Erreur",
        description: "Données de catégorie introuvables.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      await updateCategorie(categoryId, categoryData, token)
      toast({
        title: "Catégorie mise à jour",
        description: "La catégorie a été mise à jour avec succès.",
      })
      router.push("/admin/categories")
    } catch (err: any) {
      toast({
        title: "Erreur de mise à jour",
        description: err.message || "Échec de la mise à jour de la catégorie.",
        variant: "destructive",
      })
      console.error("Error updating category:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">Erreur: {error}</div>
  }

  if (!categoryData) {
    return <div className="text-center text-brun-chocolat">Catégorie non trouvée.</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modifier la Catégorie: {categoryData.nom}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="nom">Nom de la catégorie</Label>
              <Input id="nom" name="nom" value={categoryData.nom || ""} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input id="slug" name="slug" value={categoryData.slug || ""} onChange={handleInputChange} required />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={categoryData.description || ""}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="url_image">URL de l&apos;image</Label>
            <Input id="url_image" name="url_image" value={categoryData.url_image || ""} onChange={handleInputChange} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="est_active"
                name="est_active"
                checked={categoryData.est_active}
                onCheckedChange={(checked) =>
                  setCategoryData((prev) => (prev ? { ...prev, est_active: !!checked } : null))
                }
              />
              <Label htmlFor="est_active">Catégorie Active</Label>
            </div>
            <div>
              <Label htmlFor="ordre_tri">Ordre de Tri</Label>
              <Input
                id="ordre_tri"
                name="ordre_tri"
                type="number"
                value={categoryData.ordre_tri || 0}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Button type="submit" className="bg-corail-intensifie text-white hover:bg-corail-doux" disabled={isLoading}>
            {isLoading ? "Mise à jour..." : "Mettre à jour la Catégorie"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
