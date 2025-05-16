import jwt from 'jsonwebtoken';
import {User,Sessions} from '../models/index.js';
import {JWT_SECRET} from "../util/config.js";
import {Router} from 'express';
const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    const passwordCorrect = password === 'secret';

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        });
    }
    if (user.disabled) {
        return res.status(401).json({
            error: 'user disabled'
        });
    }
    const userForToken = {
        username: user.username,
        id: user.id
    };
    const token = jwt.sign(userForToken, JWT_SECRET, {
        expiresIn: 60 * 60
    });
    await Sessions.upsert(
        {
            userId: user.id,
            token: token
        }
    )
    res.status(200).send({
        token,
        username: user.username,
        name: user.name
    });
});
export default loginRouter;