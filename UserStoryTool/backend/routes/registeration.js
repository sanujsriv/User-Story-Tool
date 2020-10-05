const express = require("express");
const users = express.Router();
const User_Model = require("../models/Users");
// const bcrypt = require("bcrypt");

users.post("/register", (req, res) => {
  //const today = new Date().toDateString();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_role: req.body.user_role,
    email_id: req.body.email_id,
    user_id: req.body.user_id,
    password: req.body.password,
  };
  User_Model.findOne({
    where: {
      user_id: req.body.user_id,
    },
  })
    .then((user) => {

      //console.log("i am here");
      if (!user) {
        // bcrypt.hash(req.body.password, 10, (err, hash) => {
        //     userData.password = hash;
        User_Model.create(userData)
          .then((user) => {
            res.json({ message: user.user_id + " registered" });
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      } else {
        res.json({ message: "User already exists" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = users;
