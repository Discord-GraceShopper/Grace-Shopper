const router = require("express").Router();
const {
  models: { Cart },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    res.json(Cart.findAll());
  } catch (err) {
    next(err);
  }
});
