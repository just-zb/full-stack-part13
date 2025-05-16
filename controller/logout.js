import {Router} from 'express';
const logoutRouter = Router();
import {Sessions,User} from '../models/index.js';
import {tokenExtractor} from "../middleware/middleware.js";

logoutRouter.delete('/', tokenExtractor,async (req, res) => {
    const user = await User.findByPk(req.token.id);
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }
    const session = await Sessions.findByPk(req.token.id);
    if(!session || session.token !== req.token) {
        return res.status(401).send({ error: 'Invalid token' });
    }
    await Sessions.destroy({
        where: {
            userId: req.token.id
        }
    })
    res.status(200).end();
})

export default logoutRouter;