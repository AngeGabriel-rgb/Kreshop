"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import { getProducts, deleteProduit } from "@/lib/data" // Use new data fetching and delete
import { useAuth } from "@/lib/auth" // Use new auth hook
import { useToast } from "@/components/ui/use-toast"
import { formatPrice } from "@/lib/utils"
import type { Produit } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminProductsPage() {
  const { getToken } = useAuth()
  const { toast } = useToast()
  const [products, setProducts] = useState<Produit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProductsData = async () => {
    setLoading(true)
    setError(null)
    try {
      const { products: fetchedProducts } = await getProducts()
      setProducts(fetchedProducts)
    } catch (err: any) {
      setError(err.message || "Failed to fetch products.")
      console.error("Error fetching products:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductsData()
  }, [])

  const handleDelete = async (id: number) => {
    const token = getToken()
    if (!token) {
      toast({
        title: "Erreur d'authentification",
        description: "Vous devez être connecté pour supprimer un produit.",
        variant: "destructive",
      })
      return
    }

    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      try {
        await deleteProduit(id, token)
        toast({
          title: "Produit supprimé",
          description: "Le produit a été supprimé avec succès.",
        })
        fetchProductsData() // Refresh the list
      } catch (err: any) {
        toast({
          title: "Erreur de suppression",
          description: err.message || "Échec de la suppression du produit.",
          variant: "destructive",
        })
        console.error("Error deleting product:", err)
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
                <TableHead>
                  <Skeleton className="h-4 w-16" />
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
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
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
        <CardTitle>Gestion des Produits</CardTitle>
        <Button asChild className="bg-corail-intensifie text-white hover:bg-corail-doux">
          <Link href="/admin/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un produit
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Actif</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell className="font-medium">{product.nom}</TableCell>
                <TableCell>{formatPrice(product.prix_fcfa)}</TableCell>
                <TableCell>{product.est_actif ? "Oui" : "Non"}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button asChild variant="outline" size="icon">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Modifier</span>
                    </Link>
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(product.id)}>
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
