import { PrismaClient } from '@prisma/client';
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
        maxPrice 
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
        ...(maxPrice && { prix_fcfa: { lte: parseFloat(maxPrice) } })
      };

      const [products, total] = await Promise.all([
        prisma.produit.findMany({
          where,
          include: {
            categorie: true,
            images: {
              where: { est_principale: true },
              take: 1
            },
            variantes: {
              where: { est_active: true }
            }
          },
          skip: parseInt(skip),
          take: parseInt(limit),
          orderBy: { [sort]: 'desc' }
        }),
        prisma.produit.count({ where })
      ]);

      res.json({
        success: true,
        data: products,
        meta: {
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit)
          },
          filters: { category, search, sort }
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
              images: true
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
  }
};

export default productController;