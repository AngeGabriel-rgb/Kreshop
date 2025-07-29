"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AdminRegisterForm from "@/components/admin/admin-register-form"
// import ProtectedRoute from "@/components/protected-route" // Removed, handled by layout
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AdminRegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au dashboard
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Créer un Administrateur</CardTitle>
            <CardDescription>Ajoutez un nouveau compte administrateur au système</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminRegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
