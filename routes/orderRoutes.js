// routes/orderRoutes.js
import express from 'express';
import * as orderController from '../controllers/orderController.js';
import { authenticate, clientMiddleware, adminMiddleware } from '../Middleware/middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Commande
 *   description: Gestion des commandes
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Récupérer toutes les commandes (admin)
 *     tags: [Commande]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des commandes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Commande'
 */
router.get('/', authenticate, adminMiddleware, orderController.getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Récupérer une commande par ID (client ou admin)
 *     tags: [Commande]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la commande
 *     responses:
 *       200:
 *         description: Commande trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commande'
 *       404:
 *         description: Commande non trouvée
 */
router.get('/:id', authenticate, orderController.getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Créer une commande (client)
 *     tags: [Commande]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Commande'
 *     responses:
 *       201:
 *         description: Commande créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commande'
 *       400:
 *         description: Erreur de validation
 */
router.post('/', authenticate, clientMiddleware, orderController.createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Mettre à jour une commande (admin)
 *     tags: [Commande]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la commande
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Commande'
 *     responses:
 *       200:
 *         description: Commande mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commande'
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Commande non trouvée
 */
router.put('/:id', authenticate, adminMiddleware, orderController.updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Supprimer une commande (admin)
 *     tags: [Commande]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la commande
 *     responses:
 *       200:
 *         description: Commande supprimée
 *       404:
 *         description: Commande non trouvée
 */
router.delete('/:id', authenticate, adminMiddleware, orderController.deleteOrder);

export default router;

