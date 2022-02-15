const Accounts = require("./accounts-model");
const db = require("../../data/db-config");

exports.checkAccountPayload = (req, res, next) => {
  try {
    const error = { status: 400 };
    const { name, budget } = req.body;
    if (!name || !budget) {
      error.message = "name and budget are required";
    } else if (typeof name !== "string") {
      error.message = "value must be a string";
    } else if (name.trim().length < 3 || name.trim().length > 100) {
      error.message = "name of account must be between 3 and 100";
    } else if (typeof budget !== "number" || isNaN(budget)) {
      error.message = "must be a number";
    } else if (budget < 0 || budget > 1000000) {
      error.message = "budget of account is too large or too small";
    }

    if (error.message) {
      next(error);
    } else {
      next();
    }

  } catch (err) {
    next(err);
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existing = await db("accounts")
      .where("name", req.body.name.trim())
      .first();

    if (existing) {
      return res.status(400).json({ message: "that name is taken" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id);
    if (!account) {
      next({ status: 404, message: "account not found" });
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next();
  }
};
