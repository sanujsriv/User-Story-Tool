const Sequelize = require("sequelize");
const db = require("../db/connection");
module.exports = db.sequelize.define(
  "Project_userstories",
  {
    Project_ID: {
      type: Sequelize.INTEGER
    },
    UserStoryID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    Desc_As: {
      type: Sequelize.STRING
    },
    Desc_I: {
      type: Sequelize.STRING
    },
    Desc_So: {
      type: Sequelize.STRING
    },
    etc:{
      type: Sequelize.DECIMAL,
    },
    subStories:{
      type: Sequelize.INTEGER,
    },
    userstory_name: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
