import express from "express";
import * as customerControllers from "../controllers/customer-controllers.js";
import * as authMiddlewares from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/", authMiddlewares.authToken, customerControllers.getCustomers);

router.get("/:id", customerControllers.getCustomer);

router.delete("/:id", customerControllers.deleteCustomer);

router.put("/:id", customerControllers.updateCustomer);

router.post("/", customerControllers.createCustomer);

export default router;
