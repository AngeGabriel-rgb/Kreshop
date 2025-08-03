"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { AdminDashboardSidebar } from "@/components/admin-dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { fetchCategorieById, updateCategorie, fetchCategories, getAuthToken, type Categorie } from "@/lib/api"

interface EditCategoryPageProps {
  params: {
    id: string
  }
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const categoryId = Number.parseInt(params.id)

  const [formData, setFormData] = useState<Partial<Categorie>>({
    nom: "",
    slug: "",
    description: "",
    parent_id: undefined,
    url_image: "",
    est_active: true,
    ordre_tri: 0,
  })
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [parentCategories, setParentCategories] = useState<Categorie[]>([])

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        const token = getAuthToken()
        if (!token) {
          router.push("/admin/login")
          return
        }
        const categoryData = await fetchCategorieById(categoryId, token)
        setFormData({
          nom: categoryData.nom,
          slug: categoryData.slug,
          description: categoryData.description,
          parent_id: categoryData.parent_id || undefined,
          url_image: categoryData.url_image || "",
          est_active: categoryData.est_active,
          ordre_tri: categoryData.ordre_tri,
        })

        const allCategories = await fetchCategories(token)
        // Filter out the current category from parent options
        setParentCategories(allCategories.filter((cat) => cat.id !== categoryId))
      } catch (err) {
        console.error("Failed to fetch category or parent categories:", err)
        toast({
          title: "Erreur",
          description: "Impossible de charger les données de la catégorie.",
          variant: "destructive",
        })
        router.push("/admin/categories") // Redirect if category not found or error
      } finally {
        setInitialLoading(false)
      }
    }

    if (categoryId) {
      loadCategoryData()
    }
  }, [categoryId, router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      parent_id: value === "" ? undefined : Number.parseInt(value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = getAuthToken()
      if (!token) {
        router.push("/admin/login")
        return
      }

      // Ensure slug is generated if not provided
      const finalFormData = {
        ...formData,
        slug:
          formData.slug ||
          formData.nom
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, ""),
      }

      await updateCategorie(categoryId, finalFormData, token)
      toast({
        title: "Succès",
        description: "Catégorie mise à jour avec succès.",
      })
      router.push("/admin/categories")
    } catch (err: any) {
      console.error("Failed to update category:", err)
      toast({
        title: "Erreur",
        description: err.message || "Impossible de mettre à jour la catégorie.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex min-h-screen w-full">
        <AdminDashboardSidebar />
        <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg">Chargement des données...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full">
      <AdminDashboardSidebar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Modifier la Catégorie</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Détails de la Catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="nom">Nom</Label>
                <Input id="nom" value={formData.nom || ""} onChange={handleChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug (auto-généré si vide)</Label>
                <Input id="slug" value={formData.slug || ""} onChange={handleChange} />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description || ""} onChange={handleChange} rows={4} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="parent_id">Catégorie Parente</Label>
                <Select value={formData.parent_id?.toString() || "0"} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie parente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Aucune (Catégorie principale)</SelectItem>
                    {parentCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url_image">URL de l'Image</Label>
                <Input id="url_image" type="url" value={formData.url_image || ""} onChange={handleChange} />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="est_active"
                  checked={formData.est_active}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, est_active: checked }))}
                />
                <Label htmlFor="est_active">Est Active</Label>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ordre_tri">Ordre de Tri</Label>
                <Input id="ordre_tri" type="number" value={formData.ordre_tri || 0} onChange={handleChange} />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mise à jour...
                    </>
                  ) : (
                    "Mettre à jour la Catégorie"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
