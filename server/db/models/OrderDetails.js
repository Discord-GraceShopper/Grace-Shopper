const Sequelize = require("sequelize");
const db = require("../db");

const OrderDetails = db.define("order_details", {
  item_quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  total_price: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
  },
});

module.exports = OrderDetails;
