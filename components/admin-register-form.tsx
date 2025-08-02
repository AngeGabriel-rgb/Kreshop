"use client"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { registerAdmin, useAuth } from "@/lib/auth"

const formSchema = z
  .object({
    firstName: z.string().min(2, { message: "Le prénom est requis." }),
    lastName: z.string().min(2, { message: "Le nom est requis." }),
    email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
    phone: z.string().optional(),
    password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
    confirmPassword: z.string().min(6, { message: "Veuillez confirmer votre mot de passe." }),
    adminKey: z.string().optional(), // Optional for initial admin creation
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  })

export function AdminRegisterForm() {
  const { toast } = useToast()
  const router = useRouter()
  const { setAuthData } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      adminKey: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const authResponse = await registerAdmin({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        adminKey: values.adminKey,
      })
      setAuthData(authResponse)
      toast({
        title: "Inscription Admin réussie",
        description: `Bienvenue, ${authResponse.user.prenom}!`,
      })
      router.push("/admin")
    } catch (error: any) {
      toast({
        title: "Erreur d'inscription Admin",
        description: error.message || "Une erreur inattendue est survenue.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Prénom de l'admin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de l'admin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="admin@kreshop.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone (optionnel)</FormLabel>
              <FormControl>
                <Input placeholder="+241 77 123 456" {...field} />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adminKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clé d'administration (si requise)</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Clé secrète" {...field} />
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
          {form.formState.isSubmitting ? "Inscription en cours..." : "S'inscrire en tant qu'Admin"}
        </Button>
      </form>
    </Form>
  )
}
