const { Router } = require("express");

const { BiddingController } = require("../controllers");
// const { ValidMongoId, ProductSchemaValidation } = require("../middlewares");

const BiddingRouter = Router();

BiddingRouter.get("/", BiddingController.getAllBiddings);
BiddingRouter.get(
	"/:id",
	// ValidMongoId,
	BiddingController.getOneBiddingById
);
BiddingRouter.post(
	"/",
	// ProductSchemaValidation,
	BiddingController.createNewBidding
);
BiddingRouter.patch(
	"/:id",
	// ValidMongoId,
	BiddingController.updateOneBiddingById
);
BiddingRouter.delete(
	"/:id",
	// ValidMongoId,
	BiddingController.deleteOneBiddingById
);

module.exports = BiddingRouter;
