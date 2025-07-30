"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LoginForm from "@/components/login-form"
import { useAuth } from "@/lib/auth"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const { isAuthenticated, isAdmin, isClient } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      if (isAdmin()) {
        router.push("/admin") 
      } else if (isClient()) {
        router.push("/dashboard") 
      }
    }
  }, [isAuthenticated, isAdmin, isClient, router])

  if (isAuthenticated()) {
    return null // Redirection en cours
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
            <CardDescription>Connectez-vous à votre compte KreShop</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Pas encore de compte ?{" "}
                <Link href="/register/client" className="text-primary hover:underline">
                  Créer un compte client
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
