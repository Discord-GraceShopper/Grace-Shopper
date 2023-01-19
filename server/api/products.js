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
    if (await requireAxios(req.headers.authorization)) {
      res.json(await Product.findByPk(req.params.id));
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (err) {
    next(err);
  }
});

//Create new product
router.post('/', async (req, res, next) => {
  try {
    const { title, brand, main_image, sku, description, price, quantity, primary_category } = req.body;
    res.json(await Product.create({title, brand, main_image, sku, description, price, quantity, primary_category}));
  } catch (err) {
    next(err);
  }
});

//Update product
router.put('/:id', async (req, res, next) => {
  try {
  const product = await Product.findByPk(req.params.id);
  const { title, brand, main_image, sku, description, price, quantity, primary_category } = req.body;
  res.json(await product.update({title, brand, main_image, sku, description, price, quantity, primary_category}))
  } catch (err) {
    next(err);
  }
  })

//Delete product
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(await product.destroy());
  } catch (err) {
    next(err);
  }
})