import { SignUp } from "@clerk/nextjs"

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-beige-creme px-4 py-12">
      <div className="w-full max-w-md">
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
        />
      </div>
    </div>
  )
}
