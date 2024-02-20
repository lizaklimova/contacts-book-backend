const jwt = require("jsonwebtoken");
const User = require("../db/models/usersModel");

const { SECRET_KEY } = process.env;

const checkIfUserExists = async (email) => await User.findOne({ email });

const register = async (credentials) => {
  const user = new User(credentials);
  await user.hashPassword();
  await user.save();

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "24h" });

  const newUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );

  return newUser;
};
const login = async (req, res) => {};
const logout = async (req, res) => {};
const getCurrent = async (req, res) => {};

module.exports = {
  checkIfUserExists,
  register,
  login,
  logout,
  getCurrent,
};
