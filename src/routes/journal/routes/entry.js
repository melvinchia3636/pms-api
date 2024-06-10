import express from 'express'
import { clientError, success } from '../../../utils/response.js'
import asyncWrapper from '../../../utils/asyncWrapper.js'
import { body, validationResult } from 'express-validator'

const router = express.Router()

router.get(
    '/get/:id',
    asyncWrapper(async (req, res) => {
        const { id } = req.params
        const { pb } = req

        const entry = await pb.collection('journal_entry').getOne(id)

        success(res, entry)
    })
)

router.get(
    '/valid/:id',
    asyncWrapper(async (req, res) => {
        const { id } = req.params
        const { pb } = req

        const { totalItems } = await pb
            .collection('journal_entry')
            .getList(1, 1, {
                filter: `id = "${id}"`
            })

        success(res, totalItems === 1)
    })
)

router.get(
    '/list',
    asyncWrapper(async (req, res) => {
        const { pb } = req

        const entries = await pb.collection('journal_entry').getFullList({
            sort: '-created'
        })

        entries.forEach(entry => {
            entry.content = entry.content.split(/\s/g).slice(0, 80).join(' ')
        })

        success(res, entries)
    })
)

router.post(
    '/create',
    [body('title').notEmpty(), body('content').notEmpty()],
    asyncWrapper(async (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            clientError(res, result.array())
            return
        }

        const { pb } = req
        const { title, content } = req.body

        const entry = await pb.collection('journal_entry').create({
            title,
            content
        })

        success(res, entry)
    })
)

router.patch(
    '/update-title/:id',
    body('title').notEmpty(),
    asyncWrapper(async (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            clientError(res, result.array())
            return
        }

        const { id } = req.params
        const { pb } = req
        const { title } = req.body

        await pb.collection('journal_entry').update(id, {
            title
        })

        success(res, 'Title updated')
    })
)

router.put(
    '/update-content/:id',
    body('content').notEmpty(),
    asyncWrapper(async (req, res) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            clientError(res, result.array())
            return
        }

        const { id } = req.params
        const { pb } = req
        const { content } = req.body

        await pb.collection('journal_entry').update(id, {
            content
        })

        success(res, 'Content updated')
    })
)

router.delete(
    '/delete/:id',
    asyncWrapper(async (req, res) => {
        const { id } = req.params
        const { pb } = req

        await pb.collection('journal_entry').delete(id)

        success(res, 'Entry deleted')
    })
)

export default router
