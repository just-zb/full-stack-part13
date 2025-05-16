import {Model,DataTypes} from 'sequelize';
import {sequelize} from "../util/db.js";

class ReadingLists extends Model {}
ReadingLists.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'blogs',
            key: 'id'
        }
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    sequelize,
    modelName: 'ReadingList',
    timestamps: false,
    underscored: true
});

export default ReadingLists;