import express from 'express';
import categorieController from '../controllers/categorieController.js';
import * as middleware from '../Middleware/middleware.js';

const router = express.Router();

router.get('/', categorieController.getCategories);
router.get('/:id', categorieController.getCategorieById);
router.post('/', middleware.authenticate, middleware.adminMiddleware, categorieController.createCategorie);
router.put('/:id', middleware.authenticate, middleware.adminMiddleware, categorieController.updateCategorie);
router.delete('/:id', middleware.authenticate, middleware.adminMiddleware, categorieController.deleteCategorie);

export default router; 