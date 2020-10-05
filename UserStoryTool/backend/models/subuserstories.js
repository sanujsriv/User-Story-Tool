const Sequelize = require("sequelize");
const db = require("../db/connection");
module.exports = db.sequelize.define(
  "subuserstories",
  {
    substory_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    userstory_id: {
      type: Sequelize.INTEGER,
    },
    etc:{
      type: Sequelize.DECIMAL,
    },
    completed: {
      type: Sequelize.INTEGER,
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
    subuserstory_name: {
      type: Sequelize.STRING
    },
    Project_ID: {
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false
  }
);
