import express from 'express';
import {PrismaClient} from '@prisma/client'
import {authToken} from "../middlewares/auth.middlewares.js";

const prisma = new PrismaClient()
const router = express.Router();


router.get('/:id', authToken, async (req, res) => {
    try {
        const id = req.params.id;
        const getCustomer = await prisma.customer.findFirstOrThrow({where: {id: id}});
        res.json(getCustomer);
    } catch (_err) {
        res.status(500).json({error: _err.message});
    }
})


router.delete('/:id', authToken, async (req, res) => {
    try {
        const id = req.params.id;
        const deleteCustomer = await prisma.customer.delete({where: {id: id}});
        res.json(deleteCustomer);
    } catch (_err) {
        res.status(500).json({error: _err.message});
    }
})


router.put('/:id', authToken, async (req, res) => {
    try {
        const id = req.params.id;
        const {firstName, lastName, email, phone} = req.body;
        const updateCustomer = await prisma.customer.update({
            where: {id: id},
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone
            }
        });
        res.json(updateCustomer);
    } catch (_err) {
        res.status(500).json({error: _err.message});
    }
})


router.post('/', authToken, async (req, res) => {
    try {
        const {firstName, lastName, email, phone} = req.body;
        const createCustomer = await prisma.customer.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone
            }
        });
        res.json(createCustomer);
    } catch (_err) {
        res.status(500).json({error: _err.message});
    }
})


export default router;
