"use client"

import { SignIn } from "@clerk/nextjs"

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-beige-creme px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-brun-chocolat mb-2">
            Connexion Administrateur
          </h1>
          <p className="text-gray-600">
            Accédez au tableau de bord d'administration
          </p>
        </div>
        
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-none bg-transparent",
              headerTitle: "text-2xl font-bold text-brun-chocolat",
              headerSubtitle: "text-gray-600",
              formButtonPrimary: "bg-corail-intensifie text-white hover:bg-corail-doux",
              footerActionLink: "text-corail-intensifie hover:text-corail-doux",
            }
          }}
          redirectUrl="/admin"
        />
      </div>
    </div>
  )
}
