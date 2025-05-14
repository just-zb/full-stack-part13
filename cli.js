require('dotenv').config();

const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

const cli = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    const blogs = await sequelize.query('SELECT * FROM blogs');
    blogs[0].forEach(blog => {
        console.log(blog);
    });
    await sequelize.close();
}
cli();