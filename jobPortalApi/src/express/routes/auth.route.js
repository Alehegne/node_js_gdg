const express = require("express");
// const UserController = require("../controllers/user.controller");

const Router = express.Router;
const multer = require("multer");
const middleware = require("../middleware/allMiddleware");
const authController = require("../controllers/auth.controller");

const authRouter = new Router();
const upload = multer();

authRouter.post("/register", upload.none(), authController.register);
authRouter.post("/logIn", upload.none(), authController.logIn);
authRouter.post("/logOut", middleware.verifyToken, authController.logOut);

//password reset route
authRouter.post(
  "/forgotPassword",
  upload.none(),
  authController.forgotPassword
);
authRouter.post(
  "/resetPassword/:token",
  upload.none(),
  authController.resetPassword
);

module.exports = { authRouter };
