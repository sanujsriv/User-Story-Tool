const Sequelize = require("sequelize");
const db = require("../db/connection");
module.exports = db.sequelize.define(
  "Projects",
  {
    Project_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    Project_name: {
      type: Sequelize.STRING
    },
    Project_manager: {
      type: Sequelize.STRING
    },
    Project_ETC:{
      type: Sequelize.DECIMAL,
    },
  },
  {
    timestamps: false
  }
);
