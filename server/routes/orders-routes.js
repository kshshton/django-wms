import express from "express";
import * as orderControllers from "../controllers/orders-controllers.js";
import * as authMiddlewares from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/", authMiddlewares.authToken, orderControllers.getOrders);

router.get("/:id", orderControllers.getOrder);

router.get("/:id/cart", orderControllers.getCart);

router.get("/:id/address", orderControllers.getAddress);

router.get("/:id/customer", orderControllers.getCustomer);

router.delete("/:id", orderControllers.deleteOrder);

router.put("/:id", authMiddlewares.authToken, orderControllers.updateOrder);

router.post("/", orderControllers.addOrder);

export default router;
