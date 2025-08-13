"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { getOrderById, modifyOrder } from "@/lib/data"
import { useAuth } from "@/lib/auth"
import type { Commande, StatutCommande, StatutPaiement } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

interface AdminEditOrderPageProps {
  params: { id: string }
}

export default function AdminEditOrderPage({ params }: AdminEditOrderPageProps) {
  const orderId = Number.parseInt(params.id)
  const router = useRouter()
  const { toast } = useToast()
  const { getToken } = useAuth()

  const [orderData, setOrderData] = useState<Partial<Commande> | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrderData = async () => {
      setLoading(true)
      setError(null)
      try {
        const fetchedOrder = await getOrderById(orderId)
        setOrderData(fetchedOrder || null)
      } catch (err: any) {
        setError(err.message || "Failed to fetch order details.")
        console.error("Error fetching order details:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrderData()
  }, [orderId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setOrderData((prev) => {
      if (!prev) return null
      return { ...prev, [name]: value }
    })
  }

  const handleStatusChange = (value: string, field: "statut" | "statut_paiement") => {
    setOrderData((prev) => {
      if (!prev) return null
      return { ...prev, [field]: value }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!orderData) {
      toast({
        title: "Erreur",
        description: "Données de commande introuvables.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      await modifyOrder(orderId, orderData)
      toast({
        title: "Commande mise à jour",
        description: "La commande a été mise à jour avec succès.",
      })
      router.push(`/admin/orders/${orderId}`)
    } catch (err: any) {
      toast({
        title: "Erreur de mise à jour",
        description: err.message || "Échec de la mise à jour de la commande.",
        variant: "destructive",
      })
      console.error("Error updating order:", err)
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
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">Erreur: {error}</div>
  }

  if (!orderData) {
    return <div className="text-center text-brun-chocolat">Commande non trouvée.</div>
  }

  const orderStatuses: StatutCommande[] = ["EN_ATTENTE", "CONFIRMEE", "TRAITEE", "EXPEDIEE", "LIVREE", "ANNULEE"]
  const paymentStatuses: StatutPaiement[] = ["EN_ATTENTE", "PAYE", "ECHEC", "REMBOURSE"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modifier la Commande #{orderData.numero_commande}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="statut">Statut de la Commande</Label>
            <Select onValueChange={(value) => handleStatusChange(value, "statut")} value={orderData.statut} required>
              <SelectTrigger id="statut">
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                {orderStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="statut_paiement">Statut du Paiement</Label>
            <Select
              onValueChange={(value) => handleStatusChange(value, "statut_paiement")}
              value={orderData.statut_paiement}
              required
            >
              <SelectTrigger id="statut_paiement">
                <SelectValue placeholder="Sélectionner un statut de paiement" />
              </SelectTrigger>
              <SelectContent>
                {paymentStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes (internes)</Label>
            <Textarea id="notes" name="notes" value={orderData.notes || ""} onChange={handleInputChange} rows={5} />
          </div>

          {/* Display other read-only fields if necessary */}
          <div>
            <Label>Client ID</Label>
            <Input value={orderData.client_id} disabled />
          </div>
          <div>
            <Label>Total</Label>
            <Input value={orderData.total_fcfa} disabled />
          </div>

          <Button type="submit" className="bg-corail-intensifie text-white hover:bg-corail-doux" disabled={isLoading}>
            {isLoading ? "Mise à jour..." : "Mettre à jour la Commande"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
