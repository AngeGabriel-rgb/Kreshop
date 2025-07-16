import express from 'express';
import {
  createVarianteProduit,
  getAllVariantesProduit,
  getVarianteProduitById,
  updateVarianteProduit,
  deleteVarianteProduit
} from '../controllers/varianteProduitController.js';

const router = express.Router();

router.post('/', createVarianteProduit);
router.get('/', getAllVariantesProduit);
router.get('/:id', getVarianteProduitById);
router.put('/:id', updateVarianteProduit);
router.delete('/:id', deleteVarianteProduit);

export default router; 