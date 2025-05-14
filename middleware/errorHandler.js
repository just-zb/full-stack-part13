const errorHandler = (error, req, res, next) => {
    // console.error(error.stack);
    if (error.message === 'CreateBlogError') {
        return res.status(400).send({error: 'Failed to create blog'});
    }else if (error.message === 'UpdateBlogError') {
        return res.status(400).send({error: 'Failed to update blog'});}
    else if (error.message === 'BlogNotFoundError') {
        return res.status(404).send({error: 'Blog not found'});
    }
    next(error);
}
export default errorHandler;