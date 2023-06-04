const { Router } = require("express");

const { UserController } = require("../controllers");
const { LoginSchemaValidation, UserSchemaValidation } = require("../middlewares");

const AuthRouter = Router();

AuthRouter.post(
	"/login",
	LoginSchemaValidation,
	UserController.loginUser
);

AuthRouter.post(
	"/register",
	UserSchemaValidation,
	UserController.registerUser
);

module.exports = AuthRouter;
