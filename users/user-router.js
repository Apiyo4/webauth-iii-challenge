const express = require('express');
const Users=  require('./users-model');

const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password, department } = req.body;
    const user = {
      username,
      password, 
      department
    };
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

module.exports= router;