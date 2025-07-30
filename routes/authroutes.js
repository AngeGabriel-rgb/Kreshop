import express from 'express';
import * as authController from '../controllers/authcontrolleur.js';

const router = express.Router();

// Routes de connexion
router.post('/login/client', authController.loginClient); // Route spécifique client
router.post('/login/admin', authController.loginAdmin); // Route spécifique admin

// Routes d'inscription
router.post('/register/client', authController.registerClient);
router.post('/register/admin', authController.registerAdmin);

export default router;