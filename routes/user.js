const express = require("express");

const UserController = require('../controller/user');
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup", checkAuth, UserController.createUser);

router.post("/login", UserController.userLogin);

module.exports = router;