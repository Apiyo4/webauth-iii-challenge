const express = require('express');

const configureMiddleware = require('./configure-midleware');
const UserRouter = require('../users/user-router');

const server = express();

configureMiddleware(server); 

server.use('/api', UserRouter);

server.get('/', (req,res)=>{
    res.json(`Api is working`)
})

module.exports = server;