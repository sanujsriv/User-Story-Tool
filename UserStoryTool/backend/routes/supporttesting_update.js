const express = require("express");
const users111 = express.Router();
const userstories_model = require("../models/supporttesting.js");
//const users_model = require("../models/users.js");

module.exports = users111;

users111.put("/supportstoriesupdate", (req, res) => {
  let updateValues = {
    userstory_id: req.body.userstory_id,
    userstory_to_test_by: req.body.userstory_to_test_by,
  };

  updateValues.testing_status = 1;

  userstories_model
    .update(updateValues, {
      where: {
        userstory_id: req.body.userstory_id,
      },
    })
    .then((result) => {
      if (result == 1) {
        //console.log(result);
        res.json(
          "support testing for this  userstory is assigned to :" +
            updateValues.userstory_to_test_by
        );
      } else {
        // After the changes are made compare the changes with the first brought details of user story and then allow it in then we can avoid both cases in the else brach
        res.json("Support user story story not found in table");
      }
    });
});
