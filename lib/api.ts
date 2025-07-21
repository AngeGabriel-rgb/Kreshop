const API_BASE_URL = 'https://kreshop.onrender.com';

// Types de base (à adapter selon les besoins)
export interface Produit {
  id: number;
  nom: string;
  slug: string;
  description?: string;
  prix_fcfa: number;
  // ... autres champs
}

export interface Categorie {
  id: number;
  nom: string;
  // ... autres champs
}

export interface Commande {
  id: number;
  numero_commande: string;
  // ... autres champs
}

// Types d'énumérations
export type StatutCommande = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type StatutPaiement = 'pending' | 'paid' | 'failed' | 'refunded';
export type TypeAdresse = 'shipping' | 'billing';
export type TypeRemise = 'percentage' | 'fixed_amount';

// Interfaces enrichies
export interface Produit {
  id: number;
  nom: string;
  slug: string;
  description?: string;
  description_courte?: string;
  prix_fcfa: number;
  prix_comparaison_fcfa?: number;
  prix_cout_fcfa?: number;
  sku?: string;
  code_barre?: string;
  categorie_id: number;
  marque?: string;
  poids?: number;
  dimensions?: any;
  est_actif: boolean;
  est_vedette: boolean;
  titre_seo?: string;
  description_seo?: string;
  date_creation: string;
  date_modification: string;
}

export interface VarianteProduit {
  id: number;
  produit_id: number;
  nom: string;
  sku?: string;
  prix_fcfa?: number;
  prix_comparaison_fcfa?: number;
  taille?: string;
  couleur?: string;
  quantite_stock: number;
  seuil_stock_bas: number;
  est_actif: boolean;
  date_creation: string;
}

export interface ImageProduit {
  id: number;
  produit_id: number;
  variante_id?: number;
  url_image: string;
  texte_alternatif?: string;
  ordre_tri: number;
  est_principale: boolean;
  cloudinary_public_id?: string;
}

export interface Categorie {
  id: number;
  nom: string;
  slug: string;
  description?: string;
  parent_id?: number;
  url_image?: string;
  est_active: boolean;
  ordre_tri: number;
  date_creation: string;
}

export interface Commande {
  id: number;
  numero_commande: string;
  client_id: number;
  statut: StatutCommande;
  statut_paiement: StatutPaiement;
  sous_total_fcfa: number;
  taxes_fcfa: number;
  livraison_fcfa: number;
  remise_fcfa: number;
  total_fcfa: number;
  devise: string;
  methode_paiement?: string;
  reference_paiement?: string;
  adresse_livraison?: any;
  adresse_facturation?: any;
  notes?: string;
  date_creation: string;
  date_modification: string;
}

export interface ArticleCommande {
  id: number;
  commande_id: number;
  produit_id: number;
  variante_id?: number;
  quantite: number;
  prix_fcfa: number;
  total_fcfa: number;
  instantane_produit?: any;
}

export interface Adresse {
  id: number;
  client_id: number;
  type: TypeAdresse;
  prenom: string;
  nom: string;
  entreprise?: string;
  ligne_adresse_1: string;
  ligne_adresse_2?: string;
  ville: string;
  quartier?: string;
  code_postal?: string;
  pays: string;
  telephone?: string;
  est_defaut: boolean;
  date_creation: string;
}

export interface CodePromotionnel {
  id: number;
  code: string;
  description?: string;
  type_remise: TypeRemise;
  valeur_remise: number;
  commande_minimum_fcfa?: number;
  limite_utilisation?: number;
  compteur_utilisation: number;
  est_actif: boolean;
  debut_validite?: string;
  fin_validite?: string;
  date_creation: string;
}

export interface AvisClient {
  id: number;
  produit_id: number;
  client_id: number;
  commande_id?: number;
  note: number;
  titre?: string;
  commentaire?: string;
  est_verifie: boolean;
  est_publie: boolean;
  date_creation: string;
}

export interface ListeSouhaits {
  id: number;
  client_id: number;
  produit_id: number;
  date_creation: string;
}

export interface Panier {
  id: number;
  client_id?: number;
  session_id?: string;
  produit_id: number;
  variante_id?: number;
  quantite: number;
  date_creation: string;
  date_modification: string;
}

// Helper fetch
export async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${url}`, options);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Produits
export const fetchProduits = () => fetchApi<Produit[]>('/products');
export const fetchProduitById = (id: number) => fetchApi<Produit>(`/products/${id}`);

// Catégories
export const fetchCategories = () => fetchApi<Categorie[]>('/categories');
export const fetchCategorieById = (id: number) => fetchApi<Categorie>(`/categories/${id}`);

// Commandes
export const fetchCommandes = (token: string) => fetchApi<Commande[]>('/orders', { headers: { Authorization: `Bearer ${token}` } });
export const fetchCommandeById = (id: number, token: string) => fetchApi<Commande>(`/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const createCommande = (data: Partial<Commande>, token: string) => fetchApi<Commande>('/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify(data)
});

// Variantes de produit
export const fetchVariantesProduit = () => fetchApi<VarianteProduit[]>('/product-variants');
export const fetchVarianteProduitById = (id: number) => fetchApi<VarianteProduit>(`/product-variants/${id}`);
export const createVarianteProduit = (data: Partial<VarianteProduit>, token: string) => fetchApi<VarianteProduit>('/product-variants', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data)
});
export const updateVarianteProduit = (id: number, data: Partial<VarianteProduit>, token: string) => fetchApi<VarianteProduit>(`/product-variants/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data)
});
export const deleteVarianteProduit = (id: number, token: string) => fetchApi<void>(`/product-variants/${id}`, {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${token}` }
});

