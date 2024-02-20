const { isValidObjectId } = require("mongoose");
const HttpError = require("../helpers/HttpError");

const validateId = async (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    next(HttpError(400, "Invalid id"));
  }
  next();
};

module.exports = validateId;
