const express = require('express');

const server = express();

server.get('/', (req,res)=>{
    res.json(`Api is working`)
})

module.exports = server;
