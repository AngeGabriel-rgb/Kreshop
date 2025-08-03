"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { ProtectedRoute } from "@/components/protected-route"
import { Skeleton } from "@/components/ui/skeleton"
// Importez le composant AdminDashboardSidebar
import { AdminDashboardSidebar } from "@/components/admin-dashboard-sidebar"

// Schéma de validation pour les paramètres de la boutique
const settingsFormSchema = z.object({
  nom_boutique: z.string().min(3, { message: "Le nom de la boutique est requis." }),
  email_contact: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
  telephone_contact: z.string().optional(),
  adresse_boutique: z.string().optional(),
  devise_principale: z.string().min(1, { message: "La devise principale est requise." }),
  permettre_inscription_client: z.boolean().default(true),
  admin_key_registration: z.string().optional(), // Pour la clé d'admin, à gérer avec prudence
})

// Interface pour les données des paramètres (correspondant au schéma)
interface StoreSettings {
  nom_boutique: string
  email_contact: string
  telephone_contact?: string
  adresse_boutique?: string
  devise_principale: string
  permettre_inscription_client: boolean
  admin_key_registration?: string
}

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  type SettingsFormValues = z.infer<typeof settingsFormSchema>;

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema) as any,
    defaultValues: {
      nom_boutique: "",
      email_contact: "",
      telephone_contact: "",
      adresse_boutique: "",
      devise_principale: "XAF",
      permettre_inscription_client: true,
      admin_key_registration: "",
    },
  })

  // Simuler la récupération des paramètres existants
  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true)
        setError(null)
        // Simuler un appel API pour récupérer les paramètres
        // En production, vous feriez un appel à votre backend, par exemple:
        // const data = await fetchApi<StoreSettings>("/admin/settings", { headers: createAuthHeaders(getToken()) });
        await new Promise((resolve) => setTimeout(resolve, 1500)) // Simuler le temps de chargement

        const mockSettings: StoreSettings = {
          nom_boutique: "KreShop Officiel",
          email_contact: "contact@kreshop.ga",
          telephone_contact: "+241 77 123 456",
          adresse_boutique: "Libreville, Gabon",
          devise_principale: "XAF",
          permettre_inscription_client: true,
          admin_key_registration: "YOUR_SECRET_ADMIN_KEY", // Attention: ne pas exposer en prod!
        }
        form.reset(mockSettings) // Remplir le formulaire avec les données simulées
      } catch (err: any) {
        setError(err.message || "Échec du chargement des paramètres.")
        toast({
          title: "Erreur de chargement",
          description: err.message || "Impossible de charger les paramètres de la boutique.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [form, toast])

  const onSubmit = async (values: z.infer<typeof settingsFormSchema>) => {
    try {
      // TODO: Implémenter l'appel API pour sauvegarder les paramètres (PUT /api/admin/settings)
      console.log("Paramètres à sauvegarder:", values)

      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simuler la sauvegarde

      toast({
        title: "Succès",
        description: "Paramètres sauvegardés avec succès.",
      })
    } catch (error: any) {
      toast({
        title: "Erreur de sauvegarde",
        description: error.message || "Une erreur est survenue lors de la sauvegarde des paramètres.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["admin"]}>
        <div className="container mx-auto py-8">
          <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">Paramètres</h1>
          <Skeleton className="h-[600px] w-full" />
        </div>
      </ProtectedRoute>
    )
  }

  if (error) {
    return (
      <ProtectedRoute allowedRoles={["admin"]}>
        <div className="container mx-auto py-8">
          <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">Paramètres</h1>
          <div className="flex h-64 items-center justify-center text-destructive">
            <p>{error}</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="flex min-h-[calc(100svh-12rem)]">
        <AdminDashboardSidebar />
        <div className="flex-1 container mx-auto py-8 px-4 md:px-6">
          {/* Le contenu existant de la page va ici */}
          <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">Paramètres</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres Généraux de la Boutique</CardTitle>
                  <CardDescription>Configurez les informations de base de votre boutique.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="nom_boutique"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom de la Boutique</FormLabel>
                        <FormControl>
                          <Input placeholder="KreShop" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email_contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email de Contact</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="contact@kreshop.ga" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="telephone_contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone de Contact</FormLabel>
                        <FormControl>
                          <Input placeholder="+241 77 123 456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="adresse_boutique"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse de la Boutique</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Votre adresse physique complète" rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="devise_principale"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Devise Principale</FormLabel>
                        <FormControl>
                          <Input placeholder="XAF" {...field} />
                        </FormControl>
                        <FormDescription>Ex: XAF (Franc CFA), USD, EUR</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Paramètres d'Utilisateur & Sécurité</CardTitle>
                  <CardDescription>Gérez les options d'inscription et les clés d'accès.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="permettre_inscription_client"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Permettre l'inscription client</FormLabel>
                          <FormDescription>
                            Autoriser les nouveaux utilisateurs à créer un compte client.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="admin_key_registration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Clé d'Administration pour l'Inscription</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Clé secrète pour l'inscription des admins" {...field} />
                        </FormControl>
                        <FormDescription>
                          Cette clé est requise pour l'inscription du premier administrateur ou de nouveaux
                          administrateurs sans l'approbation d'un admin existant.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Placeholder for other settings sections */}
              <Card>
                <CardHeader>
                  <CardTitle>Autres Paramètres (Placeholder)</CardTitle>
                  <CardDescription>
                    Sections futures pour les intégrations de paiement, les transporteurs, etc.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Des sections pour les passerelles de paiement, les options de livraison, les intégrations tierces,
                    etc., seront ajoutées ici.
                  </p>
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full bg-corail-doux hover:bg-corail-intensifie"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Save className="mr-2 h-4 w-4 animate-pulse" /> Sauvegarde en cours...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Sauvegarder les Paramètres
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </ProtectedRoute>
  )
}
