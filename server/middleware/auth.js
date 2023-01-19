const jwt = require("jsonwebtoken");
const { UnauthorizedError, CustomError } = require("../errors");

const authToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthorizedError("No token provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    throw new UnauthorizedError("Token didn't verify");
  }
  next();
};

module.exports = authToken;
