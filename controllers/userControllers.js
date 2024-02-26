const path = require("path");
const fs = require("fs/promises");
const { controllerWrapper, HttpError } = require("../helpers/index");
const {
  checkIfUserExists,
  register,
  login,
  logout,
  updateAvatar,
  updateUserName,
} = require("../services/userServices");

const { SERVER_URL } = process.env;

const registerCtrl = async (req, res) => {
  const { name, email } = req.body;
  const doesUserExists = await checkIfUserExists(email);

  if (doesUserExists) {
    throw HttpError(409, "User with such email already in use");
  }

  const result = await register(req.body);

  res.status(201).json({
    token: result.token,
    user: {
      name,
      email,
      avatarURL: result.avatarURL,
    },
  });
};

const loginCtrl = async (req, res) => {
  const { email, password } = req.body;

  const user = await checkIfUserExists(email);

  if (!user) {
    throw HttpError(409, "User with such email already in use");
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    throw HttpError(400, "Invalid email or password");
  }

  const newUser = await login(user._id);

  res.json({
    token: newUser.token,
    user: {
      name: newUser.name,
      email,
      avatarURL: newUser.avatarURL,
    },
  });
};

const logoutCtrl = async (req, res) => {
  await logout(req.user._id);

  res.json({
    message: "Logout was successful",
  });
};

const getCurrentCtrl = async (req, res) => {
  const { name, email, avatarURL } = req.user;

  res.json({ name, email, avatarURL });
};

const updateAvatarCtrl = async (req, res) => {
  const { _id } = req.user;

  if (!req.file) {
    throw HttpError(400, "Attach avatar");
  }

  const { path: tempPath, originalname } = req.file;

  const fileName = `${_id}_${originalname}`;

  const avatarsDir = path.join("public", "avatars");
  const resultUpload = path.join(avatarsDir, fileName);

  await fs.rename(tempPath, resultUpload);

  const avatarURL = `${SERVER_URL}/${path.join("avatars", fileName)}`;

  await updateAvatar(_id, avatarURL);

  res.json({ avatarURL });
};

const updateNameCtrl = async (req, res) => {
  const { name } = req.body;
  const { _id } = req.user;

  const updatedUser = await updateUserName(_id, name);

  res.json(updatedUser);
};

module.exports = {
  registerCtrl: controllerWrapper(registerCtrl),
  loginCtrl: controllerWrapper(loginCtrl),
  logoutCtrl: controllerWrapper(logoutCtrl),
  getCurrentCtrl: controllerWrapper(getCurrentCtrl),
  updateAvatarCtrl: controllerWrapper(updateAvatarCtrl),
  updateNameCtrl: controllerWrapper(updateNameCtrl),
};
