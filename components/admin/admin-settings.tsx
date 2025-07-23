"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Settings, User, Bell, Shield, Database, Mail, CreditCard, Truck, Store, Smartphone } from "lucide-react"

export function AdminSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    orders: true,
    marketing: false,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-brun-chocolat">Paramètres</h1>
          <p className="text-taupe-fonce">Configuration de votre boutique GabonStyle</p>
        </div>
        <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">Sauvegarder les Modifications</Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-8 bg-beige-creme border border-taupe-rose">
          <TabsTrigger value="general" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            <Settings className="w-4 h-4 mr-2" />
            Général
          </TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            <User className="w-4 h-4 mr-2" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="store" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            <Store className="w-4 h-4 mr-2" />
            Boutique
          </TabsTrigger>
          <TabsTrigger value="payments" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            <CreditCard className="w-4 h-4 mr-2" />
            Paiements
          </TabsTrigger>
          <TabsTrigger value="shipping" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            <Truck className="w-4 h-4 mr-2" />
            Livraison
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-corail-doux data-[state=active]:text-white"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            <Shield className="w-4 h-4 mr-2" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-corail-doux data-[state=active]:text-white">
            <Database className="w-4 h-4 mr-2" />
            Système
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-taupe-rose">
              <CardHeader>
                <CardTitle className="text-brun-chocolat">Informations de l'Entreprise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nom de l'entreprise</Label>
                  <Input
                    id="company-name"
                    defaultValue="GabonStyle"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email de contact</Label>
                  <Input
                    id="company-email"
                    type="email"
                    defaultValue="contact@gabonstyle.com"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Téléphone</Label>
                  <Input
                    id="company-phone"
                    defaultValue="+241 XX XX XX XX"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">Adresse</Label>
                  <Textarea
                    id="company-address"
                    defaultValue="Libreville, Gabon"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-taupe-rose">
              <CardHeader>
                <CardTitle className="text-brun-chocolat">Configuration Régionale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Select defaultValue="africa-libreville">
                    <SelectTrigger className="border-taupe-rose focus:border-corail-doux">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="africa-libreville">Africa/Libreville</SelectItem>
                      <SelectItem value="africa-douala">Africa/Douala</SelectItem>
                      <SelectItem value="europe-paris">Europe/Paris</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Langue</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger className="border-taupe-rose focus:border-corail-doux">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Devise</Label>
                  <Select defaultValue="xaf">
                    <SelectTrigger className="border-taupe-rose focus:border-corail-doux">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xaf">Franc CFA (FCFA)</SelectItem>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                      <SelectItem value="usd">Dollar US ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Taux de TVA (%)</Label>
                  <Input
                    id="tax-rate"
                    type="number"
                    defaultValue="18"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-taupe-rose">
            <CardHeader>
              <CardTitle className="text-brun-chocolat">Profil Administrateur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-to-br from-corail-doux to-taupe-fonce rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  AD
                </div>
                <div className="space-y-2">
                  <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">Changer la Photo</Button>
                  <Button
                    variant="outline"
                    className="border-taupe-rose text-brun-chocolat hover:bg-beige-rose bg-transparent"
                  >
                    Supprimer
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Prénom</Label>
                  <Input id="first-name" defaultValue="Admin" className="border-taupe-rose focus:border-corail-doux" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Nom</Label>
                  <Input
                    id="last-name"
                    defaultValue="GabonStyle"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    defaultValue="admin@gabonstyle.com"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-phone">Téléphone</Label>
                  <Input
                    id="admin-phone"
                    defaultValue="+241 XX XX XX XX"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biographie</Label>
                <Textarea
                  id="bio"
                  placeholder="Décrivez votre rôle et vos responsabilités..."
                  className="border-taupe-rose focus:border-corail-doux"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="store" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-taupe-rose">
              <CardHeader>
                <CardTitle className="text-brun-chocolat">Configuration de la Boutique</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Nom de la Boutique</Label>
                  <Input
                    id="store-name"
                    defaultValue="GabonStyle - Mode Africaine"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-description">Description</Label>
                  <Textarea
                    id="store-description"
                    defaultValue="Votre boutique de mode africaine authentique"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-url">URL de la Boutique</Label>
                  <Input
                    id="store-url"
                    defaultValue="https://gabonstyle.com"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="store-active" defaultChecked />
                  <Label htmlFor="store-active">Boutique active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="maintenance-mode" />
                  <Label htmlFor="maintenance-mode">Mode maintenance</Label>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-taupe-rose">
              <CardHeader>
                <CardTitle className="text-brun-chocolat">SEO et Réseaux Sociaux</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Titre Meta</Label>
                  <Input
                    id="meta-title"
                    defaultValue="GabonStyle - Mode Africaine Authentique"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-description">Description Meta</Label>
                  <Textarea
                    id="meta-description"
                    defaultValue="Découvrez la mode africaine authentique avec GabonStyle"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook-url">Facebook</Label>
                  <Input
                    id="facebook-url"
                    placeholder="https://facebook.com/gabonstyle"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram-url">Instagram</Label>
                  <Input
                    id="instagram-url"
                    placeholder="https://instagram.com/gabonstyle"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-taupe-rose">
              <CardHeader>
                <CardTitle className="text-brun-chocolat">Méthodes de Paiement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-taupe-rose rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-6 h-6 text-corail-doux" />
                      <div>
                        <p className="font-medium text-brun-chocolat">Mobile Money</p>
                        <p className="text-sm text-taupe-fonce">Airtel Money, Moov Money</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-taupe-rose rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-corail-doux" />
                      <div>
                        <p className="font-medium text-brun-chocolat">Cartes Bancaires</p>
                        <p className="text-sm text-taupe-fonce">Visa, Mastercard</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-taupe-rose rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Truck className="w-6 h-6 text-corail-doux" />
                      <div>
                        <p className="font-medium text-brun-chocolat">Paiement à la Livraison</p>
                        <p className="text-sm text-taupe-fonce">Cash on Delivery</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-taupe-rose">
              <CardHeader>
                <CardTitle className="text-brun-chocolat">Configuration Paiement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-currency">Devise par Défaut</Label>
                  <Select defaultValue="xaf">
                    <SelectTrigger className="border-taupe-rose">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xaf">Franc CFA (FCFA)</SelectItem>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-order">Commande Minimum (FCFA)</Label>
                  <Input
                    id="min-order"
                    type="number"
                    defaultValue="5000"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-timeout">Délai de Paiement (minutes)</Label>
                  <Input
                    id="payment-timeout"
                    type="number"
                    defaultValue="30"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-confirm" defaultChecked />
                  <Label htmlFor="auto-confirm">Confirmation automatique</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-taupe-rose">
              <CardHeader>
                <CardTitle className="text-brun-chocolat">Zones de Livraison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-taupe-rose rounded-lg">
                    <div>
                      <p className="font-medium text-brun-chocolat">Libreville</p>
                      <p className="text-sm text-taupe-fonce">Livraison: 2500 FCFA</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-taupe-rose rounded-lg">
                    <div>
                      <p className="font-medium text-brun-chocolat">Port-Gentil</p>
                      <p className="text-sm text-taupe-fonce">Livraison: 5000 FCFA</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-taupe-rose rounded-lg">
                    <div>
                      <p className="font-medium text-brun-chocolat">Autres Villes</p>
                      <p className="text-sm text-taupe-fonce">Livraison: 7500 FCFA</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-corail-doux text-corail-doux hover:bg-corail-doux hover:text-white bg-transparent"
                >
                  Ajouter une Zone
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-taupe-rose">
              <CardHeader>
                <CardTitle className="text-brun-chocolat">Paramètres de Livraison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="delivery-time">Délai de Livraison (jours)</Label>
                  <Input
                    id="delivery-time"
                    type="number"
                    defaultValue="3"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="free-shipping">Livraison Gratuite à partir de (FCFA)</Label>
                  <Input
                    id="free-shipping"
                    type="number"
                    defaultValue="50000"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight-limit">Poids Maximum (kg)</Label>
                  <Input
                    id="weight-limit"
                    type="number"
                    defaultValue="10"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="express-delivery" />
                  <Label htmlFor="express-delivery">Livraison Express disponible</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="pickup-available" defaultChecked />
                  <Label htmlFor="pickup-available">Retrait en magasin</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-taupe-rose">
              <CardHeader>
                <CardTitle className="text-brun-chocolat">Préférences de Notification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-brun-chocolat">Notifications Email</Label>
                    <p className="text-sm text-taupe-fonce">Recevoir les notifications par email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-brun-chocolat">Notifications Push</Label>
                    <p className="text-sm text-taupe-fonce">Recevoir les notifications push dans le navigateur</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-brun-chocolat">Notifications SMS</Label>
                    <p className="text-sm text-taupe-fonce">Recevoir les notifications par SMS</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-brun-chocolat">Alertes Commandes</Label>
                    <p className="text-sm text-taupe-fonce">Notifications pour les nouvelles commandes</p>
                  </div>
                  <Switch
                    checked={notifications.orders}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, orders: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-brun-chocolat">Marketing</Label>
                    <p className="text-sm text-taupe-fonce">Recevoir les newsletters et promotions</p>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, marketing: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-taupe-rose">
              <CardHeader>
                <CardTitle className="text-brun-chocolat">Configuration Email</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-server">Serveur SMTP</Label>
                  <Input
                    id="smtp-server"
                    defaultValue="smtp.gmail.com"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">Port SMTP</Label>
                  <Input id="smtp-port" defaultValue="587" className="border-taupe-rose focus:border-corail-doux" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">Nom d'utilisateur</Label>
                  <Input
                    id="smtp-username"
                    defaultValue="admin@gabonstyle.com"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">Mot de passe</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    placeholder="••••••••"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <Button className="w-full bg-corail-doux hover:bg-corail-intensifie text-white">
                  <Mail className="w-4 h-4 mr-2" />
                  Tester la Configuration
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-taupe-rose">
              <CardHeader>
                <CardTitle className="text-brun-chocolat">Sécurité du Compte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mot de passe actuel</Label>
                  <Input id="current-password" type="password" className="border-taupe-rose focus:border-corail-doux" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nouveau mot de passe</Label>
                  <Input id="new-password" type="password" className="border-taupe-rose focus:border-corail-doux" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                  <Input id="confirm-password" type="password" className="border-taupe-rose focus:border-corail-doux" />
                </div>
                <Button className="w-full bg-corail-doux hover:bg-corail-intensifie text-white">
                  Changer le Mot de Passe
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-taupe-rose">
              <CardHeader>
                <CardTitle className="text-brun-chocolat">Authentification à Deux Facteurs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-brun-chocolat">2FA Activé</Label>
                    <p className="text-sm text-taupe-fonce">Sécurité renforcée pour votre compte</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Méthode d'authentification</Label>
                  <Select defaultValue="app">
                    <SelectTrigger className="border-taupe-rose focus:border-corail-doux">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="app">Application d'authentification</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-taupe-rose text-brun-chocolat hover:bg-beige-rose bg-transparent"
                >
                  Configurer 2FA
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-taupe-rose">
            <CardHeader>
              <CardTitle className="text-brun-chocolat">Sessions Actives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-taupe-rose rounded-lg">
                  <div>
                    <div className="font-medium text-brun-chocolat">Session Actuelle</div>
                    <div className="text-sm text-taupe-fonce">Libreville, Gabon • Chrome sur Windows</div>
                    <div className="text-xs text-taupe-fonce">Dernière activité: maintenant</div>
                  </div>
                  <Badge className="bg-green-500 text-white">Actuelle</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border border-taupe-rose rounded-lg">
                  <div>
                    <div className="font-medium text-brun-chocolat">Session Mobile</div>
                    <div className="text-sm text-taupe-fonce">Port-Gentil, Gabon • Safari sur iPhone</div>
                    <div className="text-xs text-taupe-fonce">Dernière activité: il y a 2 heures</div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    Déconnecter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-taupe-rose">
              <CardHeader>
                <CardTitle className="text-brun-chocolat">Configuration de la Base de Données</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="db-host">Hôte de la Base de Données</Label>
                  <Input id="db-host" defaultValue="localhost" className="border-taupe-rose focus:border-corail-doux" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-port">Port</Label>
                  <Input id="db-port" defaultValue="5432" className="border-taupe-rose focus:border-corail-doux" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-name">Nom de la Base</Label>
                  <Input
                    id="db-name"
                    defaultValue="gabonstyle_db"
                    className="border-taupe-rose focus:border-corail-doux"
                  />
                </div>
                <Button className="w-full bg-corail-doux hover:bg-corail-intensifie text-white">
                  <Database className="w-4 h-4 mr-2" />
                  Tester la Connexion
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-taupe-rose">
              <CardHeader>
                <CardTitle className="text-brun-chocolat">Sauvegarde et Maintenance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-brun-chocolat">Sauvegarde Automatique</Label>
                    <p className="text-sm text-taupe-fonce">Sauvegarde quotidienne à 2h00</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Fréquence de Sauvegarde</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger className="border-taupe-rose focus:border-corail-doux">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Toutes les heures</SelectItem>
                      <SelectItem value="daily">Quotidienne</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-taupe-fonce hover:bg-taupe-fonce/90 text-white">
                    Créer une Sauvegarde Maintenant
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-taupe-rose text-brun-chocolat hover:bg-beige-rose bg-transparent"
                  >
                    Restaurer depuis une Sauvegarde
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-taupe-rose">
            <CardHeader>
              <CardTitle className="text-brun-chocolat">Informations Système</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-brun-chocolat">Version de l'Application</Label>
                  <p className="text-lg font-semibold text-taupe-fonce">v2.1.4</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-brun-chocolat">Dernière Mise à Jour</Label>
                  <p className="text-lg font-semibold text-taupe-fonce">15 Jan 2024</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-brun-chocolat">Statut du Système</Label>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-lg font-semibold text-green-600">Opérationnel</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-taupe-rose">
                <div className="flex space-x-4">
                  <Button className="bg-corail-doux hover:bg-corail-intensifie text-white">
                    Vérifier les Mises à Jour
                  </Button>
                  <Button
                    variant="outline"
                    className="border-taupe-rose text-brun-chocolat hover:bg-beige-rose bg-transparent"
                  >
                    Logs Système
                  </Button>
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent">
                    Redémarrer le Système
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
