// routes/imageProduitRoutes.js
import express from 'express';
import {
  createImageProduit,
  getAllImagesProduit,
  getImageProduitById,
  updateImageProduit,
  deleteImageProduit
} from '../controllers/imageProduitController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ImageProduit
 *   description: Gestion des images de produits
 */

/**
 * @swagger
 * /images:
 *   post:
 *     summary: Ajouter une image de produit
 *     tags: [ImageProduit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ImageProduit'
 *     responses:
 *       201:
 *         description: Image ajoutée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageProduit'
 *       400:
 *         description: Erreur de validation
 */
router.post('/', createImageProduit);

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Récupérer toutes les images de produits
 *     tags: [ImageProduit]
 *     responses:
 *       200:
 *         description: Liste des images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ImageProduit'
 */
router.get('/', getAllImagesProduit);

/**
 * @swagger
 * /images/{id}:
 *   get:
 *     summary: Récupérer une image de produit par ID
 *     tags: [ImageProduit]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'image
 *     responses:
 *       200:
 *         description: Image trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageProduit'
 *       404:
 *         description: Image non trouvée
 */
router.get('/:id', getImageProduitById);

/**
 * @swagger
 * /images/{id}:
 *   put:
 *     summary: Mettre à jour une image de produit
 *     tags: [ImageProduit]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ImageProduit'
 *     responses:
 *       200:
 *         description: Image mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageProduit'
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Image non trouvée
 */
router.put('/:id', updateImageProduit);

/**
 * @swagger
 * /images/{id}:
 *   delete:
 *     summary: Supprimer une image de produit
 *     tags: [ImageProduit]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'image
 *     responses:
 *       200:
 *         description: Image supprimée
 *       404:
 *         description: Image non trouvée
 */
router.delete('/:id', deleteImageProduit);

export default router; 