"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import { fetchCategories, deleteCategorie } from "@/lib/api" // Use new API functions
import { useAuth } from "@/lib/auth" // Use new auth hook
import { useToast } from "@/components/ui/use-toast"
import type { Categorie } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminCategoriesPage() {
  const { getToken } = useAuth()
  const { toast } = useToast()
  const [categories, setCategories] = useState<Categorie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategoriesData = async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedCategories = await fetchCategories()
      setCategories(fetchedCategories)
    } catch (err: any) {
      setError(err.message || "Failed to fetch categories.")
      console.error("Error fetching categories:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategoriesData()
  }, [])

  const handleDelete = async (id: number) => {
    const token = getToken()
    if (!token) {
      toast({
        title: "Erreur d'authentification",
        description: "Vous devez être connecté pour supprimer une catégorie.",
        variant: "destructive",
      })
      return
    }

    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      try {
        await deleteCategorie(id, token)
        toast({
          title: "Catégorie supprimée",
          description: "La catégorie a été supprimée avec succès.",
        })
        fetchCategoriesData() // Refresh the list
      } catch (err: any) {
        toast({
          title: "Erreur de suppression",
          description: err.message || "Échec de la suppression de la catégorie.",
          variant: "destructive",
        })
        console.error("Error deleting category:", err)
      }
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-10 w-32" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-4 w-16" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead className="text-right">
                  <Skeleton className="h-4 w-20" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">Erreur: {error}</div>
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gestion des Catégories</CardTitle>
        <Button asChild className="bg-corail-intensifie text-white hover:bg-corail-doux">
          <Link href="/admin/categories/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter une catégorie
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell className="font-medium">{category.nom}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{category.est_active ? "Oui" : "Non"}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button asChild variant="outline" size="icon">
                    <Link href={`/admin/categories/${category.id}/edit`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Modifier</span>
                    </Link>
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(category.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Supprimer</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
