import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { jwtTokens } from "../utils/jwtTokens.js";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: email },
    });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password!");
    }

    let tokens = jwtTokens(user);
    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
    res.json({ tokens, userId: user.id });
  } catch (_err) {
    res.status(401).json({
      message: _err.message,
    });
  }
});

router.post("/refresh_token", (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken === null) {
      return res.status(401).json({
        message: "null refresh token",
      });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: err.message,
        });
      }
      let tokens = jwtTokens(user);
      res.cookie("refresh_token", tokens.refreshToken, {
        httpOnly: true,
      });
      res.json(tokens);
    });
  } catch (_err) {
    res.status(401).json({
      message: _err.message,
    });
  }
});

router.delete("/refresh_token", (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      message: "refresh token deleted",
    });
  } catch (_err) {
    res.status(401).json({
      message: _err.message,
    });
  }
});

export default router;
