const { Blog, User } = require("../db");
const BadRequestError = require("../errors/BadRequestError");

const getAllPosts = async (req, res) => {
  const { userId } = req.user;
  const currUser = await User.findOne({ _id: userId });
  const posts = await Blog.find({
    createdBy: { $in: [...currUser.friends, userId] },
  })
    .populate("createdBy", "username")
    .populate({
      path: "comments",
      populate: { path: "commentBy", model: "User", select: "username" },
    })
    .sort({ createdAt: -1 });
  res.json({ posts });
};
const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.find({ _id: userId });
    const posts = await Blog.find({
      createdBy: userId,
    })
      .populate("createdBy", "username")
      .populate({
        path: "comments",
        populate: { path: "commentBy", model: "User", select: "username" },
      })
      .sort({ createdAt: -1 });
    res.json({ posts, user });
  } catch (error) {
    throw new BadRequestError("No such profile exists");
  }
};

const getPost = async (req, res, next) => {
  const { id } = req.params;
  const post = await Blog.find({ _id: id });
  res.json({ post });
};

const createPost = async (req, res) => {
  const { userId } = req.user;
  const { title, body } = req.body;
  if (!body) {
    throw new BadRequestError("Cant't post empty field");
  }
  const post = await Blog.create({ title, body, createdBy: userId });
  const newPost = await Blog.findOne({ _id: post._id })
    .populate("createdBy", "username")
    .populate({
      path: "comments",
      populate: { path: "commentBy", model: "User", select: "username" },
    });
  res.json({ msg: "post created", post: newPost });
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Blog.findOneAndDelete({ _id: id });
  res.json({ msg: "delete success", post });
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const post = await Blog.findOneAndUpdate({ _id: id }, { title, body });
  res.json({ msg: "update success", oldPost: post });
};
const likePost = async (req, res) => {
  const { userId } = req.user;
  const { postId } = req.body;
  const post = await Blog.findOneAndUpdate(
    { _id: postId },
    { $addToSet: { likes: userId } }
  );
  res.json({ msg: "liked posed", post });
};

const dislikePost = async (req, res) => {
  const { userId } = req.user;
  const { postId } = req.body;
  const post = await Blog.findOneAndUpdate(
    { _id: postId },
    { $pull: { likes: userId } }
  );
  res.json({ msg: "dislike successs", post });
};

const commentPost = async (req, res) => {
  const { userId } = req.user;
  const { postId, commentText } = req.body;
  const post = await Blog.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: { commentBy: userId, commentText } } },
    { new: true }
  ).populate({
    path: "comments",
    populate: { path: "commentBy", model: "User", select: "username" },
  });
  res.json({ msg: "comment success", post });
};

const deleteComment = async (req, res) => {
  const { postId } = req.body;
  const { commentId } = req.params;
  const post = await Blog.findOneAndUpdate(
    { _id: postId },
    { $pull: { comments: { _id: commentId } } }
  );
  res.json({ msg: "comment deleted", post });
};

module.exports = {
  getAllPosts,
  getUserPosts,
  getPost,
  deletePost,
  editPost,
  createPost,
  likePost,
  dislikePost,
  commentPost,
  deleteComment,
};
