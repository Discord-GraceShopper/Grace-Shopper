const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  brand: Sequelize.STRING,
  main_image: {
    type: Sequelize.STRING,
    defaultValue: 'N/A', // We'll need to get a locally stored img for products that have no img
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
    type: Sequelize.DECIMAL(2, 2),
  },
  availability: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
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
