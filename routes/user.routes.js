const express = require("express");
const { createUser } = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", createUser);

// WITH MIDDLEWARE
// router.put("/account/update", securityMiddleware.checkToken, userController.updateUser);
// router.get("/account/logout", userController.logOutUser);
// router.delete("/remove/account", userController.deleteUser);

module.exports = router;
