import {Router} from 'express';
import Blog from "../models/blog.js";
import blogFindHandler from "../middleware/blogFindHandler.js";
const blogRouter = Router();

// GET api/blogs
blogRouter.get('/', async (req, res) => {
        try {
            const blogs = await Blog.findAll();
            res.status(200).json(blogs);
        } catch (error) {
            res.status(500).send({error: 'Failed to fetch blogs'});
        }
    }
);
// get api/blogs/:id
blogRouter.get('/:id', blogFindHandler, async (req, res) => {
        res.json(req.blog)
    }
);
// POST api/blogs
blogRouter.post('/', async (req, res,next) => {
    const blog = await Blog.create(req.body).catch(() => {
        next(new Error('CreateBlogError'));
    });
    res.status(201).json(blog);
    }
);
// delete api/blogs/:id
blogRouter.delete('/:id', blogFindHandler, async (req, res) => {
        await req.blog.destroy();
        res.status(204).end();
    }
);
// put api/blogs/:id
blogRouter.put('/:id', blogFindHandler, async (req, res,next) => {
    await req.blog.update(req.body).catch(() => {
        next(new Error('UpdateBlogError'));
    });
    res.status(200).json(req.blog);
    }
);
export default blogRouter;