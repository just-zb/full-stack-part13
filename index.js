import dotenv from 'dotenv';
dotenv.config();
import blogRouter from './controller/blogRouter.js';
import express from 'express';
import {connectToDatabase, syncModels} from "./util/db.js";
import {PORT} from "./util/config.js";
import errorHandler from "./middleware/errorHandler.js";
import unknownPoint from "./middleware/unknownPoint.js";
const app = express();
app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use(unknownPoint)
app.use(errorHandler);

const start = async () => {
    await connectToDatabase();
    await syncModels();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
start().then(() =>console.log('Server started'));