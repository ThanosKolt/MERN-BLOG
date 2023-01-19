const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
require("express-async-errors");
const postsRouter = require("./routes/postsRoutes");
const userRouter = require("./routes/userRoutes");
const friendsRouter = require("./routes/friendsRoutes");
const authToken = require("./middleware/auth");
const { errorHandler } = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

const dbUrl = process.env.DB_URL;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/user", userRouter);
app.use("/posts", authToken, postsRouter);
app.use("/friends", authToken, friendsRouter);
app.use(notFound);
app.use(errorHandler);
const connectDb = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("db connected");
  } catch (error) {
    console.error(error.message);
  }
};

connectDb();
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
