import express from 'express';
import orderController from '../controllers/orderController.js';
import { authenticate, clientMiddleware, adminMiddleware } from '../Middleware/middleware.js';

const router = express.Router();

router.get('/', authenticate, adminMiddleware, orderController.getAllOrders);
router.get('/:id', authenticate, orderController.getOrderById);
router.post('/', authenticate, clientMiddleware, orderController.createOrder);
router.put('/:id', authenticate, adminMiddleware, orderController.updateOrder);
router.delete('/:id', authenticate, adminMiddleware, orderController.deleteOrder);

export default router; 