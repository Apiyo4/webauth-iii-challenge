const express = require("express");
const Users = require("./users-model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const makeToken = (user)=>{
    const payload = {
      sub: user.id,
      username: user.username,
      department: user.department,
    };
    const options = {
      expiresIn: '12h',
    };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secretwordisqwertyuiopasdfghjklzxcvbnm',
      options,
    );
    return token;
  
}

router.post("/register", (req, res) => {
  const { username, password, department } = req.body;
  const bcryptHash = bcrypt.hashSync(password, 10);
  const user = {
    username,
    password:bcryptHash,
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
router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
         const token = makeToken(user);
        res.status(200).json({ message: `Welcome ${user.username}!`, token: token});
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
router.get('/users', (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });
module.exports = router;
