const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const User = require("../db/models/userModel");

const { SECRET_KEY } = process.env;

const checkIfUserExists = async (email) => await User.findOne({ email });

const register = async (userData) => {
  const user = new User(userData);
  await user.hashPassword();
  await user.save();

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "24h" });
  const avatarURL = gravatar.url(userData.email);

  const newUser = await User.findByIdAndUpdate(
    user._id,
    { token, avatarURL },
    { new: true }
  );

  return newUser;
};

const login = async (userId) => {
  {
    const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "24h" });

    const newUser = await User.findByIdAndUpdate(
      userId,
      { token },
      { new: true }
    );

    return newUser;
  }
};

const logout = async (userId) =>
  await User.findByIdAndUpdate(userId, { token: "" });

const updateAvatar = async (userId, avatarURL) =>
  User.findByIdAndUpdate(userId, { avatarURL });

module.exports = {
  checkIfUserExists,
  register,
  login,
  logout,
  updateAvatar,
};
