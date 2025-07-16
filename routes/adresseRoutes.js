import express from 'express';
import {
  createAdresse,
  getAllAdresses,
  getAdresseById,
  updateAdresse,
  deleteAdresse
} from '../controllers/adresseController.js';

const router = express.Router();

router.post('/', createAdresse);
router.get('/', getAllAdresses);
router.get('/:id', getAdresseById);
router.put('/:id', updateAdresse);
router.delete('/:id', deleteAdresse);

export default router; 