import dotenv from 'dotenv';
import {DataTypes, Model} from 'sequelize';
import {sequelize} from "../util/db.js";
import yearValidator from "../util/yearValidator.js";
dotenv.config();

class Blog extends Model {}

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            yearValidator
        }
    },
}, {
    sequelize,
    modelName: 'Blog',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
});

export default Blog;