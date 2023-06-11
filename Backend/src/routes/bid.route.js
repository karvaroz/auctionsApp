const { Router } = require("express");
const { isAuthenticated, ValidMongoId } = require("../middlewares");
const { BidController } = require("../controllers");

const BidRouter = Router();

BidRouter.post("/:id", isAuthenticated, ValidMongoId, BidController.addBid);

BidRouter.get("/:id", isAuthenticated, ValidMongoId, BidController.getAllBids);

module.exports = BidRouter;
