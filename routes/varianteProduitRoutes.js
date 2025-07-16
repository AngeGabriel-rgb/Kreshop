// routes/varianteProduitRoutes.js
import express from 'express';
import {
  createVarianteProduit,
  getAllVariantesProduit,
  getVarianteProduitById,
  updateVarianteProduit,
  deleteVarianteProduit
} from '../controllers/varianteProduitController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: VarianteProduit
 *   description: Gestion des variantes de produits
 */

/**
 * @swagger
 * /variantes:
 *   post:
 *     summary: Ajouter une variante de produit
 *     tags: [VarianteProduit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VarianteProduit'
 *     responses:
 *       201:
 *         description: Variante ajoutée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VarianteProduit'
 *       400:
 *         description: Erreur de validation
 */
router.post('/', createVarianteProduit);

/**
 * @swagger
 * /variantes:
 *   get:
 *     summary: Récupérer toutes les variantes de produits
 *     tags: [VarianteProduit]
 *     responses:
 *       200:
 *         description: Liste des variantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VarianteProduit'
 */
router.get('/', getAllVariantesProduit);

/**
 * @swagger
 * /variantes/{id}:
 *   get:
 *     summary: Récupérer une variante de produit par ID
 *     tags: [VarianteProduit]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la variante
 *     responses:
 *       200:
 *         description: Variante trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VarianteProduit'
 *       404:
 *         description: Variante non trouvée
 */
router.get('/:id', getVarianteProduitById);

/**
 * @swagger
 * /variantes/{id}:
 *   put:
 *     summary: Mettre à jour une variante de produit
 *     tags: [VarianteProduit]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la variante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VarianteProduit'
 *     responses:
 *       200:
 *         description: Variante mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VarianteProduit'
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Variante non trouvée
 */
router.put('/:id', updateVarianteProduit);

/**
 * @swagger
 * /variantes/{id}:
 *   delete:
 *     summary: Supprimer une variante de produit
 *     tags: [VarianteProduit]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la variante
 *     responses:
 *       200:
 *         description: Variante supprimée
 *       404:
 *         description: Variante non trouvée
 */
router.delete('/:id', deleteVarianteProduit);

export default router; 