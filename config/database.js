const {Sequelize} = require('sequelize');
require('dotenv').config()
console.log('test db', process.env.DB_USER)
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host:process.env.DB_HOST,
    dialect:'mysql'
})

module.exports = db;