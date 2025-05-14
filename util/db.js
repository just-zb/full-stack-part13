import {Sequelize} from "sequelize";
import {DATABASE_URL} from "./config.js";

const sequelize = new Sequelize(DATABASE_URL,{
    dialect: 'postgres',
    logging: false,
    define: {
        timestamps: false,
        underscored: true
    }
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return process.exit(1);
    }
    return null
}

// Sync all models that aren't already in the database
const syncModels = async () => {
    try {
        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to sync the models:', error);
        return process.exit(1);
    }
    return null
}
export {sequelize, connectToDatabase, syncModels};