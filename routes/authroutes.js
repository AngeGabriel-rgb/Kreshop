import express from 'express';
import * as authController from '../controllers/authcontrolleur.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register/client', authController.registerClient);
router.post('/register/admin', authController.registerAdmin);

export default router;