import dotenv from 'dotenv';
dotenv.config();
import blogRouter from './controller/blogRouter.js';
import userRouter from './controller/userRouter.js';
import loginRouter from './controller/loginRouter.js';
import authorRouter from "./controller/authors.js";
import readingListsRouter from "./controller/readingListsRouter.js";
import logoutRouter from "./controller/logout.js";
import express from 'express';
import {connectToDatabase, runMigrations} from "./util/db.js";
import {PORT} from "./util/config.js";
import {errorHandler,unknownPoint} from "./middleware/middleware.js";
const app = express();
app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorRouter);
app.use('/api/readingLists', readingListsRouter);
app.use('/api/logout', logoutRouter);
app.use(unknownPoint)
app.use(errorHandler);

const start = async () => {
    await connectToDatabase();
    await runMigrations();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
start().then(() =>console.log('Server started'));