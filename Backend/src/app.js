require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const { UserRouter, AuctionRouter, BiddingRouter } = require("./routes");
const { ErrorHandler, NotFoundHandler } = require("./middlewares");
const { MongoDB } = require("./database");

PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/auctions", AuctionRouter);
app.use("/api/v1/biddings", BiddingRouter);

app.use(ErrorHandler);
app.use(NotFoundHandler);

const start = async () => {
	try {
		await MongoDB.dbConnectionMongo();
		server.listen(PORT, () => {
			console.log(`🚀 App listening on ${PORT}`);
		});
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

start();
