/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
import express from 'express';
import { success } from '../../../utils/response.js';
import asyncWrapper from '../../../utils/asyncWrapper.js';

const router = express.Router();

router.get('/get/:id', asyncWrapper(async (req, res) => {
    const { pb } = req;
    const { id } = req.params;
    const album = await pb.collection('photos_album').getOne(id, {
        expand: 'cover',
    });

    if (album.expand) {
        const { cover } = album.expand;
        album.cover = `${cover.collectionId}/${cover.id}/${cover.image}`;
        delete album.expand;
    }

    success(res, album);
}));

router.get('/valid/:id', asyncWrapper(async (req, res) => {
    const { pb } = req;
    const { id } = req.params;
    const { totalItems } = await pb.collection('photos_album').getList(1, 1, {
        filter: `id = "${id}"`,
    });

    success(res, totalItems === 1);
}));

router.get('/list', asyncWrapper(async (req, res) => {
    const { pb } = req;

    const albums = await pb.collection('photos_album').getFullList({
        expand: 'cover',
    });

    albums.forEach((album) => {
        if (album.expand) {
            const { cover } = album.expand;
            album.cover = `${cover.collectionId}/${cover.id}/${cover.image}`;
            delete album.expand;
        }
    });

    success(res, albums);
}));

router.post('/create', asyncWrapper(async (req, res) => {
    const { pb } = req;
    const { name } = req.body;
    const album = await pb.collection('photos_album').create({ name });

    success(res, album);
}));

router.patch('/add-photos/:albumId', asyncWrapper(async (req, res) => {
    const { pb } = req;
    const { albumId } = req.params;
    const { photos } = req.body;

    for (const photoId of photos) {
        await pb.collection('photos_entry').update(photoId, { album: albumId });
        const { id } = await pb.collection('photos_entry_dimensions').getFirstListItem(`photo = "${photoId}"`);
        await pb.collection('photos_entry_dimensions').update(id, {
            is_in_album: true,
        });
    }

    const { totalItems } = await pb.collection('photos_entry').getList(1, 1, {
        filter: `album = "${albumId}"`,
    });

    await pb.collection('photos_album').update(albumId, { amount: totalItems });

    success(res);
}));

router.delete('/remove-photo/:albumId', asyncWrapper(async (req, res) => {
    const { pb } = req;
    const { albumId } = req.params;
    const { photos } = req.body;

    const { cover } = await pb.collection('photos_album').getOne(albumId);

    for (const photoId of photos) {
        await pb.collection('photos_entry').update(photoId, { album: '' });
        const { id } = await pb.collection('photos_entry_dimensions').getFirstListItem(`photo = "${photoId}"`);
        await pb.collection('photos_entry_dimensions').update(id, {
            is_in_album: false,
        });

        if (cover === photoId) {
            await pb.collection('photos_album').update(albumId, { cover: '' });
        }
    }

    const { totalItems } = await pb.collection('photos_entry').getList(1, 1, {
        filter: `album = "${albumId}"`,
    });

    await pb.collection('photos_album').update(albumId, { amount: totalItems });

    success(res);
}));

router.delete('/delete/:albumId', asyncWrapper(async (req, res) => {
    const { pb } = req;
    const { albumId } = req.params;

    await pb.collection('photos_album').delete(albumId);

    success(res);
}));

router.patch('/rename/:albumId', asyncWrapper(async (req, res) => {
    const { pb } = req;
    const { albumId } = req.params;
    const { name } = req.body;

    await pb.collection('photos_album').update(albumId, { name });

    success(res);
}));

router.patch('/set-cover/:albumId/:imageId', asyncWrapper(async (req, res) => {
    const { pb } = req;
    const { imageId, albumId } = req.params;
    const { isInAlbum } = req.query;

    if (!imageId || !albumId) {
        throw new Error('Missing required fields');
    }

    let image;
    if (isInAlbum === 'true') {
        const dim = await pb.collection('photos_entry_dimensions').getOne(imageId);
        image = await pb.collection('photos_entry').getOne(dim.photo);
    } else {
        image = await pb.collection('photos_entry').getOne(imageId);
    }

    await pb.collection('photos_album').update(albumId, { cover: image.id });

    success(res);
}));

export default router;
