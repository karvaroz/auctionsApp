const { Router } = require("express");
const { AuctionController } = require("../controllers");
const { isAuthenticated, isRoleAdmin, AdSchemaValidation } = require("../middlewares");

const AuctionRouter = Router();

// CREATE AN AD - ONLY AND ADMIN CAN CREATE
AuctionRouter.post("/ad",
    isAuthenticated,
    isRoleAdmin,
    AdSchemaValidation,
    AuctionController.addAd
)

// GET ALL LIST ADS AVAILABLE - ONLY AUTHENTICATED USER CAN
AuctionRouter.get("/ad",
    isAuthenticated,
    AuctionController.getAllAds
)

// GET AD BY ID - ONLY AUTHENTICATED USER CAN
AuctionRouter.get("/ad/:adId",
    isAuthenticated,
    AuctionController.getAdById
)

// OFFER A BID - ONLY AUTHENTICATED USER CAN
AuctionRouter.post("/bid/:adId",
    isAuthenticated,
    AuctionController.addBid
)

// OFFER A BID - ONLY AUTHENTICATED USER CAN
AuctionRouter.get("/bid",
    isAuthenticated,
    AuctionController.getAllBids
)

AuctionRouter.post("/join/:auctionId",
    isAuthenticated,
    AuctionController.joinAuction
)

AuctionRouter.get("/auction/:auctionId",
    isAuthenticated,
    AuctionController.getAuction
)

// START AN AUCTION - ONLY AND ADMIN CAN
AuctionRouter.post("/start/:auctionId",
    isAuthenticated,
    isRoleAdmin,
    AuctionController.startAuction
)


module.exports = AuctionRouter;
