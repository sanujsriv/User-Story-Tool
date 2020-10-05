const Sequelize = require("sequelize");
const db = require("../db/connection");
module.exports = db.sequelize.define(
  "users",
  {
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    user_role: {
      type: Sequelize.STRING
    },
    email_id: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING
    },
    Project_ID: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
);
