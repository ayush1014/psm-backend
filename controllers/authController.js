const Users = require("../models/Users");

// const Sequelize = require('sequelize')
class AuthController{
    async login(req, res) {
        const {username, password} = req.body;
        console.log(req.body);
        const logUser = await Users.findByPk(username);
        // console.log('logUser', logUser.dataValues.password, password);
        if(!logUser){
            return res.status(404).json({error: 'USER NOT FOUND'})
        }
        if(!(logUser.dataValues.password == password)){
            return res.status(401).json({error: 'INVALID CREDENTIALS'})
        }
        return res.json(logUser)
    }
}
module.exports = new AuthController();