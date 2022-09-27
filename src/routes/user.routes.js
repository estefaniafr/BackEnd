const express = require("express");
const { updateUser, deleteUser } = require("../controllers/user.controller");

const router = express.Router();

router.put("/account", updateUser);
router.delete("/remove", deleteUser);

// router.get("/:id", getUser);
// router.get("/", getUsers);
// router.put("/:id", updateUser);
// router.delete("/:id", removeUser);

module.exports = router;
