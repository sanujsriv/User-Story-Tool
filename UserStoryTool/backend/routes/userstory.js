const express = require("express");
const users = express.Router();
const User_Model = require("../models/userstories");
const Project_userstories = require("../models/Project_userstories");
const SubStories = require("../models/subuserstories")

users.post("/register_project_userstories", (req, res) => {
  //const today = new Date().toDateString();
  const projectData = {
    Project_ID:req.body.Project_ID,
    user_id: req.body.user_id,
    UserStoryID: req.body.UserStoryID,
    Desc_As: req.body.Desc_As,
    Desc_I: req.body.Desc_I,
    Desc_So: req.body.Desc_So,
    etc:req.body.etc,
    subStories:req.body.subStories,
    userstory_name: req.body.userstory_name,
  };
  Project_userstories.findOne({
    where: {
      UserStoryID: req.body.UserStoryID,
    },
  })
    .then((user) => {
      console.log("i am here");
      if (!user) {
        Project_userstories.create(projectData)
          .then((user) => {
            res.json({ message:"Success!!" });
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      } else {
        res.json({ message: "UserStoryID already exists" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
  });

users.post("/register_user_userstories", (req, res) => {
    const userData = {
      user_id: req.body.user_id,
      userstory_id: req.body.userstory_id,
      userstory_priority: req.body.userstory_priority,
      Project_ID:req.body.Project_ID,

    };
    User_Model.findOne({
      where: {
        userstory_id: req.body.userstory_id,
      },
    })
      .then((user) => {
        console.log("i am here");
        if (!user) {
          User_Model.create(userData)
            .then((user) => {
              res.json({ message: user.user_id + " registered" });
            })
            .catch((err) => {
              res.send("error: " + err);
            });
        } else {
          res.json({ message: "UserStoryID already exists" });
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
    });


users.post("/fetchstories", (req, res) => {
  User_Model.findAll({
    where: {
      user_id: req.body.user_id,
    },
  }).then((users) => {
    res.json([users]);
  });
});

User_Model.hasMany(Project_userstories, {foreignKey: 'UserStoryID'})
Project_userstories.belongsTo(User_Model, {foreignKey: 'UserStoryID', targetKey: 'userstory_id'})

users.post("/fetchUserStories", (req, res) => {
        Project_userstories.findAll({
          // attributes :['user_id','user_story'],
          include: [{
            model: User_Model,
            attributes :['user_id','userstory_priority','analysis','testing'],
            required: true,
            where: {
              user_id: req.body.user_id,
            },
          }],

        })
          .then((users) => {
                          res.json([users]);})
                      .catch((err) => {
                        res.status(400).json({ message: err });
                      });
                    });



users.put("/edituserprojectstories", (req, res) => {
  let updateValues = {
    userstory_name: req.body.userstory_name,
    Desc_As: req.body.Desc_As,
    Desc_I: req.body.Desc_I,
    Desc_So: req.body.Desc_So,
    etc:req.body.etc,
    subStories : req.body.subStories,
  };
  let update_userVals = {
    userstory_priority : req.body.userstory_priority
  }
  Project_userstories.update(updateValues, {
    where: { UserStoryID: req.body.UserStoryID },
  }).then((result) => {
    if (result == 1) {
      console.log(result);
      res.json("success");
    }
  });
  User_Model.update(update_userVals, {
    where: { userstory_id: req.body.UserStoryID },
  }).then((result) => {
    if (result == 1) {
      console.log(result);
    }
});
});
users.post("/deleteuserstories", (req, res) => {
   User_Model.destroy({where: { userstory_id: req.body.UserStoryID }}).then(
     (result) => {
       if (result == true) {
         console.log(result);
         res.json("Deleted userstory successfully");
       } else {
         res.json("Incorrect user_storyid / user_storyid does not exist ");
       }
     });

  Project_userstories.destroy({ where: { UserStoryID: req.body.UserStoryID } }).then(
    (result) => {
      if (result == true) {
        console.log(result);
    }
  });

  SubStories.destroy({ where: { userstory_id: req.body.UserStoryID } }).then(
    (result) => {
      if (result == true) {
        console.log(result);
    }
  });
});


module.exports = users;
