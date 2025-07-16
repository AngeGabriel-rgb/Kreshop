import express from 'express';
import orderController from '../controllers/orderController.js';
import middleware from '../Middleware/middleware.js';

const router = express.Router();

// Routes pour les utilisateurs authentifiés
router.get('/', middleware.authenticate, orderController.getUserOrders);
router.get('/:id', middleware.authenticate, orderController.getOrderById);
router.post('/', middleware.authenticate, orderController.createOrder);
router.put('/:id/cancel', middleware.authenticate, orderController.cancelOrder);

// Routes pour les administrateurs
router.put('/:id/status', middleware.authenticate, middleware.adminMiddleware, orderController.updateOrderStatus);

export default router;

