const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers/index");
const User = require("../db/models/userModel");

const { SECRET_KEY } = process.env;

const authorize = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [type, token] = authorization.split("");

  try {
    if (type !== "Bearer") {
      throw HttpError(401);
    }

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user && !user.token && token !== user.token) {
      throw HttpError(401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorize;
