import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../util/db.js';
class Session extends Model {}

Session.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: { model: 'users', key: 'id' },
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        modelName: 'session',
    }
);

export default Session;