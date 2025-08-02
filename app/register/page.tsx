import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClientRegisterForm } from "@/components/client-register-form"

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100svh-12rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-serif text-brun-chocolat dark:text-beige-creme">
            Inscription Client
          </CardTitle>
          <CardDescription>Créez votre compte pour accéder à toutes nos fonctionnalités.</CardDescription>
        </CardHeader>
        <CardContent>
          <ClientRegisterForm />
          <div className="mt-4 text-center text-sm">
            Déjà un compte ?{" "}
            <Link href="/login" className="underline text-primary hover:text-corail-intensifie">
              Se connecter
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
