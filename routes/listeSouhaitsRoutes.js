// routes/listeSouhaitsRoutes.js
import express from 'express';
import {
  createListeSouhaits,
  getAllListesSouhaits,
  getListeSouhaitsById,
  updateListeSouhaits,
  deleteListeSouhaits
} from '../controllers/listeSouhaitsController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ListeSouhaits
 *   description: Gestion des listes de souhaits
 */

/**
 * @swagger
 * /souhaits:
 *   post:
 *     summary: Ajouter un produit à la liste de souhaits
 *     tags: [ListeSouhaits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ListeSouhaits'
 *     responses:
 *       201:
 *         description: Produit ajouté à la liste de souhaits
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListeSouhaits'
 *       400:
 *         description: Erreur de validation
 */
router.post('/', createListeSouhaits);

/**
 * @swagger
 * /souhaits:
 *   get:
 *     summary: Récupérer toutes les listes de souhaits
 *     tags: [ListeSouhaits]
 *     responses:
 *       200:
 *         description: Liste des souhaits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ListeSouhaits'
 */
router.get('/', getAllListesSouhaits);

/**
 * @swagger
 * /souhaits/{id}:
 *   get:
 *     summary: Récupérer une entrée de la liste de souhaits par ID
 *     tags: [ListeSouhaits]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la liste de souhaits
 *     responses:
 *       200:
 *         description: Souhait trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListeSouhaits'
 *       404:
 *         description: Souhait non trouvé
 */
router.get('/:id', getListeSouhaitsById);

/**
 * @swagger
 * /souhaits/{id}:
 *   put:
 *     summary: Mettre à jour une entrée de la liste de souhaits
 *     tags: [ListeSouhaits]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la liste de souhaits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ListeSouhaits'
 *     responses:
 *       200:
 *         description: Souhait mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListeSouhaits'
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Souhait non trouvé
 */
router.put('/:id', updateListeSouhaits);

/**
 * @swagger
 * /souhaits/{id}:
 *   delete:
 *     summary: Supprimer une entrée de la liste de souhaits
 *     tags: [ListeSouhaits]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la liste de souhaits
 *     responses:
 *       200:
 *         description: Souhait supprimé
 *       404:
 *         description: Souhait non trouvé
 */
router.delete('/:id', deleteListeSouhaits);

export default router; 