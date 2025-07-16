import express from 'express';
import {
  createCodePromotionnel,
  getAllCodesPromotionnels,
  getCodePromotionnelById,
  updateCodePromotionnel,
  deleteCodePromotionnel
} from '../controllers/codePromotionnelController.js';

const router = express.Router();

router.post('/', createCodePromotionnel);
router.get('/', getAllCodesPromotionnels);
router.get('/:id', getCodePromotionnelById);
router.put('/:id', updateCodePromotionnel);
router.delete('/:id', deleteCodePromotionnel);

export default router; 