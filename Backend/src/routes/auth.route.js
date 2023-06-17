const { Router } = require("express");

const {
	LoginSchemaValidation,
	UserSchemaValidation,
	ValidMongoId,
} = require("../middlewares");
const { AuthController } = require("../controllers");

const AuthRouter = Router();

AuthRouter.post("/login", LoginSchemaValidation, AuthController.loginUser);

AuthRouter.post("/register", UserSchemaValidation, AuthController.registerUser);

AuthRouter.get("/user/:id", ValidMongoId, AuthController.getUserById);

module.exports = AuthRouter;
