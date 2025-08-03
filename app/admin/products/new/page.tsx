"use client"

import { FormDescription } from "@/components/ui/form"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { PlusCircle, Trash2, UploadCloud, ImageIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ProtectedRoute } from "@/components/protected-route"
import { fetchCategories, type Categorie } from "@/lib/api" // Assurez-vous que fetchCategories est disponible
// Importez le composant AdminDashboardSidebar
import { AdminDashboardSidebar } from "@/components/admin-dashboard-sidebar"

// Schéma de validation pour le formulaire d'ajout/modification de produit
const productFormSchema = z.object({
  nom: z.string().min(3, { message: "Le nom du produit est requis et doit contenir au moins 3 caractères." }),
  description: z.string().optional(),
  description_courte: z.string().optional(),
  prix_fcfa: z.coerce.number().min(0, { message: "Le prix doit être un nombre positif." }),
  prix_comparaison_fcfa: z.coerce
    .number()
    .min(0, { message: "Le prix de comparaison doit être un nombre positif." })
    .optional(),
  categorie_id: z.coerce.number().min(1, { message: "Veuillez sélectionner une catégorie." }),
  est_actif: z.boolean(),
  est_vedette: z.boolean(),
  images: z
    .array(
      z.object({
        url: z.string().url({ message: "L'URL de l'image doit être valide." }),
        alt: z.string().optional(),
      }),
    )
    .optional(),
  variantes: z
    .array(
      z.object({
        couleur: z.string().min(1, { message: "La couleur est requise." }),
        taille: z.string().min(1, { message: "La taille est requise." }),
        stock: z.coerce.number().min(0, { message: "Le stock doit être un nombre positif." }),
      }),
    )
    .optional(),
})

