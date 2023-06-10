const { Router } = require("express");
const { AppController } = require("../controllers");

const AppRouter = Router();

AppRouter.get("/", AppController.healthCheck)

module.exports = AppRouter;
