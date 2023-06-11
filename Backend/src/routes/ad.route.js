const { Router } = require("express");
const { AdController } = require("../controllers");
const {
	isAuthenticated,
	isRoleAdmin,
	AdSchemaValidation,
	ValidMongoId,
} = require("../middlewares");

const AdRouter = Router();

AdRouter.get("/:id", isAuthenticated, ValidMongoId, AdController.getAdById);

AdRouter.get("/", isAuthenticated, AdController.getAllAds);

AdRouter.post(
	"/",
	isAuthenticated,
	isRoleAdmin,
	AdSchemaValidation,
	AdController.addAd
);

module.exports = AdRouter;
