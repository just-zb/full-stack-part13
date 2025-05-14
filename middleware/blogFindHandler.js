import Blog from "../models/blog.js";

const blogFindHandler = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id).catch(() => {
        next(new Error('BlogNotFoundError'));
    });
    next();
};

export default blogFindHandler;