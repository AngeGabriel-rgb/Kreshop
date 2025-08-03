"use client"

import * as React from "react"
import Link from "next/link"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import { AdminDashboardSidebar } from "@/components/admin-dashboard-sidebar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { ProtectedRoute } from "@/components/protected-route"
import { fetchProduits, type Produit } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

export default function AdminProductsPage() {
  const [products, setProducts] = React.useState<Produit[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const { toast } = useToast()

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        const response = await fetchProduits()
        if (Array.isArray(response)) {
          setProducts(response)
        } else if (
          response &&
          typeof response === "object" &&
          "data" in response &&
          Array.isArray((response as { data?: unknown }).data)
        ) {
          setProducts((response as { data: Produit[] }).data)
        } else {
          setError("Format de données inattendu de l'API des produits.")
          console.error("Réponse API inattendue pour les produits:", response)
          setProducts([])
        }
      } catch (err: any) {
        setError(err.message || "Échec du chargement des produits.")
        console.error(err)
        toast({
          title: "Erreur de chargement",
          description: err.message || "Impossible de charger les produits.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    getProducts()
  }, [toast])

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["admin"]}>
        <div className="flex min-h-[calc(100svh-12rem)]">
          <AdminDashboardSidebar />
          <div className="flex-1 container mx-auto py-8 px-4 md:px-6">
            <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">
              Gestion des Produits
            </h1>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Liste des Produits</CardTitle>
                <Skeleton className="h-10 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (error) {
    return (
      <ProtectedRoute allowedRoles={["admin"]}>
        <div className="flex min-h-[calc(100svh-12rem)]">
          <AdminDashboardSidebar />
          <div className="flex-1 container mx-auto py-8 px-4 md:px-6">
            <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">
              Gestion des Produits
            </h1>
            <div className="flex h-64 items-center justify-center text-destructive">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="flex min-h-[calc(100svh-12rem)]">
        <AdminDashboardSidebar />
        <div className="flex-1 container mx-auto py-8 px-4 md:px-6">
          <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">
            Gestion des Produits
          </h1>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Liste des Produits</CardTitle>
              <Button asChild className="bg-corail-doux hover:bg-corail-intensifie">
                <Link href="/admin/products/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Ajouter un produit
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {products.length === 0 ? (
                <p className="text-center text-muted-foreground">Aucun produit trouvé.</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead>Actif</TableHead>
                        <TableHead>Vedette</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.id}</TableCell>
                          <TableCell>{product.nom}</TableCell>
                          <TableCell>
                            {product.prix_fcfa.toLocaleString("fr-GA", { style: "currency", currency: "XAF" })}
                          </TableCell>
                          <TableCell>{product.est_actif ? "Oui" : "Non"}</TableCell>
                          <TableCell>{product.est_vedette ? "Oui" : "Non"}</TableCell>
                          <TableCell className="text-right">
                            <Link href={`/admin/products/${product.id}/edit`}>
                              <Button variant="ghost" size="icon" className="mr-2">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Modifier</span>
                              </Button>
                            </Link>
                            <Button variant="destructive" size="icon">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Supprimer</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
