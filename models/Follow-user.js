const {DataTypes, Sequelize} = require('sequelize');
const db = require('../config/database');

const Follow = db.define('Follow', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    fan:{
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'username'
        }
    },

    followed:{
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'username'
        }
    },

    previouslyFollowed:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    isFollowing:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Follow;