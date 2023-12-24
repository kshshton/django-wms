import express from "express";
import * as authControllers from "../controllers/auth-controllers.js";

const router = express.Router();

router.post("/login", authControllers.signIn);

router.post("/refresh_token", authControllers.refreshToken);

router.delete("/refresh_token", authControllers.signOut);

export default router;
