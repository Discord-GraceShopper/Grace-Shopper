const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

// Get all products
router.get("/", async (req, res, next) => {
  try {
    res.json(await Product.findAll());
  } catch (err) {
    next(err);
  }
});

//Get single product
router.get("/:id", async (req, res, next) => {
  try {
    res.json(await Product.findByPk(req.params.id));
  } catch (err) {
    next(err);
  }
});
