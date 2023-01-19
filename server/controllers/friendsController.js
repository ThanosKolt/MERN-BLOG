const { User } = require("../db");
const BadRequestError = require("../errors/BadRequestError");

const addFriend = async (req, res) => {
  const { userId } = req.user;
  const { friendId } = req.body;
  const friend = await User.find({ _id: friendId });
  if (friend.length === 0) {
    throw new BadRequestError("Please provide a valid user id");
  }
  const currUser = await User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { friends: friendId } },
    { new: true }
  );
  res.json({ msg: "follow success" });
};

const removeFriend = async (req, res) => {
  const { userId } = req.user;
  const { friendId } = req.body;
  const friend = await User.find({ _id: friendId });
  if (friend.length === 0) {
    throw new BadRequestError("Please provide a valid user id");
  }
  const currUser = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { friends: friendId } }
  );
  res.json({ msg: "unfollow successs" });
};

const searchFriends = async (req, res) => {
  const { input } = req.body;
  const result = await User.find({
    username: { $regex: `${input}`, $options: "i" },
  });
  res.json({ result });
};

module.exports = { addFriend, removeFriend, searchFriends };
