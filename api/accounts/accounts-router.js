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
  (req, res, next) => {
    Accounts.create(req.body)
      .then((newAccount) => {
        res.status(201).json(newAccount);
      })
      .then(() => {
        Accounts.getById(req.params.id);
      })
      .catch(next);
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  //checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const updatedAccount = await Accounts.updateById(req.params.id, req.body)
      res.status(200).json(updatedAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  try {
    const deletedAccount = await Accounts.deleteById(req.params.id);
    res.json(deletedAccount);
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
