"use client"

import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormConfig, FormRef } from "@/components/ui/form"
import { useClient } from "@/components/client-provider"

export default function ContactPage() {
  const formRef = useRef<FormRef>(null)
  const { showSuccess } = useClient()

  const contactFormConfig: FormConfig = {
    id: "contact-form",
    fields: [
      {
        name: "nom",
        label: "Nom complet",
        type: "text",
        placeholder: "Votre nom complet",
        required: true
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "votre@email.com",
        required: true,
        validation: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            return "Format d'email invalide"
          }
        }
      },
      {
        name: "telephone",
        label: "Téléphone",
        type: "tel",
        placeholder: "+221 77 123 45 67"
      },
      {
        name: "sujet",
        label: "Sujet",
        type: "select",
        placeholder: "Choisir un sujet",
        required: true,
        options: [
          { value: "commande", label: "Question sur une commande" },
          { value: "produit", label: "Information sur un produit" },
          { value: "livraison", label: "Question sur la livraison" },
          { value: "autre", label: "Autre" }
        ]
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        placeholder: "Décrivez votre demande...",
        required: true,
        validation: (value) => {
          if (value.length < 10) {
            return "Le message doit contenir au moins 10 caractères"
          }
        }
      },
      {
        name: "newsletter",
        label: "S'abonner à la newsletter",
        type: "checkbox"
      }
    ],
    onSubmit: async (values) => {
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log("Formulaire soumis:", values)
      showSuccess("Votre message a été envoyé avec succès !")
      
      // Réinitialiser le formulaire
      formRef.current?.reset()
    },
    submitText: "Envoyer le message",
    resetText: "Réinitialiser"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-brun-chocolat">
              Contactez-nous
            </CardTitle>
            <CardDescription className="text-lg">
              Nous sommes là pour vous aider. N'hésitez pas à nous contacter !
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form
              ref={formRef}
              {...contactFormConfig}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
