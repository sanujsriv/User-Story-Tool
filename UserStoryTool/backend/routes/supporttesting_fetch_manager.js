const express = require("express");
const users11 = express.Router();
//const user_model = require("../models/Users");
let userstoryvar = [];
const userstories_model = require("../models/supporttesting.js");
users11.post("/fetchsupportstoriesformanager", (req, res) => {
  userstories_model
    .findAll({
    })
    .then((userstorie) => {
      if (userstorie.length > 0) {
        res.status(200).json({ userstorie });
      } else {
        res.status(400).json({
          error:
            "Support testing modules have been completed or completely assigned",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});
module.exports = users11;
