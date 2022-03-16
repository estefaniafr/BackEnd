const { request, response } = require("express");

const createUser = async (req = request, res = response) => {
  return res.status(201).send({ user: req.body });
};

module.exports = {
  createUser,
};
