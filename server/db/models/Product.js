const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  brand: Sequelize.STRING,
  main_image: {
    type: Sequelize.STRING,
    defaultValue: 'N/A'
  },
  sku: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  primary_category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
