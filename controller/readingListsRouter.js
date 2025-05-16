import {Router} from 'express';
const readingListsRouter = Router();
import {Blog,User,ReadingLists} from '../models/index.js';
import {tokenExtractor} from "../middleware/middleware.js";
import {Model as ReadingList} from "sequelize";

readingListsRouter.post('/', async (req, res) => {
    const userId = req.body.userId;
    const blogId = req.body.blogId;

    const user = await User.findByPk(userId);

    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    const blog = await Blog.findByPk(blogId);

    if (!blog) {
        return res.status(404).send({ error: 'Blog not found' });
    }

    const listItem = await ReadingLists.create({
        userId: user.id,
        blogId: blog.id,
        read: false,
    });

    res.json(listItem);
})

readingListsRouter.put('/:id', tokenExtractor, async (req, res) => {
    const markedAsRead = req.body.read;

    if (markedAsRead === undefined) {
        return res.status(400).send({
            error: "Request didn't specify whether to mark blog as read or unread",
        });
    }

    const blogId = req.params.id;

    const blog = await Blog.findByPk(blogId);
    if (!blog) {
        return res.status(404).send({ error: 'Blog not found' });
    }

    const user = await User.findByPk(req.token.id);

    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    const entry = await ReadingList.findOne({
        where: {
            userId: user.id,
            blogId: blog.id,
        },
    });
    if (!entry) {
        return res.status(404).send({ error: 'Entry not found' });
    }
    entry.read = markedAsRead;
    await entry.save();

    res.json(entry);
});

export default readingListsRouter;