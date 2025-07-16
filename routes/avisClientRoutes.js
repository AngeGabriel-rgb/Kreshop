// routes/avisClientRoutes.js
import express from 'express';
import {
  createAvisClient,
  getAllAvisClients,
  getAvisClientById,
  updateAvisClient,
  deleteAvisClient
} from '../controllers/avisClientController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AvisClient
 *   description: Gestion des avis clients
 */

/**
 * @swagger
 * /avis:
 *   post:
 *     summary: Ajouter un avis client
 *     tags: [AvisClient]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AvisClient'
 *     responses:
 *       201:
 *         description: Avis ajouté
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AvisClient'
 *       400:
 *         description: Erreur de validation
 */
router.post('/', createAvisClient);

/**
 * @swagger
 * /avis:
 *   get:
 *     summary: Récupérer tous les avis clients
 *     tags: [AvisClient]
 *     responses:
 *       200:
 *         description: Liste des avis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AvisClient'
 */
router.get('/', getAllAvisClients);

/**
 * @swagger
 * /avis/{id}:
 *   get:
 *     summary: Récupérer un avis client par ID
 *     tags: [AvisClient]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'avis
 *     responses:
 *       200:
 *         description: Avis trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AvisClient'
 *       404:
 *         description: Avis non trouvé
 */
router.get('/:id', getAvisClientById);

/**
 * @swagger
 * /avis/{id}:
 *   put:
 *     summary: Mettre à jour un avis client
 *     tags: [AvisClient]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'avis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AvisClient'
 *     responses:
 *       200:
 *         description: Avis mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AvisClient'
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Avis non trouvé
 */
router.put('/:id', updateAvisClient);

/**
 * @swagger
 * /avis/{id}:
 *   delete:
 *     summary: Supprimer un avis client
 *     tags: [AvisClient]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'avis
 *     responses:
 *       200:
 *         description: Avis supprimé
 *       404:
 *         description: Avis non trouvé
 */
router.delete('/:id', deleteAvisClient);

export default router; 