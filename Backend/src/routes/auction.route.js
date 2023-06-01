const { Router } = require("express");

const { AuctionController } = require("../controllers");
// const { ValidMongoId, ProductSchemaValidation } = require("../middlewares");

const AuctionRouter = Router();

AuctionRouter.get("/", AuctionController.getAllAuctions);
AuctionRouter.get(
	"/:id",
	// ValidMongoId,
	AuctionController.getOneAuctionById
);
AuctionRouter.post(
	"/",
	// ProductSchemaValidation,
	AuctionController.createNewAuction
);
AuctionRouter.patch(
	"/:id",
	// ValidMongoId,
	AuctionController.updateOneAuctionById
);
AuctionRouter.delete(
	"/:id",
	// ValidMongoId,
	AuctionController.deleteOneAuctionById
);

module.exports = AuctionRouter;
