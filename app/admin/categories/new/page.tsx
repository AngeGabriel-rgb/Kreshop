"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { createCategorie } from "@/lib/api" // Use new API function
import { useAuth } from "@/lib/auth" // Use new auth hook
import type { Categorie } from "@/lib/types"

export default function AdminNewCategoryPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { getToken } = useAuth()

  const [categoryData, setCategoryData] = useState<Partial<Categorie>>({
    nom: "",
    slug: "",
    description: "",
    url_image: "",
    est_active: true,
    ordre_tri: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setCategoryData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "ordre_tri" ? Number.parseInt(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const token = getToken()
    if (!token) {
      toast({
        title: "Erreur d'authentification",
        description: "Vous devez être connecté pour créer une catégorie.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      await createCategorie(categoryData, token)
      toast({
        title: "Catégorie créée",
        description: "La nouvelle catégorie a été ajoutée avec succès.",
      })
      router.push("/admin/categories")
    } catch (error: any) {
      toast({
        title: "Erreur de création",
        description: error.message || "Échec de la création de la catégorie.",
        variant: "destructive",
      })
      console.error("Error creating category:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter une Nouvelle Catégorie</CardTitle>
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
                onCheckedChange={(checked) => setCategoryData((prev) => ({ ...prev, est_active: !!checked }))}
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
            {isLoading ? "Création..." : "Créer la Catégorie"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