// Images de produit
export const fetchImagesProduit = () => fetchApi<ImageProduit[]>('/product-images');
export const fetchImageProduitById = (id: number) => fetchApi<ImageProduit>(`/product-images/${id}`);
export const createImageProduit = (data: Partial<ImageProduit>, token: string) => fetchApi<ImageProduit>('/product-images', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data)
});
export const updateImageProduit = (id: number, data: Partial<ImageProduit>, token: string) => fetchApi<ImageProduit>(`/product-images/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data)
});
export const deleteImageProduit = (id: number, token: string) => fetchApi<void>(`/product-images/${id}`, {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${token}` }
});

// Articles de commande
export const fetchArticlesCommande = (token: string) => fetchApi<ArticleCommande[]>('/order-items', { headers: { Authorization: `Bearer ${token}` } });
export const fetchArticleCommandeById = (id: number, token: string) => fetchApi<ArticleCommande>(`/order-items/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const createArticleCommande = (data: Partial<ArticleCommande>, token: string) => fetchApi<ArticleCommande>('/order-items', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data)
});
export const updateArticleCommande = (id: number, data: Partial<ArticleCommande>, token: string) => fetchApi<ArticleCommande>(`/order-items/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data)
});
export const deleteArticleCommande = (id: number, token: string) => fetchApi<void>(`/order-items/${id}`, {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${token}` }
});

// Adresses
export const fetchAdresses = (token: string) => fetchApi<Adresse[]>('/addresses', { headers: { Authorization: `Bearer ${token}` } });
export const fetchAdresseById = (id: number, token: string) => fetchApi<Adresse>(`/addresses/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const createAdresse = (data: Partial<Adresse>, token: string) => fetchApi<Adresse>('/addresses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data)
});
export const updateAdresse = (id: number, data: Partial<Adresse>, token: string) => fetchApi<Adresse>(`/addresses/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data)
});
export const deleteAdresse = (id: number, token: string) => fetchApi<void>(`/addresses/${id}`, {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${token}` }
});

// Codes promotionnels
export const fetchCodesPromotionnels = () => fetchApi<CodePromotionnel[]>('/coupons');
export const fetchCodePromotionnelById = (id: number) => fetchApi<CodePromotionnel>(`/coupons/${id}`);
export const createCodePromotionnel = (data: Partial<CodePromotionnel>, token: string) => fetchApi<CodePromotionnel>('/coupons', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data)
});
export const updateCodePromotionnel = (id: number, data: Partial<CodePromotionnel>, token: string) => fetchApi<CodePromotionnel>(`/coupons/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data)
});
export const deleteCodePromotionnel = (id: number, token: string) => fetchApi<void>(`/coupons/${id}`, {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${token}` }
});

// Avis clients
export const fetchAvisClients = () => fetchApi<AvisClient[]>('/reviews');
export const fetchAvisClientById = (id: number) => fetchApi<AvisClient>(`/reviews/${id}`);
export const createAvisClient = (data: Partial<AvisClient>, token: string) => fetchApi<AvisClient>('/reviews', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data)
});
export const updateAvisClient = (id: number, data: Partial<AvisClient>, token: string) => fetchApi<AvisClient>(`/reviews/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data)
});
export const deleteAvisClient = (id: number, token: string) => fetchApi<void>(`/reviews/${id}`, {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${token}` }
});

// Liste de souhaits
export const fetchListesSouhaits = (token: string) => fetchApi<ListeSouhaits[]>('/wishlists', { headers: { Authorization: `Bearer ${token}` } });
export const fetchListeSouhaitsById = (id: number, token: string) => fetchApi<ListeSouhaits>(`/wishlists/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const createListeSouhaits = (data: Partial<ListeSouhaits>, token: string) => fetchApi<ListeSouhaits>('/wishlists', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data)
});
export const updateListeSouhaits = (id: number, data: Partial<ListeSouhaits>, token: string) => fetchApi<ListeSouhaits>(`/wishlists/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data)
});
export const deleteListeSouhaits = (id: number, token: string) => fetchApi<void>(`/wishlists/${id}`, {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${token}` }
});

// Panier
export const fetchPaniers = (token: string) => fetchApi<Panier[]>('/cart', { headers: { Authorization: `Bearer ${token}` } });
export const fetchPanierById = (id: number, token: string) => fetchApi<Panier>(`/cart/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const createPanier = (data: Partial<Panier>, token: string) => fetchApi<Panier>('/cart', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data)
});
export const updatePanier = (id: number, data: Partial<Panier>, token: string) => fetchApi<Panier>(`/cart/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify(data)
});
export const deletePanier = (id: number, token: string) => fetchApi<void>(`/cart/${id}`, {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${token}` }
});

// Helpers de pagination/recherche (exemple générique)
export async function fetchPaginated<T>(url: string, page = 1, limit = 20, options?: RequestInit): Promise<{ data: T[]; total: number; page: number; limit: number }> {
  const res = await fetch(`${API_BASE_URL}${url}?page=${page}&limit=${limit}`, options);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
} 