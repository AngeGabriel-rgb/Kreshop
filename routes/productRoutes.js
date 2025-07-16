import express from 'express';
import productController from '../controllers/productController.js';
import { authenticate, adminMiddleware } from '../Middleware/middleware.js';

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', authenticate, adminMiddleware, productController.createProduct);
router.put('/:id', authenticate, adminMiddleware, productController.updateProduct);
router.delete('/:id', authenticate, adminMiddleware, productController.deleteProduct);

export default router;