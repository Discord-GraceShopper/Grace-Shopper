const router = require("express").Router();
const {
  models: { User, Order, Product },
} = require("../db");
module.exports = router;
const requireAxios = require("./gateKeeper");

// Get all users
router.get("/", async (req, res, next) => {
  try {
    if (await requireAxios(req.headers.authorization)) {
      const users = await User.findAll({
        // explicitly select only the id and username fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ["id", "email"],
      });
      res.json(users);
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (err) {
    next(err);
  }
});

// Directory route for all users
router.get("/directory", async (req, res, next) => {
  try {
    if (await requireAxios(req.headers.authorization)) {
      const users = await User.findAll({
        attributes: ["id", "first_name", "last_name", "email", "account_type"],
      });
      res.json(users);
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (error) {
    next(error);
  }
});

// Get purchase history for single user
router.get("/:id/purchase-history", async (req, res, next) => {
  try {
    if (await requireAxios(req.headers.authorization)) {
      const cart = await Order.findAll({
        where: { userId: req.params.id, purchased: true },
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
