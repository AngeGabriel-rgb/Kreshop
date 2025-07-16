import express from 'express';
import { productController } from '../controllers/productController.js';
import { authenticate, authorize } from '../Middleware/middleware.js'; 

const router = express.Router();

// ====================================
// ROUTES PUBLIQUES
// ====================================

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Récupère tous les produits actifs
 *     tags: [Produits]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Numéro de page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Nombre d'éléments par page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Slug de la catégorie
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Terme de recherche
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Champ de tri (date_creation, prix_fcfa)
 *     responses:
 *       200:
 *         description: Liste des produits
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /products/{slug}:
 *   get:
 *     summary: Récupère un produit par son slug
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug du produit
 *     responses:
 *       200:
 *         description: Détails du produit
 *       404:
 *         description: Produit non trouvé
 */
router.get('/:slug', productController.getProductBySlug);

// ====================================
// ROUTES ADMIN (Authentification requise)
// ====================================

/**
 * @swagger
 * /products:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Crée un nouveau produit (Admin)
 *     tags: [Admin - Produits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produit créé
 *       401:
 *         description: Non autorisé
 *       400:
 *         description: Données invalides
 */
router.post(
  '/', 
  authenticate, 
  authorize('ADMIN'),
  productController.createProduct
);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Met à jour un produit (Admin)
 *     tags: [Admin - Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produit mis à jour
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Produit non trouvé
 */
router.put(
  '/:id', 
  authenticate, 
  authorize('ADMIN'),
  productController.updateProduct
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Désactive un produit (Admin)
 *     tags: [Admin - Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Produit désactivé
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Produit non trouvé
 */
router.delete(
  '/:id', 
  authenticate, 
  authorize('ADMIN'),
  productController.deleteProduct
);

/**
 * @swagger
 * /products/inactive:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Récupère les produits inactifs (Admin)
 *     tags: [Admin - Produits]
 *     responses:
 *       200:
 *         description: Liste des produits inactifs
 *       401:
 *         description: Non autorisé
 */
router.get(
  '/inactive/list', 
  authenticate, 
  authorize('ADMIN'),
  productController.getInactiveProducts
);

export default router;