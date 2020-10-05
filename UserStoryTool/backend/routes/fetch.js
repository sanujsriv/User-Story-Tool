const express = require("express");
const users = express.Router();
const User = require("../models/Users");
const User_Stories = require("../models/userstories");
const Sequelize = require("sequelize");
const Project_userstories = require("../models/Project_userstories");
const Projects = require("../models/Projects");
const SubStories = require("../models/subuserstories")


users.post("/fetchUsers", (req, res) => {
  User.findOne({
    where: {
      user_id: req.body.user_id,
    },
  })
    .then((user) => {
      if (user) {
          res.json([user]);
        }
        else {
          res.status(400).json({ message: "Error" });
        }
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
        });

users.post("/fetchAllUsers", (req, res) => {
        User.findAll({
        })
          .then((user) => {
                res.json([user]);})
            .catch((err) => {
              res.status(400).json({ message: err });
            });
          });




users.post("/fetchAllUser_UserStories", (req, res) => {
        User_Stories.findAll({
          attributes: [ [Sequelize.fn('AVG', Sequelize.col('analysis')),'analysis_complete'],
          [Sequelize.fn('AVG', Sequelize.col('testing')),'testing_complete'] ],
          where: {
            Project_ID: req.body.Project_ID,
          },

        })
          .then((user) => {
                res.json([user]);})
            .catch((err) => {
              res.status(400).json({ message: err });
            });
          });




users.post("/fetchUserStory", (req, res) => {
        Project_userstories.findOne({
          where: {
            UserStoryID: req.body.UserStoryID,
          },

        })
          .then((user) => {
                res.json([user]);})
            .catch((err) => {
              res.status(400).json({ message: err });
            });
          });


users.post("/fetchAllUserstories", (req, res) => {
    Project_userstories.findAll({
              })
                .then((users) => {
                      res.json([users]);})
                  .catch((err) => {
                    res.status(400).json({ message: err });
                  });
                });



users.post("/fetchProjectDevs", (req, res) => {
      User.findAll({
        where: {
          Project_ID: req.body.Project_ID,
        },
                })
                  .then((users) => {
                        res.json([users]);})
                    .catch((err) => {
                      res.status(400).json({ message: err });
                    });
                  });


users.post("/fetchProjectID", (req, res) => {
      User.findOne({
        attributes: ["Project_ID"],
        where: {
          user_id: req.body.user_id,
        },
                })
                  .then((users) => {
                        res.json([users]);})
                    .catch((err) => {
                      res.status(400).json({ message: err });
                    });
                  });


users.post("/fetchUserstories", (req, res) => {
      User_Stories.findAll({
        where: {
          user_id: req.body.user_id,
        },
                })
                  .then((users) => {
                        res.json([users]);})
                    .catch((err) => {
                      res.status(400).json({ message: err });
                    });
                  });


users.post("/fetchSupportUserstories", (req, res) => {
      User_Stories.findAll({
        where: {
          user_id: req.body.user_id,
          userstory_id: req.body.userstory_id
        },
                })
                  .then((users) => {
                        res.json([users]);})
                    .catch((err) => {
                      res.status(400).json({ message: err });
                    });
                  });


users.post("/fetchAllProjects", (req, res) => {
    Projects.findAll({
                      })
          .then((users) => {
                res.json([users]);})
            .catch((err) => {
              res.status(400).json({ message: err });
            });
          });


users.post("/MaxUserstories", (req, res) => {
        Project_userstories.findAll({
          attributes: [[Sequelize.fn('MAX', Sequelize.col('UserStoryID')),'max_userstories']]
        })
                    .then((users) => {
                          res.json([users]);})
                      .catch((err) => {
                        res.status(400).json({ message: err });
                      });
                    });

Projects.hasMany(User, {foreignKey: 'Project_ID'})
User.belongsTo(Projects, {foreignKey: 'Project_ID', targetKey: 'Project_ID'})

Projects.hasMany(User_Stories, {foreignKey: 'Project_ID'})
User_Stories.belongsTo(Projects, {foreignKey: 'Project_ID', targetKey: 'Project_ID'})

users.post("/fetch_user_UserStories", (req, res) => {
    User_Stories.findAll({
    // attributes :['user_id'],
    include: [{
      model: Projects,
      // attributes :['Project_ID','Project_manager','Project_ETC'],
      where: {
        Project_manager: req.body.user_id,
      },
      required: true
    }],

  })
  .then((users) => {
                    res.json([users]);})
                .catch((err) => {
                  res.status(400).json({ message: err });
                });
              });

  users.post("/fetch_user_SupportStories", (req, res) => {
      User_Stories.findAll({
      // attributes :['user_id'],
      include: [{
        model: Projects,
        // attributes :['Project_ID','Project_manager','Project_ETC'],
        where: {
          Project_manager: req.body.Project_manager,
          Project_ID : req.body.Project_ID
        },
        required: true
      }],
    where :  {
      testing : 1
    }
    })
    .then((users) => {
                      res.json([users]);})
                  .catch((err) => {
                    res.status(400).json({ message: err });
                  });
                });

users.post("/fetchUserProjects", (req, res) => {
        User.findOne({
          attributes :['user_id'],
          include: [{
            model: Projects,
            attributes :['Project_ID','Project_manager','Project_ETC'],
            required: true
          }],
          where: {
            user_id: req.body.user_id,
          },
        })
          .then((users) => {
                          res.json([users]);})
                      .catch((err) => {
                        res.status(400).json({ message: err });
                      });
                    });

users.post("/fetchProjectUsers", (req, res) => {
        Projects.findAll({
          attributes :['Project_ID','Project_manager'],
          include: [{
            model: User,
            attributes :['user_id','user_role'],
            required: true
          }],
          where: {
            Project_manager: req.body.user_id,
          },
        })
          .then((users) => {
                          res.json([users]);})
                      .catch((err) => {
                        res.status(400).json({ message: err });
                      });
                    });


Projects.hasMany(Project_userstories, {foreignKey: 'Project_ID'})
Project_userstories.belongsTo(Projects, {foreignKey: 'Project_ID', targetKey: 'Project_ID'})

users.post("/fetchProjectUserstories", (req, res) => {
        Projects.findAll({
          attributes :['Project_ID','Project_manager'],
          include: [{
            model: Project_userstories,
            // attributes :['userstory_name'],
            required: true
          }],
          where: {
            Project_manager: req.body.user_id,
          },
        })
          .then((users) => {
                          res.json([users]);})
                      .catch((err) => {
                        res.status(400).json({ message: err });
                        throw err
                      });

                  });
// User_Model.hasMany(Project_userstories, {foreignKey: 'UserStoryID'})
// Project_userstories.belongsTo(User_Model, {foreignKey: 'UserStoryID', targetKey: 'userstory_id'})

users.post("/fetchSubstories", (req, res) => {
      SubStories.findAll({
          // attributes :['user_id','user_story'],
            where: {
              userstory_id: req.body.userstory_id,
            },
        })
          .then((users) => {
                          res.json([users]);})
                      .catch((err) => {
                        res.status(400).json({ message: err });
                      });
                    });

users.post("/fetchSubUserstories", (req, res) => {
      SubStories.findOne({
          // attributes :['user_id','user_story'],
            where: {
              substory_id: req.body.substory_id,
            },
        })
          .then((users) => {
                          res.json([users]);})
                      .catch((err) => {
                        res.status(400).json({ message: err });
                      });
                    });


users.post("/compSubstories", (req, res) => {
    SubStories.findAll({
      attributes: ['userstory_id' , [Sequelize.fn('AVG', Sequelize.col('completed')),'percent_complete']],
      group : ['userstory_id']
    })
                .then((users) => {
                      res.json([users]);})
                  .catch((err) => {
                    res.status(400).json({ message: err });
                  });
                });



users.post("/projectStatus", (req, res) => {
    SubStories.findAll({
      attributes: ['Project_ID' , [Sequelize.fn('AVG', Sequelize.col('completed')),'project_status']],
      where: {
        Project_ID: req.body.Project_ID,
      }
    })
                .then((users) => {
                      res.json([users]);})
                  .catch((err) => {
                    res.status(400).json({ message: err });
                  });
                });


users.post("/deletesubuserstories", (req, res) => {
   SubStories.destroy({where: { substory_id: req.body.substory_id }}).then(
     (result) => {
       if (result == true) {
         console.log(result);
         res.json("Deleted subuserstory successfully");
       } else {
         res.json("Incorrect subuser_storyid / subuser_storyid does not exist ");
       }
     });
   });

module.exports = users;
