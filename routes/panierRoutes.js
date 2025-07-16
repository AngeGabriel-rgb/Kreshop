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

router.use(authenticate, clientMiddleware);

router.post('/', createPanier);
router.get('/', getAllPaniers);
router.get('/:id', getPanierById);
router.put('/:id', updatePanier);
router.delete('/:id', deletePanier);

export default router; 