# Intégration de Clerk dans KreShop

## Vue d'ensemble

Cette application utilise maintenant [Clerk](https://clerk.com/) pour gérer l'authentification des utilisateurs (clients et administrateurs) au lieu du système d'authentification personnalisé précédent.

## Configuration requise

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```bash
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/account
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/account

# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://kreshop.onrender.com
```

### 2. Configuration Clerk Dashboard

1. Créez un compte sur [Clerk.com](https://clerk.com/)
2. Créez une nouvelle application
3. Récupérez vos clés API (Publishable Key et Secret Key)
4. Configurez les URLs de redirection dans le dashboard Clerk

## Fonctionnalités implémentées

### Authentification
- ✅ Connexion utilisateur
- ✅ Inscription utilisateur
- ✅ Déconnexion
- ✅ Protection des routes
- ✅ Gestion des rôles (client/admin)

### Composants Clerk utilisés
- `<ClerkProvider>` - Provider principal
- `<SignIn>` - Page de connexion
- `<SignUp>` - Page d'inscription
- `<SignInButton>` - Bouton de connexion
- `<SignUpButton>` - Bouton d'inscription
- `<SignOutButton>` - Bouton de déconnexion
- `<UserButton>` - Menu utilisateur
- `<SignedIn>` - Condition d'affichage pour utilisateurs connectés
- `<SignedOut>` - Condition d'affichage pour utilisateurs non connectés

### Hooks personnalisés
- `useClerkAuth()` - Hook qui combine Clerk avec la logique métier
- `useClient()` - Hook pour accéder au ClientProvider
- `useForm(formId)` - Hook spécialisé pour la gestion des formulaires

## Structure des fichiers modifiés

### Layout principal
- `app/layout.tsx` - Layout principal avec Header complet
- `app/layout-clerk.tsx` - Layout alternatif avec Header Clerk simplifié

### Composants d'authentification
- `components/header.tsx` - Header complet avec navigation et authentification
- `components/clerk-header.tsx` - Header simplifié avec composants Clerk uniquement
- `components/protected-route.tsx` - Protection des routes

### Pages d'authentification
- `app/login/page.tsx` - Page de connexion Clerk
- `app/register/page.tsx` - Page d'inscription Clerk
- `app/account/page.tsx` - Page de compte utilisateur

### Middleware
- `middleware.ts` - Configuration des routes protégées

### Hooks et Providers
- `hooks/use-clerk-auth.ts` - Hook personnalisé pour l'authentification
- `components/client-provider.tsx` - Provider pour la gestion des formulaires et de l'état global
- `components/ui/form.tsx` - Composant de formulaire réutilisable

## Options de Header

### Option 1 : Header complet (recommandé)
Le fichier `app/layout.tsx` utilise le composant `Header` complet qui inclut :
- Navigation complète (Accueil, Produits, Catégories)
- Gestion du panier
- Authentification avec Clerk
- Design harmonisé avec votre thème KreShop

### Option 2 : Header Clerk simplifié
Le fichier `app/layout-clerk.tsx` utilise le composant `ClerkHeader` qui inclut :
- Authentification Clerk uniquement (Connexion/Inscription/UserButton)
- Design minimaliste
- Parfait pour les applications simples

Pour utiliser le header simplifié, renommez `app/layout-clerk.tsx` en `app/layout.tsx`.

## Gestion des rôles

### Rôle Client (par défaut)
- Accès aux produits et catégories
- Gestion du panier
- Passage de commande
- Accès au compte personnel

### Rôle Admin
- Accès au tableau de bord admin
- Gestion des produits
- Gestion des catégories
- Gestion des commandes
- Gestion des utilisateurs

### Configuration des rôles
Les rôles sont stockés dans les `publicMetadata` de Clerk. Pour attribuer un rôle admin :

1. Dans le dashboard Clerk, allez dans "Users"
2. Sélectionnez l'utilisateur
3. Dans "Public metadata", ajoutez : `{"role": "admin"}`

## Migration depuis l'ancien système

### Ancien système
- `lib/auth.tsx` - Ancien AuthProvider
- `useAuth()` - Ancien hook d'authentification

### Nouveau système
- `hooks/use-clerk-auth.ts` - Nouveau hook Clerk
- `useClerkAuth()` - Nouveau hook d'authentification

### Remplacement des imports
```typescript
// Ancien
import { useAuth } from "@/lib/auth"

// Nouveau
import { useClerkAuth } from "@/hooks/use-clerk-auth"
```

## ClientProvider - Gestion des formulaires et de l'état global

### Fonctionnalités du ClientProvider

Le `ClientProvider` offre une solution complète pour gérer l'état de votre application :

#### 🎯 **Gestion des formulaires**
- **État centralisé** : Gestion de l'état de chargement, des erreurs et des valeurs
- **Validation intégrée** : Support des validations personnalisées par champ
- **Gestion des erreurs** : Affichage automatique des erreurs de validation
- **Réinitialisation** : Possibilité de réinitialiser facilement les formulaires

#### 🔔 **Système de notifications**
- **Notifications de succès** : `showSuccess(message)`
- **Notifications d'erreur** : `showError(message)`
- **Notifications d'information** : `showInfo(message)`

#### 🛒 **Gestion du panier**
- **Ajout de produits** : `addToCart(item)`
- **Suppression de produits** : `removeFromCart(itemId)`
- **Vidage du panier** : `clearCart()`

#### 📱 **État global de l'application**
- **Indicateur de chargement** : `isAppLoading` et `setAppLoading()`
- **Gestion des états** : Centralisation de l'état de l'application

### Utilisation du composant Form

```typescript
import { Form, FormConfig } from "@/components/ui/form"

const formConfig: FormConfig = {
  id: "mon-formulaire",
  fields: [
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      validation: (value) => {
        if (!value.includes("@")) return "Email invalide"
      }
    }
  ],
  onSubmit: async (values) => {
    // Traitement du formulaire
  }
}

// Dans votre composant
<Form {...formConfig} />
```

### Types de champs supportés
- **Text** : `text`, `email`, `password`, `number`, `tel`
- **Textarea** : Champs de texte multi-lignes
- **Select** : Listes déroulantes avec options
- **Checkbox** : Cases à cocher
- **Radio** : Boutons radio avec options

## Avantages de Clerk

1. **Sécurité** : Authentification robuste et sécurisée
2. **Facilité d'utilisation** : Composants prêts à l'emploi
3. **Gestion des sessions** : Sessions sécurisées et renouvellement automatique
4. **Multi-facteurs** : Support 2FA et autres méthodes de sécurité
5. **Dashboard** : Interface d'administration des utilisateurs
6. **Webhooks** : Intégration avec d'autres services
7. **Personnalisation** : Thèmes et styles personnalisables

## Dépannage

### Erreur "Clerk not configured"
- Vérifiez que les variables d'environnement sont correctement définies
- Redémarrez le serveur de développement

### Problèmes de redirection
- Vérifiez la configuration des URLs dans le dashboard Clerk
- Assurez-vous que les routes correspondent à votre application

### Problèmes de rôles
- Vérifiez que les `publicMetadata` sont correctement configurés
- Utilisez le hook `useClerkAuth()` pour accéder aux informations utilisateur

## Support

- [Documentation Clerk](https://clerk.com/docs)
- [Clerk Next.js Integration](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Components](https://clerk.com/docs/components/overview)
