import { Router } from 'express';
const userRouter = Router();
import {Blog,User} from "../models/index.js";

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
    const user = await User.findByPk(req.params.id);
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
export default userRouter;