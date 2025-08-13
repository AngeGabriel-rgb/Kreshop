"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit, Trash2 } from "lucide-react"
import { getOrders, removeOrder } from "@/lib/data"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"
import type { Commande } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminOrdersPage() {
  const { getToken } = useAuth()
  const { toast } = useToast()
  const [orders, setOrders] = useState<Commande[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrdersData = async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedOrders = await getOrders()
      setOrders(fetchedOrders)
    } catch (err: any) {
      setError(err.message || "Failed to fetch orders.")
      console.error("Error fetching orders:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrdersData()
  }, [])

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
      try {
        await removeOrder(id)
        toast({
          title: "Commande supprimée",
          description: "La commande a été supprimée avec succès.",
        })
        fetchOrdersData() // Refresh the list
      } catch (err: any) {
        toast({
          title: "Erreur de suppression",
          description: err.message || "Échec de la suppression de la commande.",
          variant: "destructive",
        })
        console.error("Error deleting order:", err)
      }
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/4" />
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
      <CardHeader>
        <CardTitle>Gestion des Commandes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Commande</TableHead>
              <TableHead>Client ID</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.numero_commande}</TableCell>
                <TableCell>{order.client_id}</TableCell>
                <TableCell>{formatPrice(order.total_fcfa)}</TableCell>
                <TableCell>{order.statut}</TableCell>
                <TableCell>{new Date(order.date_creation).toLocaleDateString()}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button asChild variant="outline" size="icon">
                    <Link href={`/admin/orders/${order.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Voir</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="icon">
                    <Link href={`/admin/orders/${order.id}/edit`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Modifier</span>
                    </Link>
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(order.id)}>
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
