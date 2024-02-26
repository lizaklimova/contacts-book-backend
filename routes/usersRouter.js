const express = require("express");
const { authenticate, upload } = require("../middlewares/index");
const { validateBody } = require("../helpers/index");
const { userSchemas } = require("../schemas/index");
const {
  registerCtrl,
  loginCtrl,
  logoutCtrl,
  getCurrentCtrl,
  updateAvatarCtrl,
  updateNameCtrl,
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
usersRouter.patch(
  "/updateAvatar",
  authenticate,
  upload.single("avatar"),
  updateAvatarCtrl
);
usersRouter.patch("/updateName", authenticate, updateNameCtrl);

module.exports = usersRouter;
