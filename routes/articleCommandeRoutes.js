// routes/articleCommandeRoutes.js
import express from 'express';
import {
  createArticleCommande,
  getAllArticlesCommande,
  getArticleCommandeById,
  updateArticleCommande,
  deleteArticleCommande
} from '../controllers/articleCommandeController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ArticleCommande
 *   description: Gestion des articles de commande
 */

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Ajouter un article à une commande
 *     tags: [ArticleCommande]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleCommande'
 *     responses:
 *       201:
 *         description: Article ajouté
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleCommande'
 *       400:
 *         description: Erreur de validation
 */
router.post('/', createArticleCommande);

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Récupérer tous les articles de commande
 *     tags: [ArticleCommande]
 *     responses:
 *       200:
 *         description: Liste des articles de commande
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ArticleCommande'
 */
router.get('/', getAllArticlesCommande);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Récupérer un article de commande par ID
 *     tags: [ArticleCommande]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'article de commande
 *     responses:
 *       200:
 *         description: Article trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleCommande'
 *       404:
 *         description: Article non trouvé
 */
router.get('/:id', getArticleCommandeById);

/**
 * @swagger
 * /articles/{id}:
 *   put:
 *     summary: Mettre à jour un article de commande
 *     tags: [ArticleCommande]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'article de commande
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleCommande'
 *     responses:
 *       200:
 *         description: Article mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleCommande'
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Article non trouvé
 */
router.put('/:id', updateArticleCommande);

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Supprimer un article de commande
 *     tags: [ArticleCommande]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'article de commande
 *     responses:
 *       200:
 *         description: Article supprimé
 *       404:
 *         description: Article non trouvé
 */
router.delete('/:id', deleteArticleCommande);

export default router; 