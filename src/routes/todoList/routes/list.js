import express from 'express'
import { success } from '../../../utils/response.js'
import asyncWrapper from '../../../utils/asyncWrapper.js'
import { body } from 'express-validator'
import hasError from '../../../utils/checkError.js'

const router = express.Router()

router.get(
    '/list',
    asyncWrapper(async (req, res) => {
        const { pb } = req
        const categories = await pb.collection('todo_list').getFullList()
        success(res, categories)
    })
)

router.post(
    '/create',
    [
        body('name').exists().notEmpty(),
        body('icon').exists().notEmpty(),
        body('color').exists().isHexColor()
    ],
    asyncWrapper(async (req, res) => {
        if (hasError(req, res)) return

        const { pb } = req
        const { name, icon, color } = req.body

        const category = await pb.collection('todo_list').create({
            name,
            icon,
            color
        })
        success(res, category)
    })
)

router.patch(
    '/update/:id',
    [
        body('name').exists().notEmpty(),
        body('icon').exists().notEmpty(),
        body('color').exists().isHexColor()
    ],
    asyncWrapper(async (req, res) => {
        if (hasError(req, res)) return

        const { pb } = req
        const { id } = req.params
        const { name, icon, color } = req.body

        const category = await pb.collection('todo_list').update(id, {
            name,
            icon,
            color
        })

        success(res, category)
    })
)

router.delete(
    '/delete/:id',
    asyncWrapper(async (req, res) => {
        const { pb } = req
        const { id } = req.params

        await pb.collection('todo_list').delete(id)
        success(res)
    })
)

export default router
