const { Router } = require("express");
const { AdController } = require("../controllers");
const { isAuthenticated, isRoleAdmin, AdSchemaValidation } = require("../middlewares");

const AdRouter = Router();

AdRouter.post("/",
    isAuthenticated,
    isRoleAdmin,
    AdSchemaValidation,
    AdController.addAd
)

AdRouter.get("/",
    isAuthenticated,
    AdController.getAllAds
)

AdRouter.get("/:adId",
    isAuthenticated,
    AdController.getAdById
)


module.exports = AdRouter;
