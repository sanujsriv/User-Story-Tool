const express = require("express");
const users = express.Router();
const User = require("../models/Users");
const User_Stories = require("../models/userstories");
const Sequelize = require("sequelize");
const Project_userstories = require("../models/Project_userstories");
const Projects = require("../models/Projects");
const SubStories = require("../models/subuserstories")


users.put("/changeSubStoryStatus", (req, res) => {
  let updateValues = {
    completed: req.body.completed,
  };
  SubStories.update(updateValues, {
    where: { substory_id: req.body.substory_id },
  }).then((result) => {
    // here your result is simply an array with number of affected rows
    if (result == 1) {
      console.log(result);
      res.status(200).json({ updateValues });
    } else {
      res.status(200).json("No update took place");
    }
  });
});

users.put("/changeUserStoryAnalysis", (req, res) => {
  let updateValues = {
    analysis: req.body.analysis,
  };
  User_Stories.update(updateValues, {
    where: { userstory_id: req.body.userstory_id },
  }).then((result) => {
    // here your result is simply an array with number of affected rows
    if (result == 1) {
      console.log(result);
      res.status(200).json({ updateValues });
    } else {
      res.status(200).json("No update took place");
    }
  });
});

users.put("/changeUserStoryTesting", (req, res) => {
  let updateValues = {
    testing: req.body.testing,
  };
  User_Stories.update(updateValues, {
    where: { userstory_id: req.body.userstory_id },
  }).then((result) => {
    // here your result is simply an array with number of affected rows
    if (result == 1) {
      console.log(result);
      res.status(200).json({ updateValues });
    } else {
      res.status(200).json("No update took place");
    }
  });
});





























module.exports = users;
