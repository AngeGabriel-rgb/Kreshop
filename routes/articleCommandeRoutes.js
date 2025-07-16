import express from 'express';
import {
  createArticleCommande,
  getAllArticlesCommande,
  getArticleCommandeById,
  updateArticleCommande,
  deleteArticleCommande
} from '../controllers/articleCommandeController.js';

const router = express.Router();

router.post('/', createArticleCommande);
router.get('/', getAllArticlesCommande);
router.get('/:id', getArticleCommandeById);
router.put('/:id', updateArticleCommande);
router.delete('/:id', deleteArticleCommande);

export default router; 