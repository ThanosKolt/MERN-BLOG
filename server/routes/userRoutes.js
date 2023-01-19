const express = require("express");
const {
  register,
  login,
  getCurrentUser,
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getCurrentUser").post(getCurrentUser);
module.exports = router;
