const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where("id", id).first();
};

const create = (account) => {
  return db("accounts").insert({ name: account.name.trim(), budget: account.budget });
};

const updateById = (id, account) => {
  return db("accounts")
    .where("id", id)
    .update({ name: account.name, budget: account.budget });
};

const deleteById = (id) => {
  return db("accounts").where("id", id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
