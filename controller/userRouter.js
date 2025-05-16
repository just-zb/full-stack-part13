import { Router } from 'express';
const userRouter = Router();
import {Blog,User,Sessions} from "../models/index.js";

userRouter.get('/', async (req, res) => {
    const users = await User.findAll(
        {
            include: {
                model: Blog,
                attributes: {exclude: ['userId']},
            },
        }
    )
    res.json(users);
});

userRouter.get('/:id', async (req, res) => {
    const where = {};

    if (req.query.read) {
        where.read = req.query.read === 'true';
    }
    const user = await User.findByPk(req.params.id,{
        include: [
            {
                model: Blog,
                attributes: {exclude: ['userId']},
            },
            {
                model: Blog,
                as: 'readingLists',
                attributes: {exclude: ['userId']},
                through: {
                    attributes: ['read'],
                    where
                },
            },
        ]

    });
    if (user) {
        res.json(user);
    } else {
        res.status(404).send({ error: 'User not found' });
    }
});

userRouter.post('/', async (req, res) => {
    const { username, passwordHash, name } = req.body;
    try {
        const newUser = await User.create({ username, passwordHash, name });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).send({ error: 'Failed to create user' });
    }
});

userRouter.put('/:username', async (req, res) => {
    const { username } = req.params;
    const { name, passwordHash } = req.body;

    const user = await User.findOne({ where: { username } });
    if (user) {
        user.name = name;
        user.passwordHash = passwordHash;
        await user.save();
        res.status(200).json(user);
    } else {
        res.status(404).send({ error: 'User not found' });
    }
} );

// ban a user
userRouter.put('/:id/ban', async (req, res) => {
    const { id } = req.params;
    const { banned } = req.body;

    if (banned === undefined) {
        return res.status(400).send({ error: 'Request did not specify whether to ban or unban user' });
    }
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }
    user.disabled = banned;
    await user.save();

    if(banned) {
        await Sessions.destroy({
            where: {
                userId: id
            }
        });
    }
    res.status(200).json(user);
});
export default userRouter;