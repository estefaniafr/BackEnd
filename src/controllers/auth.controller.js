const { request, response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const loginUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  if (Object.values(req.body).some((el) => el.length === 0)) {
    res.status(404).json({ msg: "The email or password is incorrect" });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isValid = bcrypt.compareSync(password, user.password);

      if (!isValid) {
        return res
          .status(400)
          .json({ msg: "The email or password is incorrect" });
      }

      return res.status(200).json(user.toJSON());
    }

    res.status(400).json({ msg: "The user is not register" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Login user error" });
  }
};

const registerUser = async (req = request, res = response) => {
  const { name, lastname, email, password } = req.body;
  const requiredFields = { name, lastname, email, password };

  if (Object.values(requiredFields).some((el) => !el.length)) {
    return res.status(400).json({ msg: "Bad request" });
  }

  const user = new User(requiredFields);

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

module.exports = {
  loginUser,
  registerUser,
};
