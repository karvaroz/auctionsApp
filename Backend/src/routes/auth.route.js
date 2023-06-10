const { Router } = require("express");

const { LoginSchemaValidation, UserSchemaValidation } = require("../middlewares");
const { AuthController } = require("../controllers");

const AuthRouter = Router();

AuthRouter.post(
	"/login",
	LoginSchemaValidation,
	AuthController.loginUser
);

AuthRouter.post(
	"/register",
	UserSchemaValidation,
	AuthController.registerUser
);

module.exports = AuthRouter;
