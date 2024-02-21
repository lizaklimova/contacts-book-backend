const express = require("express");
const { authenticate } = require("../middlewares/index");
const { validateBody } = require("../helpers/index");
const { userSchemas } = require("../schemas/index");
const {
  registerCtrl,
  loginCtrl,
  logoutCtrl,
  getCurrentCtrl,
} = require("../controllers/userControllers");

const usersRouter = express.Router();

usersRouter.post(
  "/signup",
  validateBody(userSchemas.registerSchema),
  registerCtrl
);
usersRouter.post("/login", validateBody(userSchemas.loginSchema), loginCtrl);
usersRouter.post("/logout", authenticate, logoutCtrl);
usersRouter.get("/current", authenticate, getCurrentCtrl);

module.exports = usersRouter;
