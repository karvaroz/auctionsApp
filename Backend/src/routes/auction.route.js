const { Router } = require("express");
const { AuctionController } = require("../controllers");
const {
	isAuthenticated,
	isRoleAdmin,
	ValidMongoId,
} = require("../middlewares");

const AuctionRouter = Router();

AuctionRouter.post(
	"/start/:id",
	isAuthenticated,
	isRoleAdmin,
	ValidMongoId,
	AuctionController.startAuction
);

module.exports = AuctionRouter;
