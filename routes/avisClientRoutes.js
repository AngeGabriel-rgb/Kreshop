import express from 'express';
import {
  createAvisClient,
  getAllAvisClients,
  getAvisClientById,
  updateAvisClient,
  deleteAvisClient
} from '../controllers/avisClientController.js';

const router = express.Router();

router.post('/', createAvisClient);
router.get('/', getAllAvisClients);
router.get('/:id', getAvisClientById);
router.put('/:id', updateAvisClient);
router.delete('/:id', deleteAvisClient);

export default router; 