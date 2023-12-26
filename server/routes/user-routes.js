import express from "express";
import * as userControllers from "../controllers/user-controllers.js";
import * as authMiddlewares from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/", authMiddlewares.authToken, userControllers.getUsers);

router.get("/:id", authMiddlewares.authToken, userControllers.getUser);

router.get(
  "/:id/orders",
  authMiddlewares.authToken,
  userControllers.getUserOrders
);

router.delete("/:id", authMiddlewares.authToken, userControllers.deleteUser);

router.post("/", userControllers.createUser);

export default router;
