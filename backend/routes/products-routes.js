import express from 'express';
import {PrismaClient} from '@prisma/client'
import {authToken} from "../middlewares/auth.middlewares.js";

const prisma = new PrismaClient()
const router = express.Router();

router.get('/', authToken, async (req, res) => {
    try {
        const getProducts = await prisma.product.findMany();
        res.json(getProducts);
    } catch (_err) {
        res.status(500).json({
            error: _err.message
        });
    }
})


router.get('/:id', authToken, async (req, res) => {
    try {
        const id = req.params.id;
        const getProduct = await prisma.product.findMany({
            where: {
                id: id
            }
        });
        res.json(getProduct);
    } catch (_err) {
        res.status(500).json({
            error: _err.message
        });
    }
})


router.delete('/:id', authToken, async (req, res) => {
    try {
        const id = req.params.id;
        const deleteProduct = await prisma.product.delete({
            where: {
                id: id
            }
        });
        res.json(deleteProduct);
    } catch (_err) {
        res.status(500).json({
            error: _err.message
        });
    }
})


router.put('/:id', authToken, async (req, res) => {
    try {
        const id = req.params.id;
        const {name, category, quantity} = req.body;
        const updateProduct = await prisma.product.update({
            where: {
                id: id
            },
            data: {
                name: name,
                category: category,
                quantity: quantity
            }
        });
        res.json(updateProduct);
    } catch (_err) {
        res.status(500).json({
            error: _err.message
        });
    }
})


router.post('/', authToken, async (req, res) => {
    try {
        const {name, category, quantity} = req.body;
        const addProduct = await prisma.product.create({
            data: {
                name: name,
                category: category,
                quantity: quantity
            }
        });
        res.json(addProduct);
    } catch (_err) {
        res.status(500).json({
            error: _err.message
        });
    }
})


export default router;
