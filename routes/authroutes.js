import express from 'express';
import {
  registerClient,
  registerAdmin,
  login,
  getProfile,
} from '../controllers/authcontrolleur.js';
import { authenticate, authorize } from '../Middleware/middleware.js';

const router = express.Router();

// Inscription client (public)
router.post('/register/client', registerClient);

// Inscription admin (protégé - admin seulement)
router.post('/register/admin', authenticate, authorize(['admin']), registerAdmin);

// Connexion (public)
router.post('/login', login);

// Profil utilisateur (protégé)
router.get('/profile', authenticate, getProfile);

export default router;