export default function AdminNewProductPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [categories, setCategories] = React.useState<Categorie[]>([])
  const [loadingCategories, setLoadingCategories] = React.useState(true)
  const [errorCategories, setErrorCategories] = React.useState<string | null>(null)

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      nom: "",
      description: "",
      description_courte: "",
      prix_fcfa: 0,
      prix_comparaison_fcfa: undefined,
      categorie_id: undefined,
      est_actif: true,
      est_vedette: false,
      images: [],
      variantes: [{ couleur: "", taille: "", stock: 0 }],
    },
  })

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: "images",
  })

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control: form.control,
    name: "variantes",
  })

  React.useEffect(() => {
    const getCategories = async () => {
      try {
        setLoadingCategories(true)
        const data = await fetchCategories()
        setCategories(data)
      } catch (err: any) {
        setErrorCategories(err.message || "Échec du chargement des catégories.")
        toast({
          title: "Erreur",
          description: "Impossible de charger les catégories pour le produit.",
          variant: "destructive",
        })
      } finally {
        setLoadingCategories(false)
      }
    }
    getCategories()
  }, [toast])

  const onSubmit = async (values: z.infer<typeof productFormSchema>) => {
    try {
      // TODO: Implémenter l'appel API pour créer un produit (POST /api/products)
      // Pour l'instant, nous allons simuler une réussite
      console.log("Données du produit à envoyer:", values)

      // Exemple de simulation d'upload d'images (remplacez par votre logique d'upload réelle)
      const processedImages = values.images?.map((img) => ({
        url: img.url, // En production, ce serait l'URL retournée par votre service d'upload
        alt: img.alt || values.nom,
      }))

      const productData = {
        ...values,
        images: processedImages,
      }

      // Simuler l'appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Produit créé/modifié avec succès (simulé):", productData)

      toast({
        title: "Succès",
        description: "Produit ajouté avec succès.",
      })
      router.push("/admin/products") // Rediriger vers la liste des produits
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'ajout du produit.",
        variant: "destructive",
      })
    }
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="flex min-h-[calc(100svh-12rem)]">
        <AdminDashboardSidebar />
        <div className="flex-1 container mx-auto py-8 px-4 md:px-6">
          {/* Le contenu existant de la page va ici */}
          <h1 className="mb-8 text-4xl font-bold font-serif text-brun-chocolat dark:text-beige-creme">
            Ajouter un Nouveau Produit
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Informations Générales</CardTitle>
                  <CardDescription>Détails de base du produit.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom du Produit</FormLabel>
                        <FormControl>
                          <Input placeholder="T-shirt en coton bio" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description_courte"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description Courte</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Une brève description du produit..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description Détaillée</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Description complète du produit, matériaux, entretien..."
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="prix_fcfa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prix (FCFA)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="15000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="prix_comparaison_fcfa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prix de Comparaison (FCFA, optionnel)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="20000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="categorie_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catégorie</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {loadingCategories ? (
                              <SelectItem value="" disabled>
                                Chargement des catégories...
                              </SelectItem>
                            ) : errorCategories ? (
                              <SelectItem value="" disabled>
                                {errorCategories}
                              </SelectItem>
                            ) : categories.length === 0 ? (
                              <SelectItem value="" disabled>
                                Aucune catégorie disponible
                              </SelectItem>
                            ) : (
                              categories.map((category) => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                  {category.nom}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center space-x-4">
                    <FormField
                      control={form.control}
                      name="est_actif"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Produit Actif</FormLabel>
                            <FormDescription>Le produit sera visible sur la boutique.</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="est_vedette"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Produit Vedette</FormLabel>
                            <FormDescription>Le produit sera mis en avant sur la page d'accueil.</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Images du Produit</CardTitle>
                  <CardDescription>Ajoutez des images pour votre produit.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {imageFields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-2">
                      <FormField
                        control={form.control}
                        name={`images.${index}.url`}
                        render={({ field: imageField }) => (
                          <FormItem className="flex-1">
                            <FormLabel>{index === 0 ? "URL de l'image" : ""}</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/image.jpg" {...imageField} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`images.${index}.alt`}
                        render={({ field: altField }) => (
                          <FormItem className="flex-1">
                            <FormLabel>{index === 0 ? "Texte alternatif" : ""}</FormLabel>
                            <FormControl>
                              <Input placeholder="Description de l'image" {...altField} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeImage(index)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Supprimer l'image</span>
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => appendImage({ url: "", alt: "" })}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter une image
                  </Button>
                  <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center mt-4">
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground mt-2">
                      Glissez-déposez vos images ici ou cliquez pour sélectionner
                    </p>
                    {/* Placeholder for actual file input */}
                    <Input type="file" multiple className="sr-only" />
                    <Button type="button" variant="outline" className="mt-4 bg-transparent">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Sélectionner des fichiers
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Variantes du Produit</CardTitle>
                  <CardDescription>Gérez les différentes tailles, couleurs et stocks.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {variantFields.map((field, index) => (
                    <div key={field.id} className="flex flex-wrap items-end gap-2 border p-4 rounded-md">
                      <FormField
                        control={form.control}
                        name={`variantes.${index}.couleur`}
                        render={({ field: colorField }) => (
                          <FormItem className="flex-1 min-w-[120px]">
                            <FormLabel>Couleur</FormLabel>
                            <FormControl>
                              <Input placeholder="Rouge" {...colorField} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`variantes.${index}.taille`}
                        render={({ field: sizeField }) => (
                          <FormItem className="flex-1 min-w-[120px]">
                            <FormLabel>Taille</FormLabel>
                            <FormControl>
                              <Input placeholder="M" {...sizeField} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`variantes.${index}.stock`}
                        render={({ field: stockField }) => (
                          <FormItem className="flex-1 min-w-[80px]">
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="100" {...stockField} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeVariant(index)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Supprimer la variante</span>
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendVariant({ couleur: "", taille: "", stock: 0 })}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter une variante
                  </Button>
                </CardContent>
              </Card>

              {/* Placeholder for Promotions and SEO */}
              <Card>
                <CardHeader>
                  <CardTitle>Promotions & SEO</CardTitle>
                  <CardDescription>
                    Gérez les promotions, les codes de réduction et l'optimisation pour les moteurs de recherche.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Des champs pour les promotions, codes de réduction, titre SEO et description SEO seront ajoutés ici.
                  </p>
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full bg-corail-doux hover:bg-corail-intensifie"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Enregistrement en cours..." : "Enregistrer le Produit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </ProtectedRoute>
  )
}
