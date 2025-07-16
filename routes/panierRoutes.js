// routes/panierRoutes.js
import express from 'express';
import {
  createPanier,
  getAllPaniers,
  getPanierById,
  updatePanier,
  deletePanier
} from '../controllers/panierController.js';
import { authenticate, clientMiddleware } from '../Middleware/middleware.js';

const router = express.Router();

// Toutes les routes nécessitent un client authentifié
router.use(authenticate, clientMiddleware);

/**
 * @swagger
 * tags:
 *   name: Panier
 *   description: Gestion du panier d'achat
 */

/**
 * @swagger
 * /paniers:
 *   post:
 *     summary: Ajouter un produit au panier
 *     tags: [Panier]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Panier'
 *     responses:
 *       201:
 *         description: Produit ajouté au panier
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Panier'
 *       400:
 *         description: Erreur de validation
 */
router.post('/', createPanier);

/**
 * @swagger
 * /paniers:
 *   get:
 *     summary: Récupérer tous les paniers
 *     tags: [Panier]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des paniers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Panier'
 */
router.get('/', getAllPaniers);

/**
 * @swagger
 * /paniers/{id}:
 *   get:
 *     summary: Récupérer un panier par ID
 *     tags: [Panier]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du panier
 *     responses:
 *       200:
 *         description: Panier trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Panier'
 *       404:
 *         description: Panier non trouvé
 */
router.get('/:id', getPanierById);

/**
 * @swagger
 * /paniers/{id}:
 *   put:
 *     summary: Mettre à jour un panier
 *     tags: [Panier]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du panier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Panier'
 *     responses:
 *       200:
 *         description: Panier mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Panier'
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Panier non trouvé
 */
router.put('/:id', updatePanier);

/**
 * @swagger
 * /paniers/{id}:
 *   delete:
 *     summary: Supprimer un panier
 *     tags: [Panier]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du panier
 *     responses:
 *       200:
 *         description: Panier supprimé
 *       404:
 *         description: Panier non trouvé
 */
router.delete('/:id', deletePanier);

export default router; 