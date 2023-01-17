const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;
const requireAxios = require("./gateKeeper");

// Get all products
router.get("/", async (req, res, next) => {
  try {
    if (await requireAxios(req.headers.authorization)) {
      res.json(await Product.findAll());
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (err) {
    next(err);
  }
});

//Get single product
router.get("/:id", async (req, res, next) => {
  try {
    console.log(await requireAxios(req.headers.authorization));
    if (await requireAxios(req.headers.authorization)) {
      res.json(await Product.findByPk(req.params.id));
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (err) {
    next(err);
  }
});
