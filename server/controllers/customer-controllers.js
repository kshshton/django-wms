import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCustomers = async (req, res) => {
  try {
    const result = await prisma.customer.findMany();
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await prisma.customer.findFirstOrThrow({
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

export const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await prisma.customer.delete({
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

export const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, email, phone } = req.body;
    const result = await prisma.customer.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        email,
        phone,
      },
    });
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const result = await prisma.customer.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
      },
    });
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};
