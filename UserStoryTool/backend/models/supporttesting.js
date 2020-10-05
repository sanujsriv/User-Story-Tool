const Sequelize = require("sequelize");
const db = require("../db/connection");
module.exports = db.sequelize.define(
  "supportTesting",
  {
    userstory_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    userstory_done_by: {
      type: Sequelize.STRING,
    },
    userstory_to_test_by: {
      type: Sequelize.STRING,
    },
    testing_status: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false,
  }
);
