import express from 'express';
import {
  createImageProduit,
  getAllImagesProduit,
  getImageProduitById,
  updateImageProduit,
  deleteImageProduit
} from '../controllers/imageProduitController.js';

const router = express.Router();

router.post('/', createImageProduit);
router.get('/', getAllImagesProduit);
router.get('/:id', getImageProduitById);
router.put('/:id', updateImageProduit);
router.delete('/:id', deleteImageProduit);

export default router; 