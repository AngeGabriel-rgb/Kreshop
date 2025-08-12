// Exemple d'utilisation des nouvelles fonctionnalités de gestion du stock
// Ce fichier montre comment utiliser les nouvelles routes et fonctionnalités

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Exemple 1: Créer un produit avec gestion du stock
async function createProductWithStock() {
  try {
    const product = await prisma.produit.create({
      data: {
        nom: "T-shirt Premium",
        slug: "t-shirt-premium",
        description: "T-shirt de haute qualité en coton bio",
        prix_fcfa: 15000,
        categorie_id: 1, // Assurez-vous que cette catégorie existe
        gestion_stock: true,
        stock_disponible: 100,
        stock_reserve: 10,
        seuil_stock_bas: 20,
        statut_stock: 'EN_STOCK'
      }
    });

    console.log('Produit créé:', product);
    return product;
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
  }
}

// Exemple 2: Créer une variante avec stock
async function createVariantWithStock(produitId) {
  try {
    const variant = await prisma.varianteProduit.create({
      data: {
        produit_id: produitId,
        nom: "T-shirt Premium - Rouge - L",
        taille: "L",
        couleur: "Rouge",
        prix_fcfa: 15000,
        stock_disponible: 25,
        stock_reserve: 5,
        seuil_stock_bas: 10,
        statut_stock: 'EN_STOCK'
      }
    });

    console.log('Variante créée:', variant);
    return variant;
  } catch (error) {
    console.error('Erreur lors de la création de la variante:', error);
  }
}

// Exemple 3: Ajouter des images à un produit
async function addImagesToProduct(produitId) {
  try {
    const images = await prisma.imageProduit.createMany({
      data: [
        {
          produit_id: produitId,
          url_image: "https://example.com/t-shirt-rouge-1.jpg",
          texte_alternatif: "T-shirt Premium Rouge - Vue avant",
          ordre_tri: 1,
          est_principale: true
        },
        {
          produit_id: produitId,
          url_image: "https://example.com/t-shirt-rouge-2.jpg",
          texte_alternatif: "T-shirt Premium Rouge - Vue arrière",
          ordre_tri: 2,
          est_principale: false
        },
        {
          produit_id: produitId,
          url_image: "https://example.com/t-shirt-rouge-3.jpg",
          texte_alternatif: "T-shirt Premium Rouge - Détail",
          ordre_tri: 3,
          est_principale: false
        }
      ]
    });

    console.log('Images ajoutées:', images);
    return images;
  } catch (error) {
    console.error('Erreur lors de l\'ajout des images:', error);
  }
}

// Exemple 4: Récupérer un produit complet avec images et stock
async function getCompleteProduct(slug) {
  try {
    const product = await prisma.produit.findUnique({
      where: { slug },
      include: {
        categorie: true,
        images: {
          orderBy: { ordre_tri: 'asc' }
        },
        variantes: {
          where: { est_active: true },
          include: {
            images: {
              orderBy: { ordre_tri: 'asc' }
            }
          }
        }
      }
    });

    if (product) {
      // Calculer les informations de stock
      const totalStock = product.variantes.reduce((sum, variant) => sum + variant.stock_disponible, 0);
      const hasLowStock = product.variantes.some(variant => variant.statut_stock === 'STOCK_FAIBLE');
      const isOutOfStock = product.variantes.every(variant => variant.statut_stock === 'RUPTURE_STOCK');
      
      const productWithStock = {
        ...product,
        stock_info: {
          total_disponible: totalStock,
          has_low_stock: hasLowStock,
          is_out_of_stock: isOutOfStock,
          statut_global: isOutOfStock ? 'RUPTURE_STOCK' : hasLowStock ? 'STOCK_FAIBLE' : 'EN_STOCK'
        }
      };

      console.log('Produit complet:', JSON.stringify(productWithStock, null, 2));
      return productWithStock;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
  }
}

// Exemple 5: Mettre à jour le stock d'une variante
async function updateVariantStock(variantId, newStock) {
  try {
    const variant = await prisma.varianteProduit.update({
      where: { id: variantId },
      data: {
        stock_disponible: newStock,
        statut_stock: newStock === 0 ? 'RUPTURE_STOCK' : newStock <= 10 ? 'STOCK_FAIBLE' : 'EN_STOCK'
      },
      include: {
        produit: true
      }
    });

    console.log('Stock mis à jour:', variant);
    return variant;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du stock:', error);
  }
}

// Exemple 6: Récupérer les produits en stock faible
async function getLowStockProducts() {
  try {
    const products = await prisma.produit.findMany({
      where: {
        est_actif: true,
        statut_stock: 'STOCK_FAIBLE'
      },
      include: {
        categorie: true,
        variantes: {
          where: { statut_stock: 'STOCK_FAIBLE' }
        }
      }
    });

    console.log('Produits en stock faible:', products);
    return products;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits en stock faible:', error);
  }
}

// Exemple d'utilisation des nouvelles routes API
const apiExamples = {
  // GET /api/products - Récupérer tous les produits avec images et stock
  getAllProducts: `
    GET /api/products?page=1&limit=20&stockStatus=EN_STOCK
  `,

  // GET /api/products/slug/:slug - Récupérer un produit par slug avec toutes ses images
  getProductBySlug: `
    GET /api/products/slug/t-shirt-premium
  `,

  // PUT /api/products/:id/stock - Mettre à jour le stock d'un produit (Admin)
  updateProductStock: `
    PUT /api/products/1/stock
    {
      "stock_disponible": 50,
      "stock_reserve": 5,
      "seuil_stock_bas": 10
    }
  `,

  // PUT /api/products/variants/:variantId/stock - Mettre à jour le stock d'une variante (Admin)
  updateVariantStock: `
    PUT /api/products/variants/1/stock
    {
      "stock_disponible": 25,
      "stock_reserve": 3,
      "seuil_stock_bas": 5
    }
  `,

  // GET /api/products/admin/low-stock - Produits en stock faible (Admin)
  getLowStockProducts: `
    GET /api/products/admin/low-stock
  `,

  // GET /api/products/admin/out-of-stock - Produits en rupture de stock (Admin)
  getOutOfStockProducts: `
    GET /api/products/admin/out-of-stock
  `
};

// Fonction principale pour tester
async function runExamples() {
  console.log('=== Exemples de gestion du stock ===\n');

  // Créer un produit
  const product = await createProductWithStock();
  
  if (product) {
    // Ajouter des images
    await addImagesToProduct(product.id);
    
    // Créer une variante
    const variant = await createVariantWithStock(product.id);
    
    if (variant) {
      // Mettre à jour le stock
      await updateVariantStock(variant.id, 15);
    }
    
    // Récupérer le produit complet
    await getCompleteProduct(product.slug);
  }
  
  // Récupérer les produits en stock faible
  await getLowStockProducts();
  
  console.log('\n=== Exemples d\'utilisation des routes API ===');
  console.log(JSON.stringify(apiExamples, null, 2));
}

// Exporter les fonctions pour utilisation
export {
  createProductWithStock,
  createVariantWithStock,
  addImagesToProduct,
  getCompleteProduct,
  updateVariantStock,
  getLowStockProducts,
  apiExamples
};

// Démarrer les exemples si le fichier est exécuté directement
if (import.meta.url === `file://${process.argv[1]}`) {
  runExamples()
    .then(() => {
      console.log('Exemples terminés');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Erreur lors de l\'exécution des exemples:', error);
      process.exit(1);
    });
}
