import express from 'express';
import {PrismaClient} from '@prisma/client'
import {authToken} from "../middlewares/auth.middlewares.js";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()
const router = express.Router();

router.get('/all', authToken, async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (_err) {
        res.status(500).json({error: _err.message});
    }
})

router.post('/create', async (req, res) => {
    try {
        const {firstName, lastName, password, email} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const createUser = await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                password: hashedPassword,
                email: email
            }
        });
        res.json(createUser);
    } catch (_err) {
        res.status(500).json({error: _err.message});
    }
})


export default router;
