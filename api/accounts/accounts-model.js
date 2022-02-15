const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where({ id });
};

const create = (account) => {
  return db("accounts").insert({ account });
};

const updateById = (id, account) => {
  return db("accounts").where({ id }).update({ account });
};

const deleteById = (id) => {
  return db("accounts").where({ id }).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
