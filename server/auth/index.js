const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const user = await User.create({ first_name, last_name, email, password });

    await Order.create({ userId: user.dataValues.id });

    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.authorization);
    res.json(await user.update(req.body));
  } catch (err) {
    next(err);
  }
});
