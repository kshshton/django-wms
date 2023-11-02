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


router.get('/:id', authToken, async (req, res) => {
    try {
        const id = req.params.id;
        const getOrder = await prisma.order.findMany({
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


router.delete('/:id', authToken, async (req, res) => {
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
        const {customerId, addressId} = req.body;
        const updateOrder = await prisma.order.update({
            where: {
                id
            },
            data: {
                complete: false,
                customerId: customerId,
                addressId: addressId
            }
        });
        res.json(updateOrder);
    } catch (_err) {
        res.status(500).json({
            error: _err.message
        });
    }
})


router.post('/', authToken, async (req, res) => {
    try {
        const {customerId, addressId} = req.body;
        const addOrder = await prisma.order.create({
            data: {
                complete: false,
                customerId,
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
