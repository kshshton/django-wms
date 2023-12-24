import express from "express";
import * as productController from "../controllers/products-controllers.js";
import * as authMiddlewares from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/", productController.getProducts);

router.get("/:id", productController.getProduct);

router.delete("/:id", productController.deleteProduct);

router.put("/:id", productController.updateProduct);

router.post("/", authMiddlewares.authToken, productController.addProduct);

router.post("/order", productController.sendOrder);

export default router;
