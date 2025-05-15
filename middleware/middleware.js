import {Blog} from "../models/index.js";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../util/config.js";

const blogFindHandler = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id).catch(() => {
        next(new Error('BlogNotFoundError'));
    });
    next();
};

const errorHandler = (error, req, res, next) => {
    // console.error(error.stack);
    if (error.message === 'CreateBlogError') {
        return res.status(400).send({error: 'Failed to create blog'});
    }else if (error.message === 'UpdateBlogError') {
        return res.status(400).send({error: 'Failed to update blog'});}
    else if (error.message === 'BlogNotFoundError') {
        return res.status(404).send({error: 'Blog not found'});
    }else if (error.message === 'SequelizeValidationError') {
        return res.status(400).send({error: error.message});
    }else if (error.message === 'SequelizeDatabaseError') {
        return res.status(400).send({error: error.message});
    }
    next(error);
};

const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization');
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        try {
            req.token = jwt.verify(auth.substring(7), JWT_SECRET);
        }catch (error) {
            return res.status(401).send({error: 'Invalid token'});
        }
    } else {
        res.status(401).send({error: 'Token missing'});
    }
    next();
}

const unknownPoint = (req, res, next) => {
    res.status(404).send({ error: 'Unknown endpoint' });
    next();
}

export { blogFindHandler, errorHandler, unknownPoint, tokenExtractor };
