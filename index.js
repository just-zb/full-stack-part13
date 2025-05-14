import dotenv from 'dotenv';
dotenv.config();
import Blog from "./models/blog.js";
import blogRouter from './router/blogRouter.js';
import express from 'express';
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

Blog.sync().then(() => console.log('Blog table created successfully!'));
app.use('/api/blogs', blogRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});