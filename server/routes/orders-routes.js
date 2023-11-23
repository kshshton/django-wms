import express from 'express';
import {PrismaClient} from '@prisma/client'
import {authToken} from "../middlewares/auth.middlewares.js";

const prisma = new PrismaClient()
const router = express.Router();

router.get('/', authToken, async (req, res) => {
    try {
        const getOrders = await prisma.order.findMany();
        res.json(getOrders);
    } catch (_err) {
        res.status(500).json({
            error: _err.message
        });
    }
})


router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const getOrder = await prisma.order.findUniqueOrThrow({
            where: {
                id
            }
        });
        res.json(getOrder);
    } catch (_err) {
        res.status(500).json({
            error: _err.message
        });
    }
})


router.get('/:id/cart', async (req, res) => {
    try {
        const orderId = req.params.id;
        const getCart = await prisma.product.findMany({
            where: {
                orderId
            }
        });
        res.json(getCart);
    } catch (_err) {
        res.status(500).json({
            error: _err.message
        });
    }
})


router.get('/:id/address', async (req, res) => {
    try {
        const id = req.params.id;
        const getOrder = await prisma.order.findUniqueOrThrow({
            where: {
                id
            }
        });
        const getAddress = await prisma.address.findUniqueOrThrow({
            where: {
                id: getOrder.addressId
            }
        })
        res.json(getAddress);
    } catch (_err) {
        res.status(500).json({
            error: _err.message
        });
    }
})


router.get('/:id/customer', async (req, res) => {
    try {
        const id = req.params.id;
        const getOrder = await prisma.order.findUniqueOrThrow({
            where: {
                id
            }
        });
        const getAddress = await prisma.address.findUniqueOrThrow({
            where: {
                id: getOrder.addressId
            }
        })
        const getCustomer = await prisma.customer.findUniqueOrThrow({
            where: {
                email: getAddress.customerEmail
            }
        })
        res.json(getCustomer);
    } catch (_err) {
        res.status(500).json({
            error: _err.message
        });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteOrder = await prisma.order.delete({
            where: {
                id
            }
        });
        res.json(deleteOrder);
    } catch (_err) {
        res.status(500).json({
            error: _err.message
        });
    }
})


router.put('/:id', authToken, async (req, res) => {
    try {
        const id = req.params.id;
        const {complete, userId} = req.body;
        const updateOrder = await prisma.order.update({
            where: {
                id
            },
            data: {
                complete,
                userId
            }
        });
        res.json(updateOrder);
    } catch (_err) {
        res.status(500).json({
            error: _err.message
        });
    }
})


router.post('/', async (req, res) => {
    try {
        const {id, addressId} = req.body;
        const addOrder = await prisma.order.create({
            data: {
                complete: false,
                id,
                addressId
            }
        });
        res.json(addOrder);
    } catch (_err) {
        res.status(500).json({
            error: _err.message
        });
    }
})


export default router;
