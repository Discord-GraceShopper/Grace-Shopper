const router = require("express").Router();
const {
  models: { Order, OrderDetails, Product },
} = require("../db");
module.exports = router;
const requireAxios = require("./gateKeeper");

// route @ api/order
// Get a user's cart
router.get("/:userId", async (req, res, next) => {
  try {
    if (await requireAxios(req.headers.authorization)) {
      const cart = await Order.findOne({
        where: { userId: req.params.userId, purchased: false },
        include: { model: Product, as: "cart" },
      });
      res.json(cart);
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (error) {
    next(error);
  }
});

// add an item to cart
router.post("/addItem", async (req, res, next) => {
  try {
    const { item_quantity, total_price, orderId, productId } = req.body;

    if (!item_quantity || !total_price || !orderId || !productId)
      return res.status(400).json({ message: "All fields required" });

    const newItem = await OrderDetails.create({
      item_quantity,
      total_price,
      orderId,
      productId,
    });

    if (newItem) {
      res.status(201).json({ message: `New item added` });
    } else {
      res.status(400).json({ message: "Invalid item data received" });
    }
  } catch (error) {
    next(error);
  }
});

// router.put("/:userId", async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const cart = await OrderDetails.findByPk(userId);
//     res.json(await cart.update(req.body));
//   } catch (error) {
//     next(error);
//   }
// });

// Edit item in user cart
router.put("/editItem", async (req, res, next) => {
  try {
    // item_quantity should be the new quantity
    // base_price should be the price of ONE of the item
    const { id, orderId, productId, item_quantity, price } = req.body;
    const productDetails = await OrderDetails.findOne({
      where: { orderId, productId },
    });
    // productDetails.update({
    //   item_quantity,
    //   total_price: item_quantity * base_price,
    // });
    await productDetails.update({
      item_quantity,
      total_price: item_quantity * price,
    });
    const order = await Order.findOne({
      where: { userId: id, purchased: false },
      include: { model: Product, as: "cart" },
    });
    res.send(order);
  } catch (error) {
    next(error);
  }
});

// Remove
router.put("/deleteItem", async (req, res, next) => {
  try {
    const { productId, orderId } = req.body;

    const productDetails = await OrderDetails.findOne({
      where: { productId, orderId },
    });
    await productDetails.destroy();
    console.log(productId);
    console.log(orderId);
    res.json({ productId, orderId });
  } catch (error) {
    next(error);
  }
});
