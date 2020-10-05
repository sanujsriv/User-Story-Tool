const express = require("express");
const users111 = express.Router();
const userstories_model = require("../models/supporttesting.js");
//const users_model = require("../models/users.js");

users111.post("/insertsupportstories", (req, res) => {
  const userData = {
    userstory_id: req.body.userstory_id,
    userstory_done_by: req.body.userstory_done_by,
  };

  userData.testing_status = 0;
  userData.userstory_to_test_by = " ";

  userstories_model
    .create(userData)
    .then((subuserstorie) => {
      res.json(
        " support user story  for user  : " + userData.userstory_done_by
      );
    })
    .catch((err) => {
      if ((err = "SequelizeUniqueConstraintError")) {
        res.send("error: Support story already looged for given userstory ID ");
      } else {
        res.send("error: " + err);
      }
      //console.log(err.name = 'SequelizeUniqueConstraintError');
    });
});

module.exports = users111;
