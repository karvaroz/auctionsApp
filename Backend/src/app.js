require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const morgan = require("morgan");

const { MongoDB } = require("./database");
const { ErrorHandler, NotFoundHandler } = require("./middlewares");
const { AuthRouter, AuctionRouter } = require("./routes");

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });
// io.on("connection", require("./utils/io"));

app.use(cors());
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(express.json());

app.use(ErrorHandler);
app.use(NotFoundHandler);

app.use("/api/v1", AuthRouter);
app.use("/api/v1", AuctionRouter)

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
