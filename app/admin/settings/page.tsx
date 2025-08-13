import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function AdminSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres du Site</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="site-name">Nom du Site</Label>
          <Input id="site-name" defaultValue="KreShop" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="site-description">Description du Site</Label>
          <Textarea
            id="site-description"
            defaultValue="Votre destination unique pour des produits de qualité."
            rows={3}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="maintenance-mode">Mode Maintenance</Label>
          <Switch id="maintenance-mode" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email de Contact</Label>
          <Input id="contact-email" type="email" defaultValue="info@kreshop.com" />
        </div>
        <Button className="bg-corail-intensifie text-white hover:bg-corail-doux">Sauvegarder les Paramètres</Button>
      </CardContent>
    </Card>
  )
}
