"use client"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { loginAdmin, loginClient, useAuth } from "@/lib/auth"

const formSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
})

interface LoginFormProps {
  isAdminLogin?: boolean
}

export function LoginForm({ isAdminLogin = false }: LoginFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const { setAuthData } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let authResponse
      if (isAdminLogin) {
        authResponse = await loginAdmin(values)
      } else {
        authResponse = await loginClient(values)
      }
      setAuthData(authResponse)
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${authResponse.user.prenom}!`,
      })
      router.push(isAdminLogin ? "/admin" : "/dashboard")
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Une erreur inattendue est survenue.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="votre@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-corail-doux hover:bg-corail-intensifie"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>
    </Form>
  )
}
