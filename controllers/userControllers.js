const { controllerWrapper, HttpError } = require("../helpers/index");
const {
  checkIfUserExists,
  register,
  login,
  logout,
  getCurrent,
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

  const doesUserExists = await checkIfUserExists(email);

  if (doesUserExists) {
    throw HttpError(409, "User with such email already in use");
  }
};

const logoutCtrl = async (req, res) => {};

const getCurrentCtrl = async (req, res) => {};

module.exports = {
  registerCtrl: controllerWrapper(registerCtrl),
  loginCtrl: controllerWrapper(loginCtrl),
  logoutCtrl: controllerWrapper(logoutCtrl),
  getCurrentCtrl: controllerWrapper(getCurrentCtrl),
};
