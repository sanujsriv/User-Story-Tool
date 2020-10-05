const express = require("express");
const users11 = express.Router();
//const user_model = require("../models/Users");
let userstoryvar = [];
const userstories_model = require("../models/supporttesting.js");
users11.post("/fetchsupportstories", (req, res) => {
  userstories_model
    .findAll({
      where: {
        userstory_to_test_by: req.body.userstory_to_test_by,
      },
    })
    .then((userstorie) => {
      //console.log(userstorie);
      if (userstorie.length > 0) {
        //console.log(userstorie.length);
        //for (i = 0; i < userstorie.length; i++) {

        //userstoryvar += <br></br>;
        //console.log(userstorie[i].dataValues.userstory_description);
        //}
        //console.log(userstorie.length);
        //console.log(userstorie[1].dataValues.userstory_description);
        //if (req.body.password === user.password) {
        res.status(200).json({ userstorie });
      } else {
        res.status(400).json({
          error:
            "Support testing modules have either been completed or not assigned",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});
module.exports = users11;
