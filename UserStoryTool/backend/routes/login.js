const express = require("express");
const users = express.Router();
const User = require("../models/Users");
users.post("/login", (req, res) => {
  User.findOne({
    where: {
      user_id: req.body.user_id,
    },
  })
    .then((user) => {
      if (user) {
        if (req.body.password === user.password){
          // console.log(user.user_role);
          res.status(200).json({ message: "User exists" , role: user.user_role.toString()});
          // let token= user.user_id;
          // res.send(token);
        }
        else {
          res.status(400).json({ message: "password does not match" });
        }
      } else {
        res.status(400).json({ message: "User does not exist" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});
module.exports = users;
