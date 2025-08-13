"use client"

import React, { forwardRef, useImperativeHandle } from "react"
import { useForm } from "@/components/client-provider"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Textarea } from "./textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Checkbox } from "./checkbox"
import { RadioGroup, RadioGroupItem } from "./radio-group"

// Types pour les champs de formulaire
export interface FormField {
  name: string
  label: string
  type: "text" | "email" | "password" | "number" | "tel" | "textarea" | "select" | "checkbox" | "radio"
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[] // Pour select et radio
  validation?: (value: any) => string | undefined
}

export interface FormConfig {
  id: string
  fields: FormField[]
  onSubmit: (values: Record<string, any>) => Promise<void>
  submitText?: string
  resetText?: string
  showReset?: boolean
}

export interface FormRef {
  reset: () => void
  setValues: (values: Record<string, any>) => void
  setErrors: (errors: Record<string, string>) => void
}

// Composant de formulaire principal
export const Form = forwardRef<FormRef, FormConfig>(({
  id,
  fields,
  onSubmit,
  submitText = "Soumettre",
  resetText = "Réinitialiser",
  showReset = true
}, ref) => {
  const { form, setValues, setErrors, reset, handleSubmit } = useForm(id)

  // Expose les méthodes via la ref
  useImperativeHandle(ref, () => ({
    reset,
    setValues,
    setErrors
  }), [reset, setValues, setErrors])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation des champs
    const errors: Record<string, string> = {}
    const values: Record<string, any> = {}

    fields.forEach(field => {
      const value = form.values[field.name]
      
      if (field.required && (!value || value.toString().trim() === "")) {
        errors[field.name] = `${field.label} est requis`
      } else if (field.validation && value) {
        const validationError = field.validation(value)
        if (validationError) {
          errors[field.name] = validationError
        }
      }
      
      values[field.name] = value
    })

    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return
    }

    // Soumission du formulaire
    await handleSubmit(async () => {
      await onSubmit(values)
    })
  }

  const renderField = (field: FormField) => {
    const value = form.values[field.name] || ""
    const error = form.errors[field.name]
    const isRequired = field.required

    const commonProps = {
      id: field.name,
      name: field.name,
      value: value,
      onChange: (e: any) => {
        const newValue = e.target.type === "checkbox" ? e.target.checked : e.target.value
        setValues({ [field.name]: newValue })
      },
      className: error ? "border-red-500" : "",
      required: isRequired
    }

    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            {...commonProps}
            placeholder={field.placeholder}
            rows={4}
          />
        )

      case "select":
        return (
          <Select value={value} onValueChange={(newValue) => setValues({ [field.name]: newValue })}>
            <SelectTrigger className={error ? "border-red-500" : ""}>
              <SelectValue placeholder={field.placeholder || `Sélectionner ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "checkbox":
        return (
          <Checkbox
            {...commonProps}
            checked={Boolean(value)}
          />
        )

      case "radio":
        return (
          <RadioGroup
            value={value}
            onValueChange={(newValue) => setValues({ [field.name]: newValue })}
          >
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${field.name}-${option.value}`} />
                <Label htmlFor={`${field.name}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )

      default:
        return (
          <Input
            {...commonProps}
            type={field.type}
            placeholder={field.placeholder}
          />
        )
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {form.errors.general && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          {form.errors.general}
        </div>
      )}

      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name} className="text-sm font-medium">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          
          {renderField(field)}
          
          {form.errors[field.name] && (
            <p className="text-sm text-red-600">{form.errors[field.name]}</p>
          )}
        </div>
      ))}

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={form.isLoading}
          className="bg-corail-intensifie text-white hover:bg-corail-doux"
        >
          {form.isLoading ? "Chargement..." : submitText}
        </Button>
        
        {showReset && (
          <Button
            type="button"
            variant="outline"
            onClick={reset}
            disabled={form.isLoading}
          >
            {resetText}
          </Button>
        )}
      </div>
    </form>
  )
})

Form.displayName = "Form"
