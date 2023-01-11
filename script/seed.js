"use strict";

const {
  db,
  models: { User, Product, Order, OrderDetails },
} = require("../server/db");
const { products, users, orders, orderDetails } = require("./sampleData");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const userList = await Promise.all(users.map((user) => User.create(user)));
  const productList = await Promise.all(
    products.map((product) => Product.create(product))
  );
  const orderList = await Promise.all(
    orders.map((order) => Order.create(order))
  );
  const orderDetailList = await Promise.all(
    orderDetails.map((orderDetails) => OrderDetails.create(orderDetails))
  );

  console.log(`seeded ${userList.length} users`);
  console.log(`seeded ${productList.length} products`);
  console.log(`seeded ${orderList.length} orders`);
  console.log(`seeded ${orderDetailList.length} order details`);
  console.log(`seeded successfully!`);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
