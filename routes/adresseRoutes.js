// routes/adresseRoutes.js
import express from 'express';
import {
  createAdresse,
  getAllAdresses,
  getAdresseById,
  updateAdresse,
  deleteAdresse
} from '../controllers/adresseController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Adresse
 *   description: Gestion des adresses clients
 */

/**
 * @swagger
 * /adresses:
 *   post:
 *     summary: Ajouter une adresse
 *     tags: [Adresse]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Adresse'
 *     responses:
 *       201:
 *         description: Adresse ajoutée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adresse'
 *       400:
 *         description: Erreur de validation
 */
router.post('/', createAdresse);

/**
 * @swagger
 * /adresses:
 *   get:
 *     summary: Récupérer toutes les adresses
 *     tags: [Adresse]
 *     responses:
 *       200:
 *         description: Liste des adresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Adresse'
 */
router.get('/', getAllAdresses);

/**
 * @swagger
 * /adresses/{id}:
 *   get:
 *     summary: Récupérer une adresse par ID
 *     tags: [Adresse]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'adresse
 *     responses:
 *       200:
 *         description: Adresse trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adresse'
 *       404:
 *         description: Adresse non trouvée
 */
router.get('/:id', getAdresseById);

/**
 * @swagger
 * /adresses/{id}:
 *   put:
 *     summary: Mettre à jour une adresse
 *     tags: [Adresse]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'adresse
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Adresse'
 *     responses:
 *       200:
 *         description: Adresse mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adresse'
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Adresse non trouvée
 */
router.put('/:id', updateAdresse);

/**
 * @swagger
 * /adresses/{id}:
 *   delete:
 *     summary: Supprimer une adresse
 *     tags: [Adresse]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'adresse
 *     responses:
 *       200:
 *         description: Adresse supprimée
 *       404:
 *         description: Adresse non trouvée
 */
router.delete('/:id', deleteAdresse);

export default router; 