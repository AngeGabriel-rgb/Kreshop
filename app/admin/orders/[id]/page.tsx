"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { getOrderById } from "@/lib/data" // Use new data fetching
import { useAuth } from "@/lib/auth" // Use new auth hook
import { formatPrice } from "@/lib/utils"
import type { Commande } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

interface AdminOrderDetailPageProps {
  params: { id: string }
}

export default function AdminOrderDetailPage({ params }: AdminOrderDetailPageProps) {
  const orderId = Number.parseInt(params.id)
  const { getToken } = useAuth()
  const [order, setOrder] = useState<Commande | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrderData = async () => {
      setLoading(true)
      setError(null)
      const token = getToken()
      if (!token) {
        setError("Authentication token not found. Please log in.")
        setLoading(false)
        return
      }
      try {
        const fetchedOrder = await getOrderById(orderId, token)
        setOrder(fetchedOrder || null)
      } catch (err: any) {
        setError(err.message || "Failed to fetch order details.")
        console.error("Error fetching order details:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrderData()
  }, [orderId, getToken])

  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-10 w-24" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">Erreur: {error}</div>
  }

  if (!order) {
    return <div className="text-center text-brun-chocolat">Commande non trouvée.</div>
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Détails de la Commande #{order.numero_commande}</CardTitle>
        <Button asChild variant="outline">
          <Link href="/admin/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux commandes
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="mb-2 text-lg font-semibold">Informations Générales</h3>
          <p>
            <strong>Client ID:</strong> {order.client_id}
          </p>
          <p>
            <strong>Statut:</strong> {order.statut}
          </p>
          <p>
            <strong>Statut Paiement:</strong> {order.statut_paiement}
          </p>
          <p>
            <strong>Date de Création:</strong> {new Date(order.date_creation).toLocaleString()}
          </p>
          <p>
            <strong>Dernière Modification:</strong> {new Date(order.date_modification).toLocaleString()}
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">Totaux</h3>
          <p>
            <strong>Sous-total:</strong> {formatPrice(order.sous_total_fcfa)}
          </p>
          <p>
            <strong>Taxes:</strong> {formatPrice(order.taxes_fcfa)}
          </p>
          <p>
            <strong>Livraison:</strong> {formatPrice(order.livraison_fcfa)}
          </p>
          <p>
            <strong>Remise:</strong> {formatPrice(order.remise_fcfa)}
          </p>
          <p className="text-xl font-bold">
            <strong>Total:</strong> {formatPrice(order.total_fcfa)}
          </p>
        </div>

        {order.adresse_livraison && (
          <div>
            <h3 className="mb-2 text-lg font-semibold">Adresse de Livraison</h3>
            <p>
              {order.adresse_livraison.firstName} {order.adresse_livraison.lastName}
            </p>
            <p>{order.adresse_livraison.address}</p>
            <p>
              {order.adresse_livraison.zip} {order.adresse_livraison.city}
            </p>
            <p>{order.adresse_livraison.country}</p>
          </div>
        )}

        {/* Assuming order items are part of the order object, if not, you'd fetch them separately */}
        {/* <div>
          <h3 className="mb-2 text-lg font-semibold">Articles Commandés</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead className="text-right">Prix Unitaire</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items?.map((item) => (
                <TableRow key={item.productId}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right">{formatPrice(item.price)}</TableCell>
                  <TableCell className="text-right">{formatPrice(item.price * item.quantity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div> */}

        {order.notes && (
          <div>
            <h3 className="mb-2 text-lg font-semibold">Notes</h3>
            <p>{order.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
