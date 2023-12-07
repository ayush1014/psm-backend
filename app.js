const express = require('express')
const routes = require('./router/routes')
const db_con = require('./config/database')
const Users = require('./models/Users')
const Posts = require('./models/Posts')
const Follow = require('./models/Follow-user')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json()); 
app.use(cors());
app.listen(5010)

db_con.sync().then(()=>{
    console.log('database & tables synced')
})
app.use('/psm', routes);



module.exports = app;