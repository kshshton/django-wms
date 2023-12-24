import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAddresses = async (req, res) => {
  try {
    const result = await prisma.address.findMany();
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};

export const getAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await prisma.address.findMany({
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

export const deleteAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await prisma.address.delete({
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

export const updateAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      city,
      state,
      streetName,
      buildingNumber,
      apartmentNumber,
      customerEmail,
    } = req.body;
    const result = await prisma.address.update({
      where: { id: id },
      data: {
        city,
        state,
        streetName,
        buildingNumber,
        apartmentNumber,
        customerEmail,
      },
    });
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};

export const addAddress = async (req, res) => {
  try {
    const {
      id,
      city,
      state,
      streetName,
      buildingNumber,
      apartmentNumber,
      customerEmail,
    } = req.body;
    const result = await prisma.address.create({
      data: {
        id,
        city,
        state,
        streetName,
        buildingNumber,
        apartmentNumber,
        customerEmail,
      },
    });
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};
