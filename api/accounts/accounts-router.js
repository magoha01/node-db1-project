const router = require("express").Router();

const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require("./accounts-middleware");

const Accounts = require("./accounts-model");

router.get("/", async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.json(accounts);
  } catch (err) {
    next({ status: 422, message: "problem getting accounts" });
  }
});

router.get("/:id", checkAccountId, (req, res, next) => {
  res.json(req.account);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newAccount = await Accounts.create(req.body);
      res.json(newAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    try {
      res.json("edit account");
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkAccountId, (req, res, next) => {
  try {
    res.json("delete account");
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "ERROR",
    message: err.message,
  });
});

module.exports = router;
