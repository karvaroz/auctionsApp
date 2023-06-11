require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");

const { MongoDB } = require("./database");
const { ErrorHandler, NotFoundHandler, Socket } = require("./middlewares");
const {
	AuthRouter,
	AuctionRouter,
	AdRouter,
	BidRouter,
	RoomRouter,
	AppRouter,
} = require("./routes");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, { cors: { origin: "*" } });
io.on("connection", require("./utils/socket"));

app.use(ErrorHandler);
app.use(NotFoundHandler);

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", AppRouter);
app.use("/api/v1/ad", AdRouter);
app.use("/api/v1/auction", AuctionRouter);
app.use("/api/v1", AuthRouter); //Ok
app.use("/api/v1/bid", BidRouter);
app.use("/api/v1/room", RoomRouter);

const start = async () => {
	try {
		await MongoDB.dbConnectionMongo();
		httpServer.listen(PORT, () => {
			console.log(`🚀 App listening on ${PORT}`);
		});
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

start();
