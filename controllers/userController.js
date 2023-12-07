const Users = require('../models/Users')
const Follow = require('../models/Follow-user')
const Sequelize = require('sequelize')
class UserController{
    async createUser(req, res){
        console.log('User is being created3')
        console.log(req.body)
        const {username, name, email, dob, password} = req.body;

            const user = await Users.findByPk(username)
            if(user){
                return res.status(400).json({error: 'User Already Exists, Please choose some other username or Login'})
            }
        const newUser = await Users.create({username, name, email, dob, password})
        res.status(201).json(newUser)
        // Users.sequelize.query('INSERT INTO Users (username, name, email, dob, password) VALUES (?,?,?,?,?)' , {
        //     replacements : [username, name, email, dob, password], 
        //     type : Users.sequelize.QueryTypes.INSERT,
        // } )
    }

    async getAllUser(req, res){
        console.log('allUsers')
        const allUsers = await Users.findAll()
        return res.json(allUsers);
    }

    async getNonFollowingUsers(req, res){
        const userId = req.params.userId;
        console.log(req, userId)
        const users = await Follow.findAll({
            where: {
                fan : userId
            }
        })
        const followedList = users.map(item => item.followed);
        followedList.push(userId)
        const notFollowingUsers = await Users.findAll({
            where: {
                username : {
                    [Sequelize.Op.notIn]:followedList
                }
            }
        })
        return res.json(notFollowingUsers)
    }

    async followUser(req,res){
        const {fan, followed} = req.body

        const user1 = await Users.findByPk(fan)
        const user2 = await Users.findByPk(followed)

        if(!user1 || !user2){
            return res.status(404).json({error: 'User does not exits or might be temporarily unavailable'});          
        }
        const followQuery = await Follow.findAll({
            where:{
                fan : fan,
                followed : followed
            }
        })
        console.log('pahele instance:', followQuery)
        if(followQuery.length != 0 && followQuery[0].isFollowing==1){
            return res.status(409).json({error: 'Already following'})
        }
        if(followQuery.length!=0 && followQuery[0].previouslyFollowed == 1){
            followQuery[0].isFollowing = 1
            followQuery[0].save()
            return res.status(201).json(followQuery[0])
        }
        console.log(followQuery);
        
        const previouslyFollowed = 1
        const isFollowing = 1
        const follow = await Follow.create({fan, followed, previouslyFollowed, isFollowing})
        return res.status(201).json({
            message : `${fan} is now following ${followed}`,
            'follow' : follow
        })
    }
    async unfollowUser(req, res){
        const {fan, followed} = req.body;
        console.log(req.body, fan, followed)
        const user1 = await Users.findByPk(fan)
        const user2 = await Users.findByPk(followed)

        if(!user1 || !user2){
            return res.status(404).json({error: 'User does not exits or might be temporarily unavailable'});          
        }
        const followQuery = await Follow.findAll({
            where:{
                fan : fan,
                followed : followed
            }
        })
        if(followQuery.length == 0){
            return res.status(404).json({error: 'please follow user first'})
        }
        followQuery[0].isFollowing = 0;
        console.log(followQuery[0])
        followQuery[0].save()
        return res.json(followQuery[0])
    }
}
module.exports = new UserController();