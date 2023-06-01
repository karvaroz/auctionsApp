const { Router } = require("express");
const { UserController } = require("../controllers");
// const { UserSchemaValidation } = require("../middlewares");

const UserRouter = Router();

UserRouter.get("/", UserController.getAllUsers);
UserRouter.get("/:id", UserController.getOneUserById);
UserRouter.post("/", UserController.createNewUser);
UserRouter.patch("/:id", UserController.updateOneUserById);
UserRouter.delete("/:id", UserController.deleteOneUserById);

module.exports = UserRouter;
