const { CustomError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ msg: error.message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ err: { message: error.message }, msg: "An error occured" });
};

module.exports = { errorHandler };
