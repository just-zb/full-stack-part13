import jwt from 'jsonwebtoken';
import {User} from '../models/index.js';
import {JWT_SECRET} from "../util/config.js";
import {Router} from 'express';
const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    const passwordCorrect = password === 'secret'; // TODO Replace with actual password check

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        });
    }
    const userForToken = {
        username: user.username,
        id: user.id
    };
    const token = jwt.sign(userForToken, JWT_SECRET, {
        expiresIn: 60 * 60
    });
    res.status(200).send({
        token,
        username: user.username,
        name: user.name
    });
});
export default loginRouter;