"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useEffect } from "react"

import { useState } from "react"

import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Plus, Minus, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchProduitById, updateProduit, fetchCategories } from "@/lib/api" // Use new API functions
import { useAuth } from "@/lib/auth" // Use new auth hook
import type { Produit, Categorie } from "@/lib/types"

interface AdminEditProductPageProps {
  params: { id: string }
}

export default function AdminEditProductPage({ params }: AdminEditProductPageProps) {
  const productId = Number.parseInt(params.id)
  const router = useRouter()
  const { toast } = useToast()
  const { getToken } = useAuth()

  const [productData, setProductData] = useState<Partial<Produit> | null>(null)
  const [categories, setCategories] = useState<Categorie[]>([])
  const [loadingProduct, setLoadingProduct] = useState(true)
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<Partial<Produit>>({
    defaultValues: {
      nom: "",
      description: "",
      prix_fcfa: 0,
      prix_comparaison_fcfa: null,
      categorie_id: 0,
      sku: null,
      stockQuantity: 0,
      est_actif: true,
      est_vedette: false,
      images: [],
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
    name: "variantes",
  })

  useEffect(() => {
    const loadProductAndCategories = async () => {
      setLoadingProduct(true)
      setLoadingCategories(true)
      setError(null)
      const token = getToken()

      if (!token) {
        setError("Authentication token not found. Please log in.")
        setLoadingProduct(false)
        setLoadingCategories(false)
        return
      }

      try {
        const [fetchedProduct, fetchedCategories] = await Promise.all([fetchProduitById(productId), fetchCategories()])
        setProductData(fetchedProduct)
        setCategories(fetchedCategories)
        form.reset(fetchedProduct)
      } catch (err: any) {
        setError(err.message || "Failed to load product or categories.")
        console.error("Error loading product/categories:", err)
      } finally {
        setLoadingProduct(false)
        setLoadingCategories(false)
      }
    }
    loadProductAndCategories()
  }, [productId, getToken, form])

  const onSubmit = async (data: Partial<Produit>) => {
    form.clearErrors()
    setIsLoading(true)
    const token = getToken()
    if (!token) {
      toast({
        title: "Erreur d'authentification",
        description: "Vous devez être connecté pour modifier un produit.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      await updateProduit(productId, data, token)
      toast({
        title: "Produit mis à jour",
        description: `Le produit "${data.nom}" a été mis à jour avec succès.`,
      })
      router.push("/admin/products")
    } catch (error: any) {
      toast({
        title: "Erreur de mise à jour",
        description: error.message || "Échec de la mise à jour du produit.",
        variant: "destructive",
      })
      console.error("Error updating product:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isSubmitting = form.formState.isSubmitting

  if (loadingProduct || loadingCategories) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <Loader2 className="h-16 w-16 animate-spin text-corail-intensifie" />
        <span className="sr-only">Chargement des données du produit...</span>
      </div>
    )
  }

  if (error) {
    return <div className="text-destructive p-4">Erreur: {error}</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brun-chocolat">Modifier Produit: {productData?.nom}</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-brun-chocolat">Informations Générales</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nom">Nom du produit</Label>
              <Input id="nom" {...form.register("nom")} />
              {form.formState.errors.nom && (
                <p className="text-sm text-destructive">{form.formState.errors.nom.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...form.register("description")} />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="prix_fcfa">Prix (FCFA)</Label>
                <Input id="prix_fcfa" type="number" {...form.register("prix_fcfa")} />
                {form.formState.errors.prix_fcfa && (
                  <p className="text-sm text-destructive">{form.formState.errors.prix_fcfa.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="prix_comparaison_fcfa">Prix de comparaison (optionnel)</Label>
                <Input
                  id="prix_comparaison_fcfa"
                  type="number"
                  {...form.register("prix_comparaison_fcfa")}
                  placeholder="0"
                />
                {form.formState.errors.prix_comparaison_fcfa && (
                  <p className="text-sm text-destructive">{form.formState.errors.prix_comparaison_fcfa.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="categorie_id">Catégorie</Label>
                {loadingCategories ? (
                  <Input value="Chargement des catégories..." disabled />
                ) : (
                  <Select
                    onValueChange={(value) => form.setValue("categorie_id", Number(value))}
                    value={form.watch("categorie_id")?.toString()}
                  >
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
                {form.formState.errors.categorie_id && (
                  <p className="text-sm text-destructive">{form.formState.errors.categorie_id.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sku">SKU (optionnel)</Label>
                <Input id="sku" {...form.register("sku")} placeholder="SKU001" />
                {form.formState.errors.sku && (
                  <p className="text-sm text-destructive">{form.formState.errors.sku.message}</p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stockQuantity">Quantité en stock (Base)</Label>
              <Input id="stockQuantity" type="number" {...form.register("stockQuantity")} />
              {form.formState.errors.stockQuantity && (
                <p className="text-sm text-destructive">{form.formState.errors.stockQuantity.message}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="est_actif"
                checked={form.watch("est_actif")}
                onCheckedChange={(checked) => form.setValue("est_actif", Boolean(checked))}
              />
              <Label htmlFor="est_actif">Produit actif</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="est_vedette"
                checked={form.watch("est_vedette")}
                onCheckedChange={(checked) => form.setValue("est_vedette", Boolean(checked))}
              />
              <Label htmlFor="est_vedette">Produit vedette</Label>
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
                <div className="grid flex-1 gap-2">
                  <Label htmlFor={`images.${index}.url`}>URL de l&apos;image {index + 1}</Label>
                  <Input id={`images.${index}.url`} {...form.register(`images.${index}.url`)} />
                  {form.formState.errors.images?.[index]?.url && (
                    <p className="text-sm text-destructive">{form.formState.errors.images[index]?.url?.message}</p>
                  )}
                </div>
                <div className="grid flex-1 gap-2">
                  <Label htmlFor={`images.${index}.alt`}>Texte Alt</Label>
                  <Input id={`images.${index}.alt`} {...form.register(`images.${index}.alt`)} />
                  {form.formState.errors.images?.[index]?.alt && (
                    <p className="text-sm text-destructive">{form.formState.errors.images[index]?.alt?.message}</p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeImage(index)}
                  className="shrink-0"
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Supprimer l&apos;image</span>
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => appendImage({ url: "", alt: "" })}
              className="w-full"
            >
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
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Mise à jour en cours...
            </>
          ) : (
            "Mettre à jour le produit"
          )}
        </Button>
      </form>
    </div>
  )
}
