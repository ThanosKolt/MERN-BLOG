const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
const blogSchema = new Schema(
  {
    title: { type: String },
    body: { type: String, required: [true, "provide a body"] },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "no user machted to this post"],
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        commentBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        commentText: {
          type: String,
          required: [true, "comment cant be empty"],
        },
      },
    ],
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "provide username"],
      minlength: [2, "Username need to be longer than two characters"],
      maxlength: 15,
    },
    email: {
      type: String,
      required: [true, "provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email address",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "provide password"],
      minlength: 6,
      select: false,
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Blog, User };
