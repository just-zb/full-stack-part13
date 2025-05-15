import {Router} from 'express';
import {Blog} from "../models/index.js";
import {fn, col} from "sequelize";

const authorRouter = Router();
// GET api/authors
authorRouter.get('/', async (req, res) => {
    const authors = await Blog.findAll({
        attributes: [
            'author',
            [fn('COUNT', col('author')), 'articles'],
            [fn('SUM', col('likes')), 'likes']
        ],
        group: ['author'],
        order: [[fn('SUM', col('likes')), 'DESC']],
    });
    res.json(authors);
})

export default authorRouter;
