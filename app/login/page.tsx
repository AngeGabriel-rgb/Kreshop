import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100svh-12rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-serif text-brun-chocolat dark:text-beige-creme">
            Connexion Client
          </CardTitle>
          <CardDescription>Connectez-vous à votre compte pour une expérience d'achat personnalisée.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm isAdminLogin={false} />
          <div className="mt-4 text-center text-sm">
            Pas encore de compte ?{" "}
            <Link href="/register" className="underline text-primary hover:text-corail-intensifie">
              S'inscrire
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
