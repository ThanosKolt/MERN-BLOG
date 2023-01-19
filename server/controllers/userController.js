const { User } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BadRequestError = require("../errors/BadRequestError");
const { UnauthorizedError } = require("../errors");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new BadRequestError("Please provide username, email, and password");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  res.json({ msg: "user created", user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }
  const userId = user._id;
  const hashedPassword = user.password;

  const isPasswordRight = await bcrypt.compare(password, hashedPassword);
  if (!isPasswordRight) {
    throw new UnauthorizedError("Credentials dont match to any account");
  }
  // create token
  const token = await jwt.sign(
    {
      username: user.username,
      userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  res.json({
    msg: "login succesful",
    token,
  });
};

const getCurrentUser = async (req, res) => {
  const { userId } = req.body;
  const currentUser = await User.findById(userId);
  res.json({ currentUser });
};

module.exports = { register, login, getCurrentUser };
