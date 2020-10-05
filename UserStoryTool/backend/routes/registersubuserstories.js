const express = require("express");
const users = express.Router();
const subuserstories_model = require("../models/subuserstories");
const Project_userstories = require("../models/Project_userstories");

users.post("/registersubuserstories", (req, res) => {
let len;

  subuserstories_model
  .findAll({
  })  .then(sublen  => {
  len=sublen.length
  console.log(len)
  const userData = {
    substory_id: len+1,
    userstory_id: req.body.userstory_id,
    etc: req.body.etc,
    completed:0,
    Desc_As:req.body.Desc_As,
    Desc_I:req.body.Desc_I,
    Desc_So:req.body.Desc_So,
    subuserstory_name: req.body.subuserstory_name,
    Project_ID:req.body.Project_ID,
    user_id:req.body.user_id
  };

  Project_userstories
    .findOne({
      where: {
        UserStoryID: req.body.userstory_id
      }
    })
    .then(story_count => {

    subuserstories_model
    .findAll({
      where: {
        userstory_id: req.body.userstory_id
      }
    })
    .then(subuserstorie => {
      //console.log("iam h");
      // console.log(subuserstorie.length);
      // console.log("AAAA",story_count['dataValues']['subStories'])
      if (subuserstorie.length < story_count['dataValues']['subStories']) {
        console.log("iam h");
        subuserstories_model
          .create(userData)
          .then(subuserstorie => {
            res.json({message : "sub user story added"});
          })
          .catch(err => {
            res.send("error: " + err);
          });
      } else {
        if(subuserstorie.length ==story_count['dataValues']['subStories'])
        res.json({ message: "Substories Limit reached"})
        else
        res.json({ message: "No combination for user story and sub user story" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});
});
  });
module.exports = users;
