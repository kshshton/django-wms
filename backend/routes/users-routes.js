import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (_err) {
        res.status(500).json({error: _err.message});
    }
})


export default router;
