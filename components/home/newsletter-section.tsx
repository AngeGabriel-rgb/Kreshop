"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubscribed(true)
    setIsLoading(false)
    setEmail("")
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Mail className="h-8 w-8 text-primary" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">Restez informé(e)</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Recevez nos dernières offres, nouveautés et conseils mode directement dans votre boîte mail
            </p>

            {isSubscribed ? (
              <div className="flex items-center justify-center space-x-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Merci pour votre inscription !</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? "Inscription..." : "S'abonner"}
                </Button>
              </form>
            )}

            <p className="text-xs text-muted-foreground mt-4">
              En vous abonnant, vous acceptez de recevoir nos emails marketing. Vous pouvez vous désabonner à tout
              moment.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
