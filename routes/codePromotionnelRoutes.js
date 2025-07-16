// routes/codePromotionnelRoutes.js
import express from 'express';
import {
  createCodePromotionnel,
  getAllCodesPromotionnels,
  getCodePromotionnelById,
  updateCodePromotionnel,
  deleteCodePromotionnel
} from '../controllers/codePromotionnelController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: CodePromotionnel
 *   description: Gestion des codes promotionnels
 */

/**
 * @swagger
 * /codes:
 *   post:
 *     summary: Créer un code promotionnel
 *     tags: [CodePromotionnel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CodePromotionnel'
 *     responses:
 *       201:
 *         description: Code promotionnel créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CodePromotionnel'
 *       400:
 *         description: Erreur de validation
 */
router.post('/', createCodePromotionnel);

/**
 * @swagger
 * /codes:
 *   get:
 *     summary: Récupérer tous les codes promotionnels
 *     tags: [CodePromotionnel]
 *     responses:
 *       200:
 *         description: Liste des codes promotionnels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CodePromotionnel'
 */
router.get('/', getAllCodesPromotionnels);

/**
 * @swagger
 * /codes/{id}:
 *   get:
 *     summary: Récupérer un code promotionnel par ID
 *     tags: [CodePromotionnel]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du code promotionnel
 *     responses:
 *       200:
 *         description: Code promotionnel trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CodePromotionnel'
 *       404:
 *         description: Code promotionnel non trouvé
 */
router.get('/:id', getCodePromotionnelById);

/**
 * @swagger
 * /codes/{id}:
 *   put:
 *     summary: Mettre à jour un code promotionnel
 *     tags: [CodePromotionnel]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du code promotionnel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CodePromotionnel'
 *     responses:
 *       200:
 *         description: Code promotionnel mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CodePromotionnel'
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Code promotionnel non trouvé
 */
router.put('/:id', updateCodePromotionnel);

/**
 * @swagger
 * /codes/{id}:
 *   delete:
 *     summary: Supprimer un code promotionnel
 *     tags: [CodePromotionnel]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du code promotionnel
 *     responses:
 *       200:
 *         description: Code promotionnel supprimé
 *       404:
 *         description: Code promotionnel non trouvé
 */
router.delete('/:id', deleteCodePromotionnel);

export default router; 