const router = require("express").Router();

// const {
//   checkAccountPayload,
//   checkAccountNameUnique,
//   checkAccountId,
// } = require("./accounts-middleware");

const Accounts = require("./accounts-model");

router.get("/", (req, res, next) => {
  try{
   res.json([{},{},{}])
  } catch(err) {
    next({status:422, message: "problem getting accounts"})
  }

});

router.get("/:id", (req, res, next) => {
  // DO YOUR MAGIC
  try{
      res.json('account by id')
  } catch(err) {
    next(err)
  }
});

router.post("/", (req, res, next) => {
  // DO YOUR MAGIC
  try{
      res.json('post new account')
  } catch(err) {
    next(err)
  }
});

router.put("/:id", (req, res, next) => {
  // DO YOUR MAGIC
  try{
      res.json('edit account')
  } catch(err) {
    next(err)
  }
});

router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
  try{
      res.json('delete account')
  } catch(err) {
    next(err)
  }
});


router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "Problem inside accounts router",
    message: err.message,
  });
});

module.exports = router;
