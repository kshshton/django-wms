import express from 'express';
import {PrismaClient} from '@prisma/client'
import bcrypt from "bcrypt";
import {authToken} from "../middlewares/auth.middlewares.js";

const prisma = new PrismaClient()
const router = express.Router();

router.get('/', authToken, async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (_err) {
        res.status(500).json({error: _err.message});
    }
})

router.post('/', async (req, res) => {
    try {
        const {name, password, email} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const createUser = await prisma.user.create({
            data: {
                name: name,
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
