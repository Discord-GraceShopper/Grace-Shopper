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

// router.put("/:userId", async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const cart = await OrderDetails.findByPk(userId);
//     res.json(await cart.update(req.body));
//   } catch (error) {
//     next(error);
//   }
// });

router.put("/editItem", async (req, res, next) => {
  try {
    // item_quantity should be the new quantity
    // base_price should be the price of ONE of the item
    const { orderId, productId, item_quantity, base_price } = req.body;
    const productDetails = await OrderDetails.findOne({
      where: { orderId, productId },
    });
    productDetails.update({
      item_quantity,
      total_price: item_quantity * base_price,
    });
    res.status(201).json({ message: "Item updated" });
  } catch (error) {
    next(error);
  }
});
