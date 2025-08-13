"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import type React from "react"

import { useEffect } from "react"

import { useState } from "react"

import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Plus, Minus, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createProduit, fetchCategories } from "@/lib/api" // Use new API functions
import { useClerkAuth } from "@/hooks/use-clerk-auth" // Use new Clerk auth hook
import type { Categorie } from "@/lib/types"

const productSchema = z.object({
  nom: z.string().min(1, "Le nom est requis."), // Changed from name
  description: z.string().min(1, "La description est requise."),
  prix_fcfa: z.coerce.number().min(0, "Le prix doit être positif."), // Changed from priceFcfa
  prix_comparaison_fcfa: z.coerce // Changed from comparisonPriceFcfa
    .number()
    .optional()
    .nullable()
    .transform((e) => (e === 0 ? null : e)),
  categorie_id: z.coerce.number().min(1, "La catégorie est requise."), // Changed from categoryId, now number
  sku: z
    .string()
    .optional()
    .nullable()
    .transform((e) => (e === "" ? null : e)),
  stockQuantity: z.coerce.number().min(0, "Le stock doit être positif ou nul."), // This is base stock, variants have their own
  est_actif: z.boolean().default(true), // Changed from isActive
  est_vedette: z.boolean().default(false), // New field
  images: z
    .array(
      z.object({
        url: z.string().url("URL d'image invalide.").min(1, "L'URL d'image est requise."),
        alt: z.string().min(1, "Le texte alternatif est requis."),
      }),
    )
    .min(1, "Au moins une image est requise."),
  variantes: z
    .array(
      z.object({
        couleur: z.string().optional(), // Changed from color
        taille: z.string().optional(), // Changed from size
        prix_supplementaire: z.coerce.number().default(0), // Changed from priceAdjustment
        stock: z.coerce.number().default(0), // Changed from stockAdjustment, now absolute stock for variant
        est_active: z.boolean().default(true), // Changed from isActive
      }),
    )
    .optional(),
})

type ProductFormData = z.infer<typeof productSchema>

