"use client"

import { SignUp } from "@clerk/nextjs"

export default function AdminRegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-beige-creme px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-brun-chocolat mb-2">
            Inscription Administrateur
          </h1>
          <p className="text-gray-600">
            Créez un compte administrateur pour accéder au tableau de bord
          </p>
        </div>
        
        <SignUp 
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
