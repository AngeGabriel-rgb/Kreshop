import express from 'express';
import {
  createListeSouhaits,
  getAllListesSouhaits,
  getListeSouhaitsById,
  updateListeSouhaits,
  deleteListeSouhaits
} from '../controllers/listeSouhaitsController.js';

const router = express.Router();

router.post('/', createListeSouhaits);
router.get('/', getAllListesSouhaits);
router.get('/:id', getListeSouhaitsById);
router.put('/:id', updateListeSouhaits);
router.delete('/:id', deleteListeSouhaits);

export default router; 