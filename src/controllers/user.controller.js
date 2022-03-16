const { request, response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const createUser = async (req = request, res = response) => {
  const { name, lastname, email, password, registerDate } = req.body;
  const user = new User({ name, lastname, email, password, registerDate });

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "The email already exists" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error check user" });
  }

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  try {
    const userSaved = await user.save();
    res.status(201).send({ user: userSaved });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error to save user" });
  }
};

module.exports = {
  createUser,
};
