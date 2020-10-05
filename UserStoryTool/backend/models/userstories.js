const Sequelize = require("sequelize");
const db = require("../db/connection");
module.exports = db.sequelize.define(
  "userstories",
  {
    user_id: {
      type: Sequelize.STRING,
    },
    userstory_id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    userstory_priority: {
      type: Sequelize.STRING,
    },
      Project_ID: {
        type: Sequelize.INTEGER
      },
      analysis: {
        type: Sequelize.INTEGER
    },
    testing: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false,
  }
);
