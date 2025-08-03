"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Edit, Trash2, Loader2 } from "lucide-react"
import { AdminDashboardSidebar } from "@/components/admin-dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { fetchCategories, deleteCategorie, getAuthToken, type Categorie } from "@/lib/api"

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Categorie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [categoryToDeleteId, setCategoryToDeleteId] = useState<number | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const loadCategories = async () => {
    setLoading(true)
    setError(null)
    try {
      const token = getAuthToken()
      if (!token) {
        router.push("/admin/login")
        return
      }
      const data = await fetchCategories(token)
      setCategories(data)
    } catch (err) {
      console.error("Failed to fetch categories:", err)
      setError("Erreur lors du chargement des catégories.")
      toast({
        title: "Erreur",
        description: "Impossible de charger les catégories.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleDeleteClick = (id: number) => {
    setCategoryToDeleteId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (categoryToDeleteId === null) return

    setLoading(true)
    try {
      const token = getAuthToken()
      if (!token) {
        router.push("/admin/login")
        return
      }
      await deleteCategorie(categoryToDeleteId, token)
      toast({
        title: "Succès",
        description: "Catégorie supprimée avec succès.",
      })
      await loadCategories() // Recharger les catégories après suppression
    } catch (err) {
      console.error("Failed to delete category:", err)
      setError("Erreur lors de la suppression de la catégorie.")
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la catégorie.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setIsDeleteDialogOpen(false)
      setCategoryToDeleteId(null)
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      <AdminDashboardSidebar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Gestion des Catégories</h1>
          <Button asChild>
            <Link href="/admin/categories/new">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une catégorie
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Liste des Catégories</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Chargement des catégories...</span>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 p-8">{error}</div>
            ) : categories.length === 0 ? (
              <div className="text-center text-muted-foreground p-8">Aucune catégorie trouvée.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Ordre</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.nom}</TableCell>
                      <TableCell>{category.slug}</TableCell>
                      <TableCell>{category.est_active ? "Oui" : "Non"}</TableCell>
                      <TableCell>{category.ordre_tri}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/categories/${category.id}/edit`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Modifier</span>
                            </Link>
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(category.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Supprimer</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action ne peut pas être annulée. Cela supprimera définitivement la catégorie et toutes les données
                associées.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>Continuer</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  )
}
