const express = require("express");
const router = express.Router();
const authToken = require("../middleware/auth");

const {
  getAllPosts,
  getUserPosts,
  getPost,
  createPost,
  editPost,
  deletePost,
  likePost,
  dislikePost,
  commentPost,
  deleteComment,
} = require("../controllers/postsController");

router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getPost).put(editPost).delete(deletePost);
router.route("/profile/:userId").get(getUserPosts);
router.route("/like").post(likePost);
router.route("/dislike").post(dislikePost);
router.route("/comment").post(commentPost);
router.route("/comment/:commentId").patch(deleteComment);

module.exports = router;
