import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const result = await prisma.user.findMany();
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await prisma.user.findMany({
      where: {
        id,
      },
    });
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await prisma.order.findMany({
      where: {
        userId: id,
      },
    });
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await prisma.user.delete({
      where: {
        id,
      },
    });
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        hashedPassword,
        email,
      },
    });
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await prisma.user.create({
      data: {
        firstName,
        lastName,
        password: hashedPassword,
        email,
      },
    });
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};
