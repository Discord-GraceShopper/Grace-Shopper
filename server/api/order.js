const router = require("express").Router();
const {
  models: { Order, OrderDetails, Product },
} = require("../db");
module.exports = router;

// route @ api/order
router.get("/:userId", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: { userId: req.params.userId },
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