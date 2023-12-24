import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  try {
    const result = await prisma.product.findMany({
      where: {
        orderId: null,
      },
    });
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await prisma.product.findMany({
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

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await prisma.product.delete({
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

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, category, quantity, sectorName } = req.body;
    const result = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        category,
        quantity,
        sectorName,
      },
    });
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await prisma.product.create({
      data: {
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

export const sendOrder = async (req, res) => {
  try {
    const { id, name, category, sectorName, quantity, orderId } = req.body;
    const result = await prisma.product.create({
      data: {
        id,
        name,
        category,
        sectorName,
        quantity,
        orderId,
      },
    });
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};
