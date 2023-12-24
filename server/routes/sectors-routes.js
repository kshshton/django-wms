import express from "express";
import * as sectorControllers from "../controllers/sectors-controllers.js";
import * as authMiddlewares from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/", authMiddlewares.authToken, sectorControllers.getSectors);

router.get("/:id", authMiddlewares.authToken, sectorControllers.getSector);

router.delete(
  "/:id",
  authMiddlewares.authToken,
  sectorControllers.deleteSector
);

router.put("/:id", authMiddlewares.authToken, sectorControllers.updateSector);

router.post("/", authMiddlewares.authToken, sectorControllers.addSector);

export default router;
