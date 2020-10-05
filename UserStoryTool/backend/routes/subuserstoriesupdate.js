const express = require("express");
const users111 = express.Router();
//const user_model = require("../models/Users");
//let userstoryvar = [];
const subuserstories_model = require("../models/Subuserstories");

users111.put("/subuserstoriesupdate", (req, res) => {
  let updateValues = {
    etc: req.body.etc,
    Desc_As:req.body.Desc_As,
    Desc_I:req.body.Desc_I,
    Desc_So:req.body.Desc_So,
    subuserstory_name: req.body.subuserstory_name,
  };

  subuserstories_model
    .update(updateValues, {
      where: {
        userstory_id: req.body.userstory_id,
        substory_id: req.body.substory_id
      }
    })
    .then(result => {
      if (result == 1) {
        //console.log(result);
        res.json("update successfull");
      } else {
        // After the changes are made compare the changes with the first brought details of user story and then allow it in then we can avoid both cases in the else brach
        res.json(
          "either user/user story combo not found or no changes were made in the database"
        );
      }
    });
});


module.exports = users111;
