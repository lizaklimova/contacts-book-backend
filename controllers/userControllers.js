const { controllerWrapper, HttpError } = require("../helpers/index");
const {
  checkIfUserExists,
  register,
  login,
  logout,
} = require("../services/userServices");

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
  const { name, email } = req.user;

  res.json({ name, email });
};

module.exports = {
  registerCtrl: controllerWrapper(registerCtrl),
  loginCtrl: controllerWrapper(loginCtrl),
  logoutCtrl: controllerWrapper(logoutCtrl),
  getCurrentCtrl: controllerWrapper(getCurrentCtrl),
};
