const { Router } = require("express");
const { isAuthenticated, ValidMongoId } = require("../middlewares");
const { RoomController } = require("../controllers");

const RoomRouter = Router();

RoomRouter.post(
	"/join/:id",
	isAuthenticated,
	ValidMongoId,
	RoomController.joinRoom
);

RoomRouter.get("/:id", isAuthenticated, ValidMongoId, RoomController.getRoom);

module.exports = RoomRouter;
