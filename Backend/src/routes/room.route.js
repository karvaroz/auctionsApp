const { Router } = require("express");
const { isAuthenticated } = require("../middlewares");
const { RoomController } = require("../controllers");

const RoomRouter = Router();

RoomRouter.post("/join/:roomId",
    isAuthenticated,
    RoomController.joinRoom
)

RoomRouter.get("/:roomId",
    isAuthenticated,
    RoomController.getRoom
)

module.exports = RoomRouter;
