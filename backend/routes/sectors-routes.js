import express from 'express';
import {PrismaClient} from '@prisma/client'
import {authToken} from "../middlewares/auth.middlewares.js";

const prisma = new PrismaClient()
const router = express.Router();

router.get('/', authToken, async (req, res) => {
    try {
        const getSectors = await prisma.sector.findMany();
        res.json(getSectors);
    } catch (_err) {
        res.status(500).json({error: _err.message});
    }
})


router.get('/:id', authToken, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const getSector = await prisma.sector.findMany({where: {id: id}});
        res.json(getSector);
    } catch (_err) {
        res.status(500).json({error: _err.message});
    }
})


router.delete('/:id', authToken, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deleteSector = await prisma.sector.delete({where: {id: id}});
        res.json(deleteSector);
    } catch (_err) {
        res.status(500).json({error: _err.message});
    }
})


router.put('/:id', authToken, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const {name} = req.body;
        const updateSector = await prisma.sector.update({
            where: {id: id},
            data: {name: name}
        });
        res.json(updateSector);
    } catch (_err) {
        res.status(500).json({error: _err.message});
    }
})


router.post('/', authToken, async (req, res) => {
    try {
        const {id, name} = req.body;
        const addSector = await prisma.sector.create({
            data: {
                id: id,
                name: name,
            }
        });
        res.json(addSector);
    } catch (_err) {
        res.status(500).json({error: _err.message});
    }
})


export default router;
