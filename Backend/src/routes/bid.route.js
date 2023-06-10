const { Router } = require("express");
const { isAuthenticated } = require("../middlewares");
const { BidController } = require("../controllers");

const BidRouter = Router();

BidRouter.post("/:adId",
    isAuthenticated,
    BidController.addBid
)

BidRouter.get("/:adId",
    isAuthenticated,
    BidController.getAllBids
)

module.exports = BidRouter;
