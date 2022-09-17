const { request, response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const createUser = async (req = request, res = response) => {
  const { name, lastname, email, password } = req.body;

  if (Object.values(req.body).some((el) => !el.length)) {
    res.status(400).json({ msg: "Bad request" });
  }

  const user = new User({
    name,
    lastname,
    email,
    password,
  });

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
    res.status(201).send({ email: userSaved.email });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error to save user" });
  }
};

const updateUser = async (req = request, res = response) => {
  const { name, lastname, email, password } = req.body;

  if (Object.values(req.body).some((el) => !el.length)) {
    res.status(400).json({ msg: "Bad request" });
  }

  try {
    const userModel = await User.findOneAndUpdate(
      { email },
      { name, lastname, email, password }
    );

    res.status(200).json(userModel);
  } catch (error) {
    res.status(500).send({ error: "Error to update the user" });
  }
};

const deleteUser = async (req = request, res = response) => {
  const email = req.query;

  if (!Object.keys(email).find((el) => el === "email")) {
    res.status(400).send({ error: "Not found email" });
  }

  try {
    await User.findOneAndRemove(email);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error to remove user" });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
};
