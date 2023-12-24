import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSectors = async (req, res) => {
  try {
    const result = await prisma.sector.findMany();
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};

export const getSector = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await prisma.sector.findMany({
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

export const deleteSector = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await prisma.sector.delete({
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

export const updateSector = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const result = await prisma.sector.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};

export const addSector = async (req, res) => {
  try {
    const { id, name } = req.body;
    const result = await prisma.sector.create({
      data: {
        id,
        name,
      },
    });
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};
