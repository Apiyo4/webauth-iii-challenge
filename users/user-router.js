const express = require("express");
const Users = require("./users-model");
const bcrypt = require('bcryptjs');

const router = express.Router();

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
  Users.findBy({ username, password })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
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
