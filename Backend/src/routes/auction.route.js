const { Router } = require("express");
const { AuctionController } = require("../controllers");
const { isAuthenticated, isRoleAdmin } = require("../middlewares");

const AuctionRouter = Router();


AuctionRouter.post("/start/:adId",
    isAuthenticated,
    isRoleAdmin,
    AuctionController.startAuction
)


module.exports = AuctionRouter;
