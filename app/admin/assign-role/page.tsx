"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useClerkAuth } from "@/hooks/use-clerk-auth" // Use new Clerk auth hook
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useClient } from "@/components/client-provider"
import { ProtectedRoute } from "@/components/protected-route"

export default function AssignRolePage() {
  const { user } = useUser()
  const { getToken } = useClerkAuth()
  const { showSuccess, showError } = useClient()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const assignAdminRole = async () => {
    if (!email.trim()) {
      showError("Veuillez entrer un email")
      return
    }

    setIsLoading(true)
    try {
      // Ici vous devriez appeler votre API backend pour attribuer le rôle
      // car Clerk côté client ne permet pas de modifier les métadonnées d'autres utilisateurs
      
      const response = await fetch("/api/admin/assign-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`
        },
        body: JSON.stringify({ email, role: "admin" })
      })

      if (response.ok) {
        showSuccess(`Rôle administrateur attribué à ${email}`)
        setEmail("")
      } else {
        const error = await response.json()
        showError(error.message || "Erreur lors de l'attribution du rôle")
      }
    } catch (error) {
      showError("Erreur lors de la communication avec le serveur")
    } finally {
      setIsLoading(false)
    }
  }

  const assignRoleToSelf = async () => {
    setIsLoading(true)
    try {
      // Pour s'attribuer le rôle admin à soi-même
      const response = await fetch("/api/admin/assign-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`
        },
        body: JSON.stringify({ 
          email: user?.emailAddresses[0]?.emailAddress, 
          role: "admin" 
        })
      })

      if (response.ok) {
        showSuccess("Rôle administrateur attribué avec succès !")
        // Recharger la page pour mettre à jour l'interface
        window.location.reload()
      } else {
        const error = await response.json()
        showError(error.message || "Erreur lors de l'attribution du rôle")
      }
    } catch (error) {
      showError("Erreur lors de la communication avec le serveur")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]} redirectPath="/admin/login">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-brun-chocolat">
                Attribution des Rôles
              </CardTitle>
              <CardDescription>
                Gérez les rôles des utilisateurs de l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Attribution à soi-même */}
              <div className="p-4 border rounded-lg bg-gray-50">
                <h3 className="font-semibold text-lg mb-2">Attribuer le rôle admin à votre compte</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Si vous n'avez pas encore le rôle administrateur, vous pouvez l'attribuer à votre propre compte.
                </p>
                <Button
                  onClick={assignRoleToSelf}
                  disabled={isLoading}
                  className="bg-corail-intensifie text-white hover:bg-corail-doux"
                >
                  {isLoading ? "Attribution en cours..." : "M'attribuer le rôle Admin"}
                </Button>
              </div>

              {/* Attribution à d'autres utilisateurs */}
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Attribuer le rôle admin à un autre utilisateur</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Entrez l'email de l'utilisateur à qui vous voulez attribuer le rôle administrateur.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email de l'utilisateur</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="utilisateur@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <Button
                    onClick={assignAdminRole}
                    disabled={isLoading || !email.trim()}
                    className="bg-brun-chocolat text-white hover:bg-gray-700"
                  >
                    {isLoading ? "Attribution en cours..." : "Attribuer le rôle Admin"}
                  </Button>
                </div>
              </div>

              {/* Informations importantes */}
              <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-lg mb-2 text-blue-800">⚠️ Important</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Seuls les administrateurs existants peuvent attribuer des rôles</li>
                  <li>• L'attribution du rôle admin donne accès à toutes les fonctionnalités d'administration</li>
                  <li>• Utilisez cette fonction avec précaution</li>
                  <li>• Les changements sont immédiats</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
