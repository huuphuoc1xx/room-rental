const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    database: process.env.DATABASE_NAME,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    dialect: "mysql",
    pool: {
        max: 10,
    },
});

module.exports = { sequelize };