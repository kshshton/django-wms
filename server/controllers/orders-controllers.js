import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getOrders = async (req, res) => {
  try {
    const result = await prisma.order.findMany();
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await prisma.order.findUniqueOrThrow({
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

export const getCart = async (req, res) => {
  try {
    const orderId = req.params.id;
    const result = await prisma.product.findMany({
      where: {
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

export const getAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const getOrder = await prisma.order.findUniqueOrThrow({
      where: {
        id,
      },
    });
    const result = await prisma.address.findUniqueOrThrow({
      where: {
        id: getOrder.addressId,
      },
    });
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
    const getOrder = await prisma.order.findUniqueOrThrow({
      where: {
        id,
      },
    });
    const getAddress = await prisma.address.findUniqueOrThrow({
      where: {
        id: getOrder.addressId,
      },
    });
    const result = await prisma.customer.findUniqueOrThrow({
      where: {
        email: getAddress.customerEmail,
      },
    });
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await prisma.order.delete({
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

export const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const { complete, userId } = req.body;
    const result = await prisma.order.update({
      where: {
        id,
      },
      data: {
        complete,
        userId,
      },
    });
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};

export const addOrder = async (req, res) => {
  try {
    const { id, addressId } = req.body;
    const result = await prisma.order.create({
      data: {
        complete: false,
        id,
        addressId,
      },
    });
    res.json(result);
  } catch (_err) {
    res.status(500).json({
      error: _err.message,
    });
  }
};
