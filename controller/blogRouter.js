import {Router} from 'express';
import {blogFindHandler, tokenExtractor} from "../middleware/middleware.js";
import {User,Blog} from "../models/index.js";
import {Op} from "sequelize";
const blogRouter = Router();

// GET api/blogs
blogRouter.get('/', async (req, res) => {
        // GET /api/blogs?search=react, search by title and author, order by likes desc
        const search = req.query.search;
        const order = 'likes';
        let where = {}
        if (search) {
            where[Op.or] = [{title: {[Op.like]: `%${search}%`}}, {author: {[Op.like]: `%${search}%`}}]
        }
        const blogs = await Blog.findAll(
            {
                attributes: {exclude: ['userId']},
                where,
                order: [[order, 'DESC']],
                include: {
                    model: User,
                    attributes: {include: ['name']},
                },
            }
        );
        res.json(blogs);
    }
);
// get api/blogs/:id
blogRouter.get('/:id', blogFindHandler, async (req, res) => {
        res.json(req.blog)
    }
);
// POST api/blogs
blogRouter.post('/',tokenExtractor, async (req, res,next) => {
    const user = await User.findByPk(req.token.id)
    const blog = await Blog.create({...req.body, userId: user.id,date:new Date()}).catch(() => {
        next(new Error('CreateBlogError'));
    });
    res.status(201).json(blog);
    }
);
// delete api/blogs/:id
blogRouter.delete('/:id', blogFindHandler,tokenExtractor, async (req, res) => {
    // only the user who submit the blog can delete it
    if (req.token.id !== req.blog.userId) {
        return res.status(401).json({error: 'Unauthorized'});
    }
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