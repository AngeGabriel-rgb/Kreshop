import express from "express"
import productController from "../controllers/productController.js"
import { authenticate, adminMiddleware } from "../Middleware/middleware.js"

const router = express.Router()

// Routes publiques
router.get("/", productController.getAllProducts)
router.get("/:id", productController.getProductById)
router.get("/slug/:slug", productController.getProductBySlug) 

// Routes administratives (nécessitent authentification et rôle admin)
router.post("/", authenticate, adminMiddleware, productController.createProduct)
router.put("/:id", authenticate, adminMiddleware, productController.updateProduct)
router.delete("/:id", authenticate, adminMiddleware, productController.deleteProduct)

// Routes de gestion du stock (Admin)
router.put("/:id/stock", authenticate, adminMiddleware, productController.updateProductStock)
router.put("/variants/:variantId/stock", authenticate, adminMiddleware, productController.updateVariantStock)
router.get("/admin/out-of-stock", authenticate, adminMiddleware, productController.getOutOfStockProducts)
router.get("/admin/low-stock", authenticate, adminMiddleware, productController.getLowStockProducts)
router.get("/admin/inactive", authenticate, adminMiddleware, productController.getInactiveProducts)

export default router
