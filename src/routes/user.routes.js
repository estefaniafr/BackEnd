const express = require("express");
const { createUser } = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", createUser);

// router.get("/:id", getUser);
// router.get("/", getUsers);
// router.put("/:id", updateUser);
// router.delete("/:id", removeUser);

module.exports = router;
