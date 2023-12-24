import express from "express";
import * as addressControllers from "../controllers/address-controllers.js";
import * as authMiddlewares from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/", authMiddlewares.authToken, addressControllers.getAddresses);

router.get("/:id", addressControllers.getAddress);

router.delete("/:id", addressControllers.deleteAddress);

router.put("/:id", addressControllers.updateAddress);

router.post("/", addressControllers.addAddress);

export default router;
