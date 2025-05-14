import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import Blog from "../models/blog.js";
const blogRouter = Router();

// GET api/blogs
blogRouter.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.status(200).json(blogs);
    }catch (error) {
        res.status(500).send({ error: 'Failed to fetch blogs' });
    }
}
);
// get api/blogs/:id
blogRouter.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) {
            return res.status(404).send({ error: 'Blog not found' });
        }else {
            res.status(200).json(blog);
        }
    }catch (error) {
        res.status(500).send({ error: 'Failed to fetch blog' });
    }
}
);
// POST api/blogs
blogRouter.post('/', async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json(blog);
    }catch (error) {
        res.status(400).send({ error: 'Failed to create blog' });
    }
}
);
// delete api/blogs/:id
blogRouter.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) {
            return res.status(404).send({ error: 'Blog not found' });
        }else {
            await blog.destroy();
            res.status(200).send({ message: 'Blog deleted' });
        }
    }catch (error) {
        res.status(500).send({ error: 'Failed to delete blog' });
    }
}
);

export default blogRouter;