import express from 'express';
import categorieController from '../controllers/categorieController.js';
import middleware from '../Middleware/middleware.js';

const router = express.Router();

// CRUD catégories
router.post('/', middleware.authenticate, middleware.adminMiddleware, categorieController.createCategorie);
router.get('/', middleware.authenticate, categorieController.getCategories);
router.get('/:id', middleware.authenticate, categorieController.getCategorieById);
router.put('/:id', middleware.authenticate, middleware.adminMiddleware, categorieController.updateCategorie);
router.delete('/:id', middleware.authenticate, middleware.adminMiddleware, categorieController.deleteCategorie);

export default router; 