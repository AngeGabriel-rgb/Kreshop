import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/login-form"

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[calc(100svh-12rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-serif text-brun-chocolat dark:text-beige-creme">
            Connexion Administrateur
          </CardTitle>
          <CardDescription>Accédez au tableau de bord d'administration.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm isAdminLogin={true} />
          <div className="mt-4 text-center text-sm">
            Pas encore d'admin ?{" "}
            <Link href="/admin/register" className="underline text-primary hover:text-corail-intensifie">
              S'inscrire en tant qu'Admin
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