export default function AdminNewProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { getToken } = useClerkAuth()
  const [categories, setCategories] = useState<Categorie[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nom: "",
      description: "",
      prix_fcfa: 0,
      prix_comparaison_fcfa: null,
      categorie_id: 0, // Default to 0 or null, will be set after categories load
      sku: null,
      stockQuantity: 0,
      est_actif: true,
      est_vedette: false,
      images: [{ url: "", alt: "" }],
      variantes: [],
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
    name: "variantes", // Changed from variants
  })

  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCategories(true)
      try {
        const fetchedCategories = await fetchCategories()
        setCategories(fetchedCategories)
        if (fetchedCategories.length > 0) {
          form.setValue("categorie_id", fetchedCategories[0].id)
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les catégories.",
          variant: "destructive",
        })
      } finally {
        setLoadingCategories(false)
      }
    }
    loadCategories()
  }, [form, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    form.setValue(name, type === "checkbox" ? checked : name === "prix_fcfa" ? Number.parseFloat(value) : value)
  }

  const handleCategoryChange = (value: string) => {
    form.setValue("categorie_id", Number.parseInt(value))
  }

  const handleImageChange = (index: number, field: "url" | "alt", value: string) => {
    const newImages = [...(form.getValues("images") || [])]
    if (!newImages[index]) {
      newImages[index] = { url: "", alt: "" }
    }
    newImages[index][field] = value
    form.setValue("images", newImages)
  }

  const addImageField = () => {
    appendImage({ url: "", alt: "" })
  }

  const removeImageField = (index: number) => {
    removeImage(index)
  }

  const handleSubmit = async (data: ProductFormData) => {
    form.clearErrors()
    setIsLoading(true)
    const token = await getToken()
    if (!token) {
      toast({
        title: "Erreur d'authentification",
        description: "Vous devez être connecté pour créer un produit.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      await createProduit(data, token)
      toast({
        title: "Produit créé",
        description: "Le nouveau produit a été ajouté avec succès.",
      })
      router.push("/admin/products")
    } catch (error: any) {
      toast({
        title: "Erreur de création",
        description: error.message || "Échec de la création du produit.",
        variant: "destructive",
      })
      console.error("Error creating product:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brun-chocolat">Ajouter un Nouveau Produit</h1>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-brun-chocolat">Informations Générales</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="nom">Nom du produit</Label>
                <Input id="nom" name="nom" {...form.register("nom")} required />
              </div>
              <div>
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input id="slug" name="slug" {...form.register("sku")} placeholder="SKU001" />
              </div>
            </div>

            <div>
              <Label htmlFor="description_courte">Description Courte</Label>
              <Textarea id="description_courte" name="description_courte" {...form.register("description")} rows={3} />
            </div>
            <div>
              <Label htmlFor="description">Description Complète</Label>
              <Textarea id="description" name="description" {...form.register("description")} rows={5} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="prix_fcfa">Prix (FCFA)</Label>
                <Input
                  id="prix_fcfa"
                  name="prix_fcfa"
                  type="number"
                  step="0.01"
                  {...form.register("prix_fcfa")}
                  required
                />
              </div>
              <div>
                <Label htmlFor="categorie_id">Catégorie</Label>
                {loadingCategories ? (
                  <Input value="Chargement des catégories..." disabled />
                ) : (
                  <Select onValueChange={handleCategoryChange} value={form.watch("categorie_id")?.toString()} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="est_actif"
                name="est_actif"
                checked={form.watch("est_actif")}
                onCheckedChange={(checked) => form.setValue("est_actif", Boolean(checked))}
              />
              <Label htmlFor="est_actif">Produit Actif</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="est_vedette"
                name="est_vedette"
                checked={form.watch("est_vedette")}
                onCheckedChange={(checked) => form.setValue("est_vedette", Boolean(checked))}
              />
              <Label htmlFor="est_vedette">Produit Vedette</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-brun-chocolat">Images du Produit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {imageFields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-2">
                <div className="flex-1">
                  <Label htmlFor={`images.${index}.url`}>URL de l&apos;image {index + 1}</Label>
                  <Input
                    id={`images.${index}.url`}
                    {...form.register(`images.${index}.url`)}
                    onChange={(e) => handleImageChange(index, "url", e.target.value)}
                  />
                  {form.formState.errors.images?.[index]?.url && (
                    <p className="text-sm text-destructive">{form.formState.errors.images[index]?.url?.message}</p>
                  )}
                </div>
                <div className="flex-1">
                  <Label htmlFor={`images.${index}.alt`}>Texte Alt</Label>
                  <Input
                    id={`images.${index}.alt`}
                    {...form.register(`images.${index}.alt`)}
                    onChange={(e) => handleImageChange(index, "alt", e.target.value)}
                  />
                  {form.formState.errors.images?.[index]?.alt && (
                    <p className="text-sm text-destructive">{form.formState.errors.images[index]?.alt?.message}</p>
                  )}
                </div>
                {imageFields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeImageField(index)}
                    className="shrink-0"
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Supprimer l&apos;image</span>
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addImageField} className="w-full bg-transparent">
              <Plus className="mr-2 h-4 w-4" /> Ajouter une image
            </Button>
            {form.formState.errors.images && typeof form.formState.errors.images.message === "string" && (
              <p className="text-sm text-destructive">{form.formState.errors.images.message}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-brun-chocolat">Variantes du Produit (Optionnel)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {variantFields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1 md:grid-cols-6 gap-2 border p-4 rounded-md relative">
                <div className="absolute top-2 right-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeVariant(index)}
                    className="h-6 w-6"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Supprimer la variante</span>
                  </Button>
                </div>
                <div className="grid gap-2 md:col-span-2">
                  <Label htmlFor={`variantes.${index}.couleur`}>Couleur</Label>
                  <Input id={`variantes.${index}.couleur`} {...form.register(`variantes.${index}.couleur`)} />
                </div>
                <div className="grid gap-2 md:col-span-2">
                  <Label htmlFor={`variantes.${index}.taille`}>Taille</Label>
                  <Input id={`variantes.${index}.taille`} {...form.register(`variantes.${index}.taille`)} />
                </div>
                <div className="grid gap-2 md:col-span-1">
                  <Label htmlFor={`variantes.${index}.prix_supplementaire`}>Ajustement prix</Label>
                  <Input
                    id={`variantes.${index}.prix_supplementaire`}
                    type="number"
                    {...form.register(`variantes.${index}.prix_supplementaire`)}
                  />
                </div>
                <div className="grid gap-2 md:col-span-1">
                  <Label htmlFor={`variantes.${index}.stock`}>Stock Variante</Label>
                  <Input id={`variantes.${index}.stock`} type="number" {...form.register(`variantes.${index}.stock`)} />
                </div>
                <div className="flex items-center space-x-2 md:col-span-6">
                  <Checkbox
                    id={`variantes.${index}.est_active`}
                    checked={form.watch(`variantes.${index}.est_active`)}
                    onCheckedChange={(checked) => form.setValue(`variantes.${index}.est_active`, Boolean(checked))}
                  />
                  <Label htmlFor={`variantes.${index}.est_active`}>Variante active</Label>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendVariant({ couleur: "", taille: "", prix_supplementaire: 0, stock: 0, est_active: true })
              }
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" /> Ajouter une variante
            </Button>
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full bg-corail-intensifie text-white hover:bg-corail-doux"
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Ajout en cours...
            </>
          ) : (
            "Ajouter le produit"
          )}
        </Button>
      </form>
    </div>
  )
}
