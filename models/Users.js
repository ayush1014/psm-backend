const {DataTypes, Sequelize} = require('sequelize');
const db = require('../config/database');

const Users = db.define('Users', {
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,

    }
    
});

module.exports = Users;