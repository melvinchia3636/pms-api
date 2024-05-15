/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import express from 'express';
import asyncWrapper from '../../../utils/asyncWrapper.js';
import { clientError, success } from '../../../utils/response.js';

const router = express.Router();

router.get('/list', asyncWrapper(async (req, res) => {
    const { pb } = req;

    const tags = await pb.collection('photos_album_tag').getFullList();

    for (const tag of tags) {
        const { totalItems } = await pb.collection('photos_album').getList(1, 1, {
            filter: `tags ~ "${tag.id}"`,
        });

        tag.count = totalItems;
    }

    success(res, tags);
}));

router.patch('/update-album/:albumId', asyncWrapper(async (req, res) => {
    const { pb } = req;
    const { albumId } = req.params;
    const { tags } = req.body;

    if (!albumId) {
        clientError(res, 'Album ID is required');
        return;
    }

    if (!tags) {
        clientError(res, 'Tags are required');
        return;
    }

    await pb.collection('photos_album').update(albumId, {
        tags,
    });

    success(res);
}));

export default router;
