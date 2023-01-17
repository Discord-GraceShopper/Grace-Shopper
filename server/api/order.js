const router = require("express").Router();
const {
  models: { Order, OrderDetails, Product },
} = require("../db");
module.exports = router;

// route @ api/order
// Get a user's cart
router.get("/:userId", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: { userId: req.params.userId, purchased: false },
      include: { model: Product, as: "cart" },
    });
    res.json(cart);
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

router.put("/checkout", async (req, res, next) => {
  try {
    // userId of current user
    // orderId corresponds to the current order for checkout
    // productArray is an array that contains a list of productIds (or products) that need to have their quantities updated (can fe provide this?)
    const { userId, orderId, productArray } = req.body;

    for (const product of productArray) {
      const productDetails = await Product.findOne({
        where: { id: product.id },
      }); // or id: productId depending on how fe send the data
      productDetails.update({ quantity: product.quantity - 1 });
    }

    const order = await Order.findOne({ where: { id: orderId } });
    order.update({ purchased: true });

    await Order.create({ userId });

    if (order) {
      res.status(201).json({ message: "Transaction Successful" });
    } else {
      res.status(400).json({ message: "Something went wrong!" });
    }
  } catch (error) {
    next(error);
  }
});
