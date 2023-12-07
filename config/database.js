const {Sequelize} = require('sequelize');
require('dotenv').config()
console.log('test db', process.env.DB_USER)
const db = new Sequelize({
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host:process.env.DB_HOST,
    dialect:'mysql'
})

module.exports = db;