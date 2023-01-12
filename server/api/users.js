const router = require("express").Router();
const {
  models: { User, Order, Product },
} = require("../db");
module.exports = router;

// Get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Directory route for all users
router.get("/directory", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "first_name", "last_name", "email", "account_type"],
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Get single user (for cart request)
router.get("/:id/purchase-history", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: { userId: req.params.id, purchased: true },
      include: { model: Product, as: "cart" },
    });
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

// try {
//   const cart = await Order.findAll({
//     where: { userId: req.params.userId, purchased: true },
//     include: { model: Product, as: "cart" },
//   });
//   res.json(cart);
// } catch (error) {
//   next(error);
// }
