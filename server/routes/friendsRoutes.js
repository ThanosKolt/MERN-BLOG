const express = require("express");
const router = express.Router();
const authToken = require("../middleware/auth");

const {
  addFriend,
  searchFriends,
  removeFriend,
} = require("../controllers/friendsController");

router.route("/add").post(addFriend);
router.route("/search").post(searchFriends);
router.route("/remove").post(removeFriend);

module.exports = router;
