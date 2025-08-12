import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Fonction utilitaire pour la gestion des erreurs
const handleError = (res, error, message = 'Une erreur est survenue') => {
  console.error(error);
  res.status(500).json({ 
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
};

export const productController = {
  // ====================================
  // SECTION PUBLIQUE (Pas d'authentification requise)
  // ====================================

  /**
   * Récupérer tous les produits (public)
   */
  getAllProducts: async (req, res) => {
    try {
      const { 
        page = 1, 
        limit = 20, 
        category, 
        search, 
        sort = 'date_creation',
        minPrice,
        maxPrice,
        stockStatus 
      } = req.query;
      
      const skip = (page - 1) * limit;

      const where = {
        est_actif: true,
        ...(category && { categorie: { slug: category } }),
        ...(search && {
          OR: [
            { nom: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
          ]
        }),
        ...(minPrice && { prix_fcfa: { gte: parseFloat(minPrice) } }),
        ...(maxPrice && { prix_fcfa: { lte: parseFloat(maxPrice) } }),
        ...(stockStatus && { statut_stock: stockStatus })
      };

      const [products, total] = await Promise.all([
        prisma.produit.findMany({
          where,
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
          },
          skip: parseInt(skip),
          take: parseInt(limit),
          orderBy: { [sort]: 'desc' }
        }),
        prisma.produit.count({ where })
      ]);

      // Calculer le stock total pour chaque produit
      const productsWithStock = products.map(product => {
        const totalStock = product.variantes.reduce((sum, variant) => sum + variant.stock_disponible, 0);
        const hasLowStock = product.variantes.some(variant => variant.statut_stock === 'STOCK_FAIBLE');
        const isOutOfStock = product.variantes.every(variant => variant.statut_stock === 'RUPTURE_STOCK');
        
        return {
          ...product,
          stock_info: {
            total_disponible: totalStock,
            has_low_stock: hasLowStock,
            is_out_of_stock: isOutOfStock,
            statut_global: isOutOfStock ? 'RUPTURE_STOCK' : hasLowStock ? 'STOCK_FAIBLE' : 'EN_STOCK'
          }
        };
      });

      res.json({
        success: true,
        data: productsWithStock,
        meta: {
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit)
          },
          filters: { category, search, sort, stockStatus }
        }
      });
    } catch (error) {
      handleError(res, error, 'Erreur lors de la récupération des produits');
    }
  },

  /**
   * Récupérer un produit par slug (public)
   */
  getProductBySlug: async (req, res) => {
    try {
      const { slug } = req.params;

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
          },
          avis_clients: {
            where: { est_publie: true },
            include: {
              client: {
                select: { prenom: true, nom: true }
              }
            },
            orderBy: { date_creation: 'desc' },
            take: 10
          }
        }
      });

      if (!product || !product.est_actif) {
        return res.status(404).json({ 
          success: false,
          message: 'Produit non trouvé'
        });
      }

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

      res.json({
        success: true,
        data: productWithStock
      });
    } catch (error) {
      handleError(res, error, 'Erreur lors de la récupération du produit');
    }
  },

  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await prisma.produit.findUnique({
        where: { id: parseInt(id) },
        include: {
          categorie: true,
          images: true,
          variantes: true
        }
      });

      if (!product || !product.est_actif) {
        return res.status(404).json({
          success: false,
          message: 'Produit non trouvé'
        });
      }

      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      handleError(res, error, 'Erreur lors de la récupération du produit');
    }
  },

  // ====================================
  // SECTION ADMIN (Authentification et rôle admin requis)
  // ====================================

  /**
   * Créer un nouveau produit (Admin)
   */
  createProduct: async (req, res) => {
    try {
      const productData = req.body;

      // Validation des données
      if (!productData.nom || !productData.categorie_id) {
        return res.status(400).json({
          success: false,
          message: 'Le nom et la catégorie sont obligatoires'
        });
      }

      const product = await prisma.produit.create({
        data: {
          ...productData,
          slug: productData.nom.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          date_creation: new Date(),
          date_modification: new Date()
        },
        include: {
          categorie: true
        }
      });

      res.status(201).json({
        success: true,
        message: 'Produit créé avec succès',
        data: product
      });
    } catch (error) {
      handleError(res, error, 'Erreur lors de la création du produit');
    }
  },

  /**
   * Mettre à jour un produit (Admin)
   */
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const product = await prisma.produit.update({
        where: { id: parseInt(id) },
        data: {
          ...updateData,
          ...(updateData.nom && { 
            slug: updateData.nom.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') 
          }),
          date_modification: new Date()
        },
        include: {
          categorie: true,
          images: true,
          variantes: true
        }
      });

      res.json({
        success: true,
        message: 'Produit mis à jour avec succès',
        data: product
      });
    } catch (error) {
      handleError(res, error, 'Erreur lors de la mise à jour du produit');
    }
  },

  /**
   * Supprimer/désactiver un produit (Admin)
   */
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      await prisma.produit.update({
        where: { id: parseInt(id) },
        data: { 
          est_actif: false,
          date_modification: new Date()
        }
      });

      res.json({
        success: true,
        message: 'Produit désactivé avec succès'
      });
    } catch (error) {
      handleError(res, error, 'Erreur lors de la désactivation du produit');
    }
  },

  /**
   * Récupérer les produits non actifs (Admin)
   */
  getInactiveProducts: async (req, res) => {
    try {
      const products = await prisma.produit.findMany({
        where: { est_actif: false },
        include: {
          categorie: true
        }
      });

      res.json({
        success: true,
        data: products
      });
    } catch (error) {
      handleError(res, error, 'Erreur lors de la récupération des produits inactifs');
    }
  },

  // ====================================
  // GESTION DU STOCK
  // ====================================

  /**
   * Mettre à jour le stock d'un produit (Admin)
   */
  updateProductStock: async (req, res) => {
    try {
      const { id } = req.params;
      const { stock_disponible, stock_reserve, seuil_stock_bas } = req.body;

      const product = await prisma.produit.update({
        where: { id: parseInt(id) },
        data: {
          stock_disponible: parseInt(stock_disponible) || 0,
          stock_reserve: parseInt(stock_reserve) || 0,
          seuil_stock_bas: parseInt(seuil_stock_bas) || 5,
          statut_stock: getStockStatus(parseInt(stock_disponible) || 0, parseInt(seuil_stock_bas) || 5),
          date_modification: new Date()
        },
        include: {
          categorie: true,
          variantes: true
        }
      });

      res.json({
        success: true,
        message: 'Stock mis à jour avec succès',
        data: product
      });
    } catch (error) {
      handleError(res, error, 'Erreur lors de la mise à jour du stock');
    }
  },

  /**
   * Mettre à jour le stock d'une variante (Admin)
   */
  updateVariantStock: async (req, res) => {
    try {
      const { variantId } = req.params;
      const { stock_disponible, stock_reserve, seuil_stock_bas } = req.body;

      const variant = await prisma.varianteProduit.update({
        where: { id: parseInt(variantId) },
        data: {
          stock_disponible: parseInt(stock_disponible) || 0,
          stock_reserve: parseInt(stock_reserve) || 0,
          seuil_stock_bas: parseInt(seuil_stock_bas) || 5,
          statut_stock: getStockStatus(parseInt(stock_disponible) || 0, parseInt(seuil_stock_bas) || 5),
          date_creation: new Date()
        },
        include: {
          produit: true,
          images: true
        }
      });

      // Mettre à jour le stock total du produit
      await updateProductTotalStock(variant.produit_id);

      res.json({
        success: true,
        message: 'Stock de la variante mis à jour avec succès',
        data: variant
      });
    } catch (error) {
      handleError(res, error, 'Erreur lors de la mise à jour du stock de la variante');
    }
  },

  /**
   * Récupérer les produits en rupture de stock (Admin)
   */
  getOutOfStockProducts: async (req, res) => {
    try {
      const products = await prisma.produit.findMany({
        where: {
          est_actif: true,
          statut_stock: 'RUPTURE_STOCK'
        },
        include: {
          categorie: true,
          variantes: {
            where: { statut_stock: 'RUPTURE_STOCK' }
          }
        }
      });

      res.json({
        success: true,
        data: products
      });
    } catch (error) {
      handleError(res, error, 'Erreur lors de la récupération des produits en rupture de stock');
    }
  },

  /**
   * Récupérer les produits en stock faible (Admin)
   */
  getLowStockProducts: async (req, res) => {
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

      res.json({
        success: true,
        data: products
      });
    } catch (error) {
      handleError(res, error, 'Erreur lors de la récupération des produits en stock faible');
    }
  }
};

// Fonctions utilitaires pour la gestion du stock
function getStockStatus(stockDisponible, seuilStockBas) {
  if (stockDisponible === 0) return 'RUPTURE_STOCK';
  if (stockDisponible <= seuilStockBas) return 'STOCK_FAIBLE';
  return 'EN_STOCK';
}

async function updateProductTotalStock(produitId) {
  const variantes = await prisma.varianteProduit.findMany({
    where: { produit_id: produitId }
  });

  const totalStock = variantes.reduce((sum, variant) => sum + variant.stock_disponible, 0);
  const totalReserve = variantes.reduce((sum, variant) => sum + variant.stock_reserve, 0);
  const hasLowStock = variantes.some(variant => variant.statut_stock === 'STOCK_FAIBLE');
  const isOutOfStock = variantes.every(variant => variant.statut_stock === 'RUPTURE_STOCK');

  await prisma.produit.update({
    where: { id: produitId },
    data: {
      stock_total: totalStock + totalReserve,
      stock_disponible: totalStock,
      stock_reserve: totalReserve,
      statut_stock: isOutOfStock ? 'RUPTURE_STOCK' : hasLowStock ? 'STOCK_FAIBLE' : 'EN_STOCK'
    }
  });
}

export default productController;