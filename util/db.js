import {Sequelize} from "sequelize";
import {DATABASE_URL} from "./config.js";
import {SequelizeStorage, Umzug} from "umzug";

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

const migrationConf = {
    migrations: {
        glob: 'migrations/*.js',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
};

const runMigrations = async () => {
    const migrator = new Umzug(migrationConf);
    const migrations = await migrator.up();
    console.log('Migrations up to date', {
        files: migrations.map((mig) => mig.name),
    });
};
const rollbackMigration = async () => {
    await sequelize.authenticate();
    const migrator = new Umzug(migrationConf);
    await migrator.down();
};

export {sequelize, connectToDatabase, runMigrations, rollbackMigration};