const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  // items: {
  //   type: Sequelize.ARRAY(Sequelize.JSON),
  //   defaultValue: [],
  // },
  purchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Order;
