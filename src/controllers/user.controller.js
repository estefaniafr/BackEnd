const { request, response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const updateUser = async (req = request, res = response) => {
  const { id, name, lastname, email, password, newPassword } = req.body;

  if (id) {
    let passIsValid = false;

    try {
      const user = await User.findById(id);

      if (password && user.password) {
        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
          return res.status(400).json({ msg: "The password is incorrect" });
        }

        passIsValid = true;
      }

      const salt = bcrypt.genSaltSync();
      const userModel = await User.findByIdAndUpdate(
        id,
        {
          ...(name && { name }),
          ...(lastname && { lastname }),
          ...(email && { email }),
          ...(passIsValid && { password: bcrypt.hashSync(newPassword, salt) }),
        },
        { new: true }
      );

      res.status(200).json(userModel);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Error to update the user" });
    }
  } else {
    res.status(400).json({ msg: "User not found" });
  }
};

const deleteUser = async (req = request, res = response) => {
  const { idUser } = req.params;

  if (!idUser) {
    return res.status(400).send({ error: "Bad request" });
  }

  try {
    await User.findByIdAndRemove(idUser);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error to remove user" });
  }
};

module.exports = {
  updateUser,
  deleteUser,
};
