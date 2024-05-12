import express from 'express';
import { success } from '../../../utils/response.js';
import asyncWrapper from '../../../utils/asyncWrapper.js';

const router = express.Router();

router.get('/list', asyncWrapper(async (req, res) => {
    const { pb } = req;
    const categories = await pb.collection('todo_list').getFullList();
    success(res, categories);
}));

router.post('/create', asyncWrapper(async (req, res) => {
    const { pb } = req;
    const category = await pb.collection('todo_list').create(req.body);
    success(res, category);
}));

router.patch('/update/:id', asyncWrapper(async (req, res) => {
    const { pb } = req;
    const { id } = req.params;
    const { name, icon, color } = req.body;

    if (!id) {
        res.status(400).json({
            state: 'error',
            message: 'ID is required',
        });
        return;
    }

    const category = await pb.collection('todo_list').update(id, {
        name,
        icon,
        color,
    });

    success(res, category);
}));

router.delete('/delete/:id', asyncWrapper(async (req, res) => {
    const { pb } = req;
    const { id } = req.params;

    if (!id) {
        res.status(400).json({
            state: 'error',
            message: 'ID is required',
        });
        return;
    }

    await pb.collection('todo_list').delete(id);
    success(res);
}));

export default router;
