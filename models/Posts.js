const {DataTypes, Sequelize} = require('sequelize');
const db = require('../config/database');

const Posts = db.define('Posts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },

    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    postdescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    likecount: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    
});

module.exports = Posts